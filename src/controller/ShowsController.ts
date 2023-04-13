import { Request, Response } from "express"
import ShowsBusiness from "../business/ShowsBusiness"
import { CreateShowInputDTO, GetAllShowsInputDTO, GetFestivalDayScheduleInputDTO } from "../model/Shows/ShowsDTO"

const showsBusiness = new ShowsBusiness()

class ShowsController {
    getAllShows = async (req: Request, res: Response) => {
        try {
            const input: GetAllShowsInputDTO = {
                token: req.headers.authorization as string
            }

            const shows = await showsBusiness.getAllShows(input)

            res.status(200).send(shows)
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)            
        }
    }

    createShow = async (req: Request, res: Response) => {
        try {
            const input: CreateShowInputDTO = {
                weekDay: req.body.weekDay, 
                startTime: req.body.startTime,
                endTime: req.body.endTime,
                bandId: req.body.bandId,
                token: req.headers.authorization as string
            }

            await showsBusiness.createShow(input)

            res.status(201).send("Show created.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)            
        }
    }

    getFestivalDaySchedule = async (req: Request, res: Response) => {
        try {
            const input: GetFestivalDayScheduleInputDTO = {
                weekDay: req.query.week_day as string
            }

            const weekDaySchedule = await showsBusiness.getFestivalDaySchedule(input)

            res.status(200).send(weekDaySchedule)
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)
        }
    }
}

export default ShowsController