import ShowsDatabase from "../data/ShowsDatabase"
import CustomError from "../errors/CustomError"
import Show from "../model/Shows/Show"
import { CreateShowInputDTO } from "../model/Shows/ShowsDTO"
import Authenticator from "../services/Authenticator"
import IdGenerator from "../services/IdGenerator"

const showsDatabase = new ShowsDatabase()
const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

class ShowsBusiness {
    createShow = async (input: CreateShowInputDTO) => {
        try {

            const userData = authenticator.getTokenPayload(input.token)

            const startTime = input.startTime.split(":")
            const endTime = input.endTime.split(":")

            if(Number(startTime[0]) < 8 || Number(startTime[0]) >= 23){
                throw new CustomError(400, "Os shows podem começar entre 8hrs e 22hrs")
            } if(Number(endTime[0]) < 9 || Number(endTime[0]) > 23){
                throw new CustomError(400, "Os shows podem terminar entre 9hrs e 23hrs")
            } if(startTime[1] !== '00' || startTime[2] !== '00'){
                throw new CustomError(400, "Os horários de inícios dos shows precisam ser cheios, ex: 08:00:00")
            } if(endTime[1] !== '00' || endTime[2] !== '00'){
                throw new CustomError(400, "Os horários de términos dos shows precisam ser cheios, ex: 23:00:00")
            }

            const newShow = new Show(
                idGenerator.idGenerator(), 
                input.weekDay.toLowerCase(),
                input.startTime,
                input.endTime,
                input.bandId
            )

            await showsDatabase.createShow(newShow)
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default ShowsBusiness