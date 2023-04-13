import EventTickets from "../model/Tickets/EventTickets";
import EventTicketsTrade from "../model/Tickets/EventTicketsTrade";
import BaseDatasabe from "./BaseDatabase";

class TicketsDatabase extends BaseDatasabe {
    TABLE_NAME = "lama_tickets"

    getAllEventsTickets = async () => {
        return await TicketsDatabase.connection(this.TABLE_NAME).select("*")
    }

    createEventTickets = async (newEventTickets: EventTickets) => {
        await TicketsDatabase.connection(this.TABLE_NAME).insert(newEventTickets)
    }

    updateEventTicketsInfos = async (eventId: string, updateTicketQuantity: number, updateTicketsSold: number) => {
        await TicketsDatabase.connection(this.TABLE_NAME).update("ticket_quantity", updateTicketQuantity)
        .whereLike("event_id", eventId)

        await TicketsDatabase.connection(this.TABLE_NAME).update("tickets_sold", updateTicketsSold)
        .whereLike("event_id", eventId)
    }

    buyTicket = async (newTicketsTrade: EventTicketsTrade) => {
        await TicketsDatabase.connection("lama_tickets_trade").insert(newTicketsTrade)
    }
}

export default TicketsDatabase