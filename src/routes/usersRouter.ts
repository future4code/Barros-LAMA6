import express from 'express'
import UsersController from '../controller/UsersController'

export const usersRouter = express.Router()

const usersController = new UsersController()