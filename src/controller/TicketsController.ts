import { Request, Response } from "express"
import { BuyTicketInputDTO, CreateEventTicketsInputDTO, GetAllEventTicketsInputDTO } from "../model/Tickets/EventTicketsDTO"
import TicketsBusiness from "../business/TicketsBusiness"

const ticketsBusiness = new TicketsBusiness()

class TicketsController {
    getAllEventsTickets = async (req: Request, res: Response) => {
        try {
            const input: GetAllEventTicketsInputDTO = {
                token: req.headers.authorization as string
            }

            const allEventsTickets = await ticketsBusiness.getAllEventsTickets(input)
            
            res.status(200).send(allEventsTickets)
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)             
        }
    }

    createEventTickets = async (req: Request, res: Response) => {
        try {
            const input: CreateEventTicketsInputDTO = {
                ticketQuantity: req.body.ticketQuantity, 
                eventId: req.body.eventId,
                token: req.headers.authorization as string
            }

            await ticketsBusiness.createEventTickets(input)

            res.status(201).send("Event tickets created.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)            
        }
    }

    buyTicket = async (req: Request, res: Response) => {
        try {
            const input: BuyTicketInputDTO = {
                amountOfTicketsToBuy: req.body.amountOfTicketsToBuy,
                eventName: req.body.eventName,
                token: req.headers.authorization as string
            }

            await ticketsBusiness.buyTicket(input)

            res.status(201).send("Tickets buyed.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)  
        }
    }

}

export default TicketsController