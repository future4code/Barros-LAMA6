import CustomError from "../CustomError";

class MissingWeekDay extends CustomError {
    constructor(){
        super(422, "Week day required.")
    }
}

export default MissingWeekDay