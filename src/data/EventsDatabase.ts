import Event from "../model/Events/Event";
import BaseDatasabe from "./BaseDatabase";

class EventsDatabase extends BaseDatasabe {
    TABLE_NAME = "lama_events"

    getAllEvents = async () => {
        return await EventsDatabase.connection(this.TABLE_NAME).select("*")
    }

    createEvent = async (newEvent: Event) => {
        await EventsDatabase.connection(this.TABLE_NAME).insert(newEvent)
    }

    findEventByName = async (name: string) => {
        return await EventsDatabase.connection(this.TABLE_NAME).select("*").whereLike("event_name", name)
    }
}

export default EventsDatabase