export interface CreateEventTicketsDTO {
    ticketQuantity: number, 
    eventId: string,
    token: string
}

export interface GetAllEventTicketsInputDTO {
    token: string
}