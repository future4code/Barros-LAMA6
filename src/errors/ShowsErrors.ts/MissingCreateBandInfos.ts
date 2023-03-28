import CustomError from "../CustomError";

class MissingCreateShowInfos extends CustomError {
    constructor(){
        super(422, "Week day, start time, end time and band ID required to create a show.")
    }
}

export default MissingCreateShowInfos