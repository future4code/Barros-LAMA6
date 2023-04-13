import CustomError from "../CustomError";

class UserNotExisting extends CustomError {
    constructor(){
        super(404, "This user does not exist.")
    }
}

export default UserNotExisting