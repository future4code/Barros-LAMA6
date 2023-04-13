import express from 'express'
import TicketsController from '../controller/TicketsController'

export const ticketsRouter = express.Router()

const ticketsController = new TicketsController()

ticketsRouter.post("/create_event_tickets", ticketsController.createEventTickets)

ticketsRouter.post("/create_event_tickets_trade", ticketsController.buyTicket)

ticketsRouter.get("/", ticketsController.getAllEventsTickets)