import CustomError from "../CustomError";

class EventTicketsExisting extends CustomError {
    constructor(){
        super(409, "Tickets for this event already exist.")
    }
}

export default EventTicketsExisting