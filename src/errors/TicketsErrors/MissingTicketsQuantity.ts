import CustomError from "../CustomError";

class MissingTicketsQuantity extends CustomError {
    constructor(){
        super(422, "Tickets quantity required.")
    }
}

export default MissingTicketsQuantity