import { useState, useEffect, useRef, useCallback } from 'react';
import { supabase, Activity } from '@/lib/supabase';

export const usePublicActivities = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [instructorNames, setInstructorNames] = useState<{ [key: string]: string }>({});
  const fetchingRef = useRef(false);
  const hasInitializedRef = useRef(false);

  const fetchPublicActivities = useCallback(async () => {
    if (fetchingRef.current) {
      console.log('ℹ️ Evitando fetch duplicado de atividades públicas');
      return;
    }

    fetchingRef.current = true;

    try {
      console.log('🔍 Buscando atividades públicas...');
      setIsLoading(true);
      
      // Buscar todas as atividades ativas (independente do usuário logado)
      const { data: activitiesData, error: activitiesError } = await supabase
        .from('activities')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (activitiesError) {
        console.error('Erro ao buscar atividades públicas:', activitiesError);
        return;
      }

      // Buscar nomes dos instrutores com preferência de visibilidade
      const instructorIds = [...new Set(activitiesData?.map(activity => activity.instructor_id))];
      
      if (instructorIds.length > 0) {
        const { data: usersData, error: usersError } = await supabase
          .from('users')
          .select('id, name, show_name')
          .in('id', instructorIds);

        if (usersError) {
          console.error('Erro ao buscar instrutores:', usersError);
        } else {
          const namesMap = usersData?.reduce((acc, user) => {
            // Mostrar nome apenas se show_name for true, senão não mostrar nada
            acc[user.id] = user.show_name ? user.name : '';
            return acc;
          }, {} as { [key: string]: string }) || {};
          setInstructorNames(namesMap);
        }
      }

      console.log('✅ Atividades públicas carregadas:', activitiesData?.length || 0);
      setActivities(activitiesData || []);
    } catch (error) {
      console.error('Erro inesperado ao buscar atividades públicas:', error);
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Executar apenas uma vez na inicialização
    if (!hasInitializedRef.current) {
      hasInitializedRef.current = true;
      
      const timeoutId = setTimeout(() => {
        fetchPublicActivities();
      }, 50);

      return () => clearTimeout(timeoutId);
    }
  }, [fetchPublicActivities]);

  return {
    activities,
    isLoading,
    instructorNames,
    refetch: fetchPublicActivities,
  };
};
