import CustomError from "../errors/CustomError"
import IdGenerator from "../services/IdGenerator"
import MissingUserToken from "../errors/UsersErrors/MissingUserToken"
import WrongUserRole from "../errors/UsersErrors/WrongUserRole"
import Authenticator from "../services/Authenticator"
import EventsDatabase from "../data/EventsDatabase"
import { CreateEventInputDTO } from "../model/Events/EventsDTO"
import MissingEventName from "../errors/EventsErrors/MissingEventName"
import EventExisting from "../errors/EventsErrors/EventExisting"
import Event from "../model/Events/Event"

const eventsDatabase = new EventsDatabase()
const idGenerator = new IdGenerator()
const authenticator = new Authenticator

class EventsBusiness {
    getAllEvents = async () => {
        try {
            return await eventsDatabase.getAllEvents()
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    createEvent = async (input: CreateEventInputDTO) => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            } if(!input.eventName){
                throw new MissingEventName()
            }

            const userData = authenticator.getTokenPayload(input.token)

            if(userData.role !== "admin"){
                throw new WrongUserRole()
            }

            const eventExisting = await eventsDatabase.findEventByName(input.eventName)

            if(eventExisting.length > 0){
                throw new EventExisting()
            }

            const newEvent = new Event(
                idGenerator.idGenerator(),
                input.eventName
            )

            await eventsDatabase.createEvent(newEvent)
            
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default EventsBusiness