import EventsDatabase from "../data/EventsDatabase"
import TicketsDatabase from "../data/TicketsDatabase"
import CustomError from "../errors/CustomError"
import EventNotExisting from "../errors/EventsErrors/EventNotExisting"
import MissingEventName from "../errors/EventsErrors/MissingEventName"
import EventTicketsExisting from "../errors/TicketsErrors/EventTicketsExisting"
import InvalidAmountOfTicketsToBuy from "../errors/TicketsErrors/InvalidAmountOfTicketsToBuy"
import MissingAmountOfTicketsToBuy from "../errors/TicketsErrors/MissingAmountOfTicketsToBuy"
import MissingBuyTicketInfos from "../errors/TicketsErrors/MissingBuyTicketInfos"
import MissingCreateEventTicketsInfos from "../errors/TicketsErrors/MissingCreateEventTicketsInfos"
import MissingEventId from "../errors/TicketsErrors/MissingEventId"
import MissingTicketsQuantity from "../errors/TicketsErrors/MissingTicketsQuantity"
import MissingUserToken from "../errors/UsersErrors/MissingUserToken"
import WrongUserRole from "../errors/UsersErrors/WrongUserRole"
import EventTickets from "../model/Tickets/EventTickets"
import { BuyTicketInputDTO, CreateEventTicketsInputDTO, GetAllEventTicketsInputDTO } from "../model/Tickets/EventTicketsDTO"
import EventTicketsTrade from "../model/Tickets/EventTicketsTrade"
import Authenticator from "../services/Authenticator"
import IdGenerator from "../services/IdGenerator"


const ticketsDatabase = new TicketsDatabase()
const eventsDatabase = new EventsDatabase()
const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

class TicketsBusiness {
    getAllEventsTickets = async (input: GetAllEventTicketsInputDTO) => {
        try {
            const userData = authenticator.getTokenPayload(input.token)

            if(userData.role !== "admin"){
                throw new WrongUserRole()
            }

            return await ticketsDatabase.getAllEventsTickets()
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    createEventTickets = async (input: CreateEventTicketsInputDTO) => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            } if(!input.ticketQuantity && input.eventId){
                throw new MissingCreateEventTicketsInfos()
            } if(!input.ticketQuantity){
                throw new MissingTicketsQuantity()
            } if(!input.eventId){
                throw new MissingEventId()
            }

            const userData = authenticator.getTokenPayload(input.token)

            if(userData.role !== "admin"){
                throw new WrongUserRole()
            }

            const allEvents = await eventsDatabase.getAllEvents()
            const allEventsTickets = await ticketsDatabase.getAllEventsTickets()

            const eventInfos = allEvents.filter(event => event.id === input.eventId)
            const eventTicketsExisting = allEventsTickets.filter(eventTickets => eventTickets.event_id === input.eventId)

            if(eventTicketsExisting.length > 0){
                throw new EventTicketsExisting()
            }

            const newEventTickets = new EventTickets(
                idGenerator.idGenerator(),
                `Tickets ${eventInfos[0].event_name}`,
                input.ticketQuantity,
                input.eventId
            )

            await ticketsDatabase.createEventTickets(newEventTickets)
            
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    buyTicket = async (input: BuyTicketInputDTO) => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            } if(!input.amountOfTicketsToBuy && !input.eventName){
                throw new MissingBuyTicketInfos()
            } if(!input.amountOfTicketsToBuy){
                throw new MissingAmountOfTicketsToBuy()
            } if(!input.eventName){
                throw new MissingEventName()
            } if(input.amountOfTicketsToBuy < 0){
                throw new InvalidAmountOfTicketsToBuy()
            }

            const userData = authenticator.getTokenPayload(input.token)

            const eventExisting = await eventsDatabase.findEventByName(input.eventName)

            if(eventExisting.length < 1){
                throw new EventNotExisting()
            }

            const allEventsTickets = await ticketsDatabase.getAllEventsTickets()

            for(let eventTickets of allEventsTickets){
                if(Number(eventTickets.ticket_quantity) >= Number(input.amountOfTicketsToBuy)){
                    await ticketsDatabase
                    .updateEventTicketsInfos(eventTickets.event_id, 
                    Number(eventTickets.ticket_quantity) - Number(input.amountOfTicketsToBuy), 
                    eventTickets.tickets_sold + Number(input.amountOfTicketsToBuy))
                } else {
                    throw new InvalidAmountOfTicketsToBuy()
                }
            }

            const newTicketsTrade = new EventTicketsTrade(
                idGenerator.idGenerator(),
                Number(input.amountOfTicketsToBuy),
                eventExisting[0].id,
                userData.id
            )

            await ticketsDatabase.buyTicket(newTicketsTrade)

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default TicketsBusiness