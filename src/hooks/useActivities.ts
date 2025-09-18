import { useState, useEffect } from 'react';
import { supabase, Activity } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export const useActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();


  const fetchActivities = async () => {
    if (!user) return;

    try {
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

      setActivities(data || []);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    } finally {
      setIsLoading(false);
    }
  };

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

  useEffect(() => {
    fetchActivities();
  }, [user]);

  return {
    activities,
    isLoading,
    createActivity,
    updateActivity,
    deleteActivity,
    refetch: fetchActivities,
  };
};
