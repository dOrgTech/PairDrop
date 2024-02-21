import { create } from 'zustand'

interface ShowCountPageState {
  votedProjectId: number | null
  setVotedProjectId: (votedProjectId: number) => void
}

const useEditVotedPairStore = create<ShowCountPageState>((set) => ({
  votedProjectId: null,
  setVotedProjectId: (value) => set({ votedProjectId: value }),
}))

export default useEditVotedPairStore
