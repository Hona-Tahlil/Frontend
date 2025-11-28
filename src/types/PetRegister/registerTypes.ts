
type speciesData = {
    num: number,
    name: string,
}

export type spiecesResponse = {
    statusCode: number,
    message?: string,
    data?: speciesData[],
}