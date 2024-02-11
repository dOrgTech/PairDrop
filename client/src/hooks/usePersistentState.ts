import { useState, useEffect } from 'react'

// usePersistentState hook to persist state in localStorage
function usePersistentState<T>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(key)
        if (saved !== null) {
          return JSON.parse(saved)
        }
      } catch (error) {
        console.error('Error reading from localStorage:', error)
        localStorage.removeItem(key)
      }
    }
    return defaultValue
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(state))
      } catch (error) {
        console.error('Error writing to localStorage:', error)
      }
    }
  }, [key, state])

  return [state, setState]
}

export default usePersistentState
