import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

interface Bear {
    name: string
    color?: 'gray' | 'black' | 'brown'
    gender?: 'male' | 'female'
}

interface BearState {
    bears: Bear[]
    addBear: (newBear: Bear) => void
    addBears: (newBears: Bear[]) => void
    removeBear: (name: string) => void
}

const useBearStore = create<BearState>()(immer((set) => ({
    bears: [],
    count: 0,
    addBear: (newBear) => set((state) => {
        state.bears.push(newBear)
    }),
    addBears: (newBears) => set((state) => {
        state.bears.push(...newBears)
    }),
    removeBear: (name) => set((state) => {
        const toDelete = state.bears.findIndex(bear => bear.name === name)
        if (toDelete > -1) state.bears.splice(toDelete, 1)
    })
})))

export default useBearStore