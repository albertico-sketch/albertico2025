import { createContext } from 'react'
import { useBreeds } from '@/hooks/useBreeds'

const BreedSpeciesContext = createContext(undefined)

export function BreedSpeciesProvider({ children }) {
  const { breeds = [], species = [], loading, error, loadData: refresh } = useBreeds()

  const ensureDataLoaded = async () => {
    if (!loading) {
      return refresh()
    }
    return { species, breeds }
  }

  const value = {
    breeds,
    species,
    loading,
    error,
    refresh,
    ensureDataLoaded
  }

  return <BreedSpeciesContext.Provider value={value}>{children}</BreedSpeciesContext.Provider>
}

export { BreedSpeciesContext }
