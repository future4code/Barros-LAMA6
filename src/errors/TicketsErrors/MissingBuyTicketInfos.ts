import CustomError from "../CustomError";

class MissingBuyTicketInfos extends CustomError {
    constructor(){
        super(422, "Amount of tickets to buy and event name required.")
    }
}

export default MissingBuyTicketInfos