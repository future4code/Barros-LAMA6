import CustomError from "../CustomError";

class MissingCreateEventTicketsInfos extends CustomError {
    constructor(){
        super(422, "Tickets quantity and event id required.")
    }
}

export default MissingCreateEventTicketsInfos