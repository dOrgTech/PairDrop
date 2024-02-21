import { create } from 'zustand'

interface ShowCountPageState {
  showCountPage: boolean
  setShowCountPage: (showCountPage: boolean) => void
}

const useShowCountPageStore = create<ShowCountPageState>((set) => ({
  showCountPage: false,
  setShowCountPage: (value) => set({ showCountPage: value }),
}))

export default useShowCountPageStore
