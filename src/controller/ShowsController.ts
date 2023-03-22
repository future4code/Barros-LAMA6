import { Request, Response } from "express"
import ShowsBusiness from "../business/ShowsBusiness"
import { CreateShowInputDTO } from "../model/Shows/ShowsDTO"

const showsBusiness = new ShowsBusiness()

class ShowsController {
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
}

export default ShowsController