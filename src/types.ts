export interface IStrapiResponse<T> {
    data: T
    meta?: Meta
}

export interface IMedia {
    url: string
    alternativeText: string | null
}

export interface IProcessor {
    id: number
    documentId: string
    name: string
    type: ProcessorType
    price: number
    instock: boolean
    power: number
    releseaseDate: data
    rating: number
    createdAt: string
    updatedAt: string
    publishedAt: string
    cover: IMedia | null
}

export type ProcessorInput = Omit<IProcessor, | "id" | "documentId" | "createdAt" | "updatedAt" | "publishedAt" | "image">

export interface Meta {
    pagination: Pagination
}

export interface Pagination {
    page: number
    pageSize: number
    pageCount: number
    total: number
}

export const TYPE = ["AMD", "Intel"] as const

export type ProcessorType = (typeof TYPE)[number]

export const TYPE_LABELS: Record<ProcessorType, string> = {
    AMD: "AMD",
    Intel: "Intel",
}