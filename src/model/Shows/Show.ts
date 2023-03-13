enum ShowDay {
    FRIDAY = "friday",
    SATURDAY = "saturday",
    SUNDAY = "sunday"
}

class Show {
    constructor(
        private id: string,
        private week_day: ShowDay,
        private start_time: string, 
        private end_time: string,
        band_id: string
    ){
    }
}

export default Show