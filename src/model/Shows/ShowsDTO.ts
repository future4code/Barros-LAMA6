export interface CreateShowInputDTO {
    weekDay: string, 
    startTime: string,
    endTime: string,
    bandId: string,
    token: string
}

export interface GetAllShowsInputDTO {
    token: string
}