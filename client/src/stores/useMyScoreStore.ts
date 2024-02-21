import { create } from 'zustand'

interface UserScoreState {
  userScore: number | null
  setUserScore: (score: number | null) => void
}

const useMyScoreStore = create<UserScoreState>((set) => ({
  userScore: null,
  setUserScore: (score) => set({ userScore: score }),
}))

export default useMyScoreStore
