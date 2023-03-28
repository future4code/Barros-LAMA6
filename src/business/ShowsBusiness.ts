import ShowsDatabase from "../data/ShowsDatabase"
import MissingBandId from "../errors/BandsErrors.ts/MissingBandId"
import CustomError from "../errors/CustomError"
import InvalidWeekDay from "../errors/ShowsErrors.ts/InvalidWeekDay"
import MissingCreateShowInfos from "../errors/ShowsErrors.ts/MissingCreateBandInfos"
import MissingEndTime from "../errors/ShowsErrors.ts/MissingEndTime"
import MissingStartTime from "../errors/ShowsErrors.ts/MissingStartTime"
import MissingWeekDay from "../errors/ShowsErrors.ts/MissingWeekDay"
import { EndAfterStart, EndTimeShows, FullHoursShows, MaximumTime, SameTimeShows, StartTimeShows, UsedTime } from "../errors/ShowsErrors.ts/MistakesInShowTimes"
import ShowExisting from "../errors/ShowsErrors.ts/ShowExisting"
import MissingUserToken from "../errors/UsersErrors.ts/MissingUserToken"
import WrongUserRole from "../errors/UsersErrors.ts/WrongUserRole"
import Show from "../model/Shows/Show"
import { CreateShowInputDTO, GetAllShowsInputDTO, GetFestivalDayScheduleInputDTO } from "../model/Shows/ShowsDTO"
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

            if(!input.token){
                throw new MissingUserToken()
            } if(!input.weekDay && !input.startTime && !input.endTime && !input.bandId){
                throw new MissingCreateShowInfos()
            } if(!input.weekDay){
                throw new MissingWeekDay()
            } if(input.weekDay.toLowerCase() !== "friday" 
                && input.weekDay.toLowerCase() !== "saturday" 
                && input.weekDay.toLowerCase() !== "sunday"){
                throw new InvalidWeekDay()
            } if(!input.startTime){
                throw new MissingStartTime()
            } if(!input.endTime){
                throw new MissingEndTime()
            } if(!input.bandId){
                throw new MissingBandId()
            }

            const findShow = await showsDatabase.findShow(input.bandId)

            if(findShow.length > 0){
                throw new ShowExisting()
            }

            const userData = authenticator.getTokenPayload(input.token)

            if(userData.role !== "admin"){
                throw new WrongUserRole()
            }

            const startTime = input.startTime.split(":")
            const endTime = input.endTime.split(":")
            const showTime = Number(endTime[0]) - Number(startTime[0])       

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

    getFestivalDaySchedule = async (input: GetFestivalDayScheduleInputDTO) => {
        try {
            if(!input.weekDay){
                throw new MissingWeekDay()
            } if(input.weekDay.toLowerCase() !== "friday" 
                && input.weekDay.toLowerCase() !== "saturday" 
                && input.weekDay.toLowerCase() !== "sunday"){
                throw new InvalidWeekDay()
            }

            return await showsDatabase.getFestivalDaySchedule(input.weekDay)
    
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default ShowsBusiness