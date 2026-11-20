import { create } from "zustand"
import { api, getErrorMessage } from "./api"
import type { IProcessor, ProcessorInput } from "./types"

interface IProcessorsStore {
    processors: IProcessor[]
    loading: boolean
    error: string | null
    loadProcessors: () => Promise<void>
    createProcessor: (input: ProcessorInput) => Promise<void>
    deleteProcessor: (documentId: string) => Promise<void>
}

export const useProcessorsStore = create<IProcessorsStore>((set, get) => ({
    processors: [],
    loading: true,
    error: null,

    loadProcessors: async () => {
        set({ loading: true, error: null })

        try {
            const response = await api.getProcessors()
            set({ processors: response.data })
        } catch (error) {
            set({ error: getErrorMessage(error) })
        } finally {
            set({ loading: false })
        }
    },

    createProcessor: async (input) => {
        await api.createProcessor(input)
        await get().loadProcessors()
    },

    deleteProcessor: async (documentId) => {
        try {
            await api.deleteProcessor(documentId)
            await get().loadProcessors()
        } catch (error) {
            set({ error: getErrorMessage(error) })
        }
    },
}))