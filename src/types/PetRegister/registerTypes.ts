
type SpeciesData = {
    num: number,
    name: string,
}

export type SpiecesResponse = {
    statusCode: number,
    message?: string,
    data?: SpeciesData[],
}
