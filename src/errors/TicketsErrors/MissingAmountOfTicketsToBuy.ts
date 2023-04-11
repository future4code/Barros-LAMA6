import CustomError from "../CustomError";

class MissingAmountOfTicketsToBuy extends CustomError {
    constructor(){
        super(422, "Amount of tickets to buy required.")
    }
}

export default MissingAmountOfTicketsToBuy