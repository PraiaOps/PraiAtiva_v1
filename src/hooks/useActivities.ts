import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, Activity } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Começar com false
  const { user } = useAuth();
  const fetchingRef = useRef(false);
  const lastUserIdRef = useRef<string | null>(null);


  const fetchActivities = useCallback(async () => {
    if (!user || fetchingRef.current || lastUserIdRef.current === user.id) {
      console.log('ℹ️ Evitando fetch duplicado de atividades');
      return;
    }

    fetchingRef.current = true;
    lastUserIdRef.current = user.id;

    try {
      console.log('🔍 Buscando atividades do usuário:', user.id);
      setIsLoading(true);
      const { data, error } = await supabase
        .from('activities')
        .select('*')
        .eq('instructor_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar atividades:', error);
        return;
      }

      console.log('✅ Atividades carregadas:', data?.length || 0);
      setActivities(data || []);
    } catch (error) {
      console.error('Erro inesperado ao buscar atividades:', error);
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  }, [user]);

  const createActivity = async (activityData: Omit<Activity, 'id' | 'instructor_id' | 'created_at' | 'updated_at' | 'enrollments'>) => {
    if (!user) {
      console.error('Usuário não logado');
      return null;
    }

    try {
      const insertData = {
        ...activityData,
        instructor_id: user.id,
        enrollments: 0,
      };

      const { data, error } = await supabase
        .from('activities')
        .insert([insertData])
        .select()
        .single();

      if (error) {
        console.error('Erro ao criar atividade:', error);
        return null;
      }

      setActivities(prev => [data, ...prev]);
      return data;
    } catch (error) {
      console.error('Erro inesperado ao criar atividade:', error);
      return null;
    }
  };

  const updateActivity = async (id: string, activityData: Partial<Activity>) => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .update(activityData)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao atualizar atividade:', error);
        return null;
      }

      setActivities(prev => 
        prev.map(activity => 
          activity.id === id ? data : activity
        )
      );
      return data;
    } catch (error) {
      console.error('Erro ao atualizar atividade:', error);
      return null;
    }
  };

  const deleteActivity = async (id: string) => {
    try {
      const { error } = await supabase
        .from('activities')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar atividade:', error);
        return false;
      }

      setActivities(prev => prev.filter(activity => activity.id !== id));
      return true;
    } catch (error) {
      console.error('Erro ao deletar atividade:', error);
      return false;
    }
  };

  const toggleFeatured = async (id: string, currentFeaturedStatus: boolean) => {
    try {
      const { data, error } = await supabase
        .from('activities')
        .update({ is_featured: !currentFeaturedStatus })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Erro ao alterar destaque:', error);
        return false;
      }

      setActivities(prev => 
        prev.map(activity => 
          activity.id === id ? data : activity
        )
      );
      return true;
    } catch (error) {
      console.error('Erro ao alterar destaque:', error);
      return false;
    }
  };

  useEffect(() => {
    // Só buscar se o usuário mudou ou se é primeira vez
    if (user && user.id !== lastUserIdRef.current) {
      const timeoutId = setTimeout(() => {
        fetchActivities();
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [user, fetchActivities]);

  return {
    activities,
    isLoading,
    createActivity,
    updateActivity,
    deleteActivity,
    toggleFeatured,
    refetch: fetchActivities,
  };
};
