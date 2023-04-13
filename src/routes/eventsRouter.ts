import express from 'express'
import EventsController from '../controller/EventsController'

export const eventsRouter = express.Router()

const eventsController = new EventsController()

eventsRouter.get("/", eventsController.getAllEvents)

eventsRouter.post("/create_event", eventsController.createEvent)

