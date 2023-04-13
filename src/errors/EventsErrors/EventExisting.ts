import CustomError from "../CustomError";

class EventExisting extends CustomError {
    constructor(){
        super(409, "This event already exists.")
    }
}

export default EventExisting