import axios from "axios"
import type { IProcessor, IStrapiResponse, ProcessorInput } from "./types"

export const API_URL = (import.meta.env.VITE_API_URL ?? "").replace(/\/+$/, "")
const API_KEY = import.meta.env.VITE_API_KEY

export const apiInstance = axios.create({
    baseURL: API_URL + "/api",
    headers: {
        Authorization: `Bearer ${API_KEY}`,
    },
})

const getProcessors = async () => {
    const res = await apiInstance.get<IStrapiResponse<IProcessor[]>>(
        "/component-pcs",
        { params: { populate: "*" } },
    )
    return res.data
}

const createProcessor = async (input: ProcessorInput) => {
    const res = await apiInstance.post<IStrapiResponse<IProcessor>>(
        "/component-pcs",
        { data: input },
    )
    return res.data
}

const deleteProcessor = async (documentId: string) => {
    await apiInstance.delete(`/component-pcs/${documentId}`)
}

export const api = { getProcessors, createProcessor, deleteProcessor }

export function getErrorMessage(error: unknown): string {
    if (axios.isAxiosError<{ error?: { message?: string } }>(error)) {
        return error.response?.data?.error?.message ?? error.message
    }

    return error instanceof Error ? error.message : String(error)
}