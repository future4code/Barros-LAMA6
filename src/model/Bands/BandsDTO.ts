export interface CreateBandInputDTO {
    name: string,
    musicGenre: string,
    responsible: string,
    token: string
}

export interface GetBandInputDTO {
    name: string,
    bandId: string
}