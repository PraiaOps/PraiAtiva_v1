import { useCallback } from 'react';

export const useScrollToTop = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return scrollToTop;
};

export const useScrollToTopDirect = () => {
  const scrollToTopDirect = useCallback(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return scrollToTopDirect;
};
