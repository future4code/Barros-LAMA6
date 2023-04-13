export interface CreateEventTicketsInputDTO {
    ticketQuantity: number, 
    eventId: string,
    token: string
}

export interface GetAllEventTicketsInputDTO {
    token: string
}

export interface BuyTicketInputDTO {
    amountOfTicketsToBuy: number, 
    eventName: string,
    token: string
}