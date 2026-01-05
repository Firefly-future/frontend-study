import { create } from 'zustand'

interface State {
  count: number
  name: string
  age: number
  inc: (num: number) => void
}

export const useTestStore = create<State>((set) => ({
  count: 1,
  name: 'xxxx',
  age: 222,
  inc: (num: number) => {
    set((state) => ({ count: state.count + num }))
  }
}))