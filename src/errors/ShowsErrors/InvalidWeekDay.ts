import CustomError from "../CustomError";

class InvalidWeekDay extends CustomError {
    constructor(){
        super(422, "The week day must be 'friday', 'saturday' or 'sunday'.")
    }
}

export default InvalidWeekDay