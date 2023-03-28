import ShowsDatabase from "../data/ShowsDatabase"
import CustomError from "../errors/CustomError"
import { EndAfterStart, EndTimeShows, FullHoursShows, MaximumTime, SameTimeShows, StartTimeShows, UsedTime } from "../errors/ShowsErrors.ts/MistakesInShowTimes"
import MissingUserToken from "../errors/UsersErrors.ts/MissingUserToken"
import WrongUserRole from "../errors/UsersErrors.ts/WrongUserRole"
import Show from "../model/Shows/Show"
import { CreateShowInputDTO, GetAllShowsInputDTO } from "../model/Shows/ShowsDTO"
import Authenticator from "../services/Authenticator"
import IdGenerator from "../services/IdGenerator"

const showsDatabase = new ShowsDatabase()
const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

class ShowsBusiness {
    getAllShows = async (input: GetAllShowsInputDTO) => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            }

            authenticator.getTokenPayload(input.token)

            return await showsDatabase.getAllShows()
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    createShow = async (input: CreateShowInputDTO) => {
        try {

            const userData = authenticator.getTokenPayload(input.token)

            const startTime = input.startTime.split(":")
            const endTime = input.endTime.split(":")
            const showTime = Number(endTime[0]) - Number(startTime[0])

            if(userData.role !== "admin"){
                throw new WrongUserRole()
            }        

            if(Number(startTime[0]) === Number(endTime[0])){
                throw new SameTimeShows()
            } if(Number(startTime[0]) < 8 || Number(startTime[0]) >= 23){
                throw new StartTimeShows()
            } if(Number(endTime[0]) < 9 || Number(endTime[0]) > 23){
                throw new EndTimeShows()
            } if(startTime[1] !== '00' || startTime[2] !== '00' || endTime[1] !== '00' || endTime[2] !== '00'){
                throw new FullHoursShows()
            } if(showTime > 2){
                throw new MaximumTime()
            } if(Number(startTime[0]) > Number(endTime[0])){
                throw new EndAfterStart()
            }

            const shows = await showsDatabase.getAllShows()

            for(let show of shows){
                const existingShowStartTime = show.start_time.split(":")
                const existingShowEndTime = show.end_time.split(":")

                if(show.week_day === input.weekDay 
                && Number(startTime[0]) >= Number(existingShowStartTime[0])
                && Number(startTime[0]) < Number(existingShowEndTime[0])){
                    throw new UsedTime()
                }    
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