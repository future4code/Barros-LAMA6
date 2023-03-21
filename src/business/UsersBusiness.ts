import UsersDatabase from "../data/UsersDatabase"
import CustomError from "../errors/CustomError"
import InvalidRole from "../errors/UsersErrors.ts/InvalidRole"
import MissingEmail from "../errors/UsersErrors.ts/MissingEmail"
import MissingFullName from "../errors/UsersErrors.ts/MissingFullName"
import MissingLoginInfos from "../errors/UsersErrors.ts/MissingLoginInfos"
import MissingPassword from "../errors/UsersErrors.ts/MissingPassword"
import MissingRole from "../errors/UsersErrors.ts/MissingRole"
import MissingSignUpInfos from "../errors/UsersErrors.ts/MissingSignUpInfos"
import UserExisting from "../errors/UsersErrors.ts/UserExisting"
import UserNotExisting from "../errors/UsersErrors.ts/UserNotExisting"
import WrongPassword from "../errors/UsersErrors.ts/WrongPassword"
import User from "../model/Users/User"
import { LoginInputDTO, SignUpInputDTO } from "../model/Users/UsersDTO"
import Authenticator from "../services/Authenticator"
import HashManager from "../services/HashManager"
import IdGenerator from "../services/IdGenerator"

const usersDatabase = new UsersDatabase()
const idGenerator = new IdGenerator()
const hashManager = new HashManager()
const authenticator = new Authenticator()

class UsersBusiness {
    signUp = async (input: SignUpInputDTO) => {
        try {
            if(!input.fullName && !input.email && !input.password && !input.role){
                throw new MissingSignUpInfos()
            } if(!input.fullName){
                throw new MissingFullName()
            } if(!input.email){
                throw new MissingEmail()
            } if(!input.password){
                throw new MissingPassword()
            } if(!input.role){
                throw new MissingRole()
            } if(input.role.toLowerCase() !== "admin" && input.role.toLowerCase() !== "normal"){
                throw new InvalidRole()
            }

            const userExisting = await usersDatabase.findUser(input.email)

            if(userExisting.length > 0){
                throw new UserExisting()
            }

            const hashPassword = await hashManager.hash(input.password)

            const id = idGenerator.idGenerator()

            const newUser = new User(
                id,
                input.fullName,
                input.email,
                hashPassword,
                input.role.toLowerCase()
            ) 

            await usersDatabase.createUser(newUser)
            
            const token = authenticator.generateToken({id, role: input.role})

            return token

        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)            
        }
    }

    login = async (input: LoginInputDTO) => {
        try {
            if(!input.email && !input.password){
                throw new MissingLoginInfos()
            } if(!input.email){
                throw new MissingEmail()
            } if(!input.password){
                throw new MissingPassword()
            }

            const userExisting = await usersDatabase.findUser(input.email)

            if(userExisting.length < 1){
                throw new UserNotExisting()
            }

            const passwordCompare = await hashManager.compare(input.password, userExisting[0].password)

            if(passwordCompare === false){
                throw new WrongPassword()
            }

            const token = authenticator.generateToken({id: userExisting[0].id, role: userExisting[0].role})

            return token
            
        } catch (err: any) {
            throw new CustomError(err.statusCode, err.message)   
        }
    }
}

export default UsersBusiness