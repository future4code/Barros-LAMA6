import BandsDatabase from "../data/BandsDatabase"
import BandExisting from "../errors/BandsErrors.ts/BandExisting"
import BandNotExisting from "../errors/BandsErrors.ts/BandNotExisting"
import MissingCreateBandInfos from "../errors/BandsErrors.ts/MissingCreateBandInfos"
import MissingGetBandInfos from "../errors/BandsErrors.ts/MissingGetBandInfos"
import MissingMusicGenre from "../errors/BandsErrors.ts/MissingMusicGenre"
import MissingName from "../errors/BandsErrors.ts/MissingName"
import MissingResponsible from "../errors/BandsErrors.ts/MissingResponsible"
import CustomError from "../errors/CustomError"
import MissingUserToken from "../errors/UsersErrors.ts/MissingUserToken"
import WrongUserRole from "../errors/UsersErrors.ts/WrongUserRole"
import Band from "../model/Bands/Band"
import { CreateBandInputDTO, GetBandInputDTO } from "../model/Bands/BandsDTO"
import Authenticator from "../services/Authenticator"
import HashManager from "../services/HashManager"
import IdGenerator from "../services/IdGenerator"

const bandsDatabase = new BandsDatabase()
const idGenerator = new IdGenerator()
const authenticator = new Authenticator()

class BandsBusiness {
    createBand = async (input: CreateBandInputDTO) => {
        try {
            if(!input.token){
                throw new MissingUserToken()
            } if(!input.name && !input.musicGenre && !input.responsible){
                throw new MissingCreateBandInfos()
            } if(!input.name){
                throw new MissingName()
            } if(!input.musicGenre){
                throw new MissingMusicGenre()
            } if(!input.responsible){
                throw new MissingResponsible()
            }

            const userData = authenticator.getTokenPayload(input.token)

            if(userData.role !== "admin"){
                throw new WrongUserRole()
            }

            const bandExisting = await bandsDatabase.findBandByName(input.name)

            if(bandExisting.length > 0){
                throw new BandExisting()
            }

            const newBand = new Band(
                idGenerator.idGenerator(),
                input.name,
                input.musicGenre,
                input.responsible
            )

            await bandsDatabase.createBand(newBand)
            
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }

    getBand = async (input: GetBandInputDTO) => {
        try {
            if(!input.name && !input.bandId){
                throw new MissingGetBandInfos()
            }

            if(input.name){
                const bandExistingByName = await bandsDatabase.findBandByName(input.name)

                if(bandExistingByName.length < 1){
                    throw new BandNotExisting()
                } else {
                    return bandExistingByName
                }
            } 
            
            if(input.bandId){
                const bandExistingById = await bandsDatabase.findBandById(input.bandId)

                if(bandExistingById.length < 1){
                    throw new BandNotExisting()
                } else {
                    return bandExistingById
                }
            }
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)
        }
    }
}

export default BandsBusiness