import CustomError from "../CustomError";

class EventNotExisting extends CustomError {
    constructor(){
        super(404, "This event not exist.")
    }
}

export default EventNotExisting