import EventTickets from "../model/Tickets/EventTickets";
import BaseDatasabe from "./BaseDatabase";

class TicketsDatabase extends BaseDatasabe {
    TABLE_NAME = "lama_tickets"

    getAllEventsTickets = async () => {
        return await TicketsDatabase.connection(this.TABLE_NAME).select("*")
    }

    createEventTickets = async (newEventTickets: EventTickets) => {
        await TicketsDatabase.connection(this.TABLE_NAME).insert(newEventTickets)
    }
}

export default TicketsDatabase