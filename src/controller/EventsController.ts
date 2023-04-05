import { Request, Response } from "express"
import EventsBusiness from "../business/EventsBusiness"
import { CreateEventInputDTO } from "../model/Events/EventsDTO"

const eventsBusiness = new EventsBusiness()

class EventsController {
    getAllEvents = async (req: Request, res: Response) => {
        try {
            const allEvents = await eventsBusiness.getAllEvents()
            
            res.status(200).send(allEvents)
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)             
        }
    }

    createEvent = async (req: Request, res: Response) => {
        try {
            const input: CreateEventInputDTO = {
                eventName: req.body.eventName, 
                token: req.headers.authorization as string
            }

            await eventsBusiness.createEvent(input)

            res.status(201).send("Event created.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)            
        }
    }
}

export default EventsController