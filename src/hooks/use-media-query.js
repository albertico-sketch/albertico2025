import { useEffect, useState } from 'react'

/**
 * Custom hook que evalúa una media query y devuelve un booleano indicando si coincide.
 * Se suscribe a los eventos de cambio para actualizar el valor en tiempo real.
 * @param {string} query - Media query CSS (por ejemplo, '(min-width: 768px)').
 * @returns {boolean}
 */
export function useMediaQuery(query) {
  const getMatches = (q) => (typeof window !== 'undefined' ? window.matchMedia(q).matches : false)

  const [matches, setMatches] = useState(getMatches(query))

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query)
    const listener = (event) => setMatches(event.matches)
    mediaQueryList.addEventListener('change', listener)
    return () => mediaQueryList.removeEventListener('change', listener)
  }, [query])

  return matches
}
