import { Request, Response } from "express"
import BandsBusiness from "../business/BandsBusiness"
import { CreateBandInputDTO, GetBandInputDTO } from "../model/Bands/BandsDTO"

const bandsBusiness = new BandsBusiness()

class BandsController {
    createBand = async (req: Request, res: Response) => {
        try {
            const input: CreateBandInputDTO = {
                name: req.body.name, 
                musicGenre: req.body.musicGenre,
                responsible: req.body.responsible,
                token: req.headers.authorization as string
            }

            await bandsBusiness.createBand(input)

            res.status(201).send("Band created.")
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)            
        }
    }

    getBand = async (req: Request, res: Response) => {
        try {
            const input: GetBandInputDTO = {
                name: req.body.name,
                bandId: req.body.bandId
            }

            const band = await bandsBusiness.getBand(input)

            res.status(200).send(band)
        } catch (err: any) {
            res.status(err.statusCode || 400).send(err.message || err.sqlMessage)  
        }
    }
}

export default BandsController