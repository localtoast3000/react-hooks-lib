import { useEffect, useRef } from 'react';

export function useRenderCounter() {
  const reRenderCount = useRef(1);

  useEffect(() => {
    reRenderCount.current = reRenderCount.current + 1;
  });

  return reRenderCount.current;
}
