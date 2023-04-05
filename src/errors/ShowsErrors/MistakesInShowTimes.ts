import CustomError from "../CustomError";

export class SameTimeShows extends CustomError {
    constructor(){
        super(409, "Shows cannot start and end at the same time.")
    }
}

export class StartTimeShows extends CustomError {
    constructor(){
        super(422, "Shows must start between 08:00:00 and 22:00:00.")
    }
}

export class EndTimeShows extends CustomError {
    constructor(){
        super(422, "Shows must end between 09:00:00 and 23:00:00.")
    }
}

export class FullHoursShows extends CustomError {
    constructor(){
        super(422, "Shows must start and end in full hours. Example: 09:00:00, 13:00:00, 17:00:00, etc.")
    }
}

export class EndAfterStart extends CustomError {
    constructor(){
        super(422, "Shows must have an end time after the start time.")
    }
}

export class MaximumTime extends CustomError {
    constructor(){
        super(422, "The maximum time of a show is 2 hours.")
    }
}

export class UsedTime extends CustomError {
    constructor(){
        super(409, "There is already a show at this time.")
    }
}





