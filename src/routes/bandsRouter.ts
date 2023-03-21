import express from 'express'
import BandsController from '../controller/BandsController'

export const bandsRouter = express.Router()

const bandsController = new BandsController()

bandsRouter.get("/band", bandsController.getBand)

bandsRouter.post("/create_band", bandsController.createBand)

