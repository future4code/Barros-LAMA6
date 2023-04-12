import CustomError from "../CustomError";

class InvalidAmountOfTicketsToBuy extends CustomError {
    constructor(){
        super(409, "The amount of tickets to buy is greater than the number of available tickets or is a negative number.")
    }
}

export default InvalidAmountOfTicketsToBuy