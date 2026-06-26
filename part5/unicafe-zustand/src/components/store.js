import { create } from 'zustand'

const useQueryStore = create(set => ({
  good: 0,
  neutral: 0,
  bad: 0,
  actions: {
    plusGood: () => set(state => ({ good: state.good + 1 })),
    plusNeutral: () => set(state => ({ neutral: state.neutral + 1 })),
    plusBad: () => set(state => ({bad: state.bad + 1}))
  }  
}))

export const useQueryGood = () => useQueryStore(state => state.good)
export const useQueryNeutral = () => useQueryStore(state => state.neutral)
export const useQueryBad = () => useQueryStore(state => state.bad)
export const useQueryControls = () => useQueryStore(state => state.actions)