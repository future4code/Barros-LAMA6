import app from "./app"
import { usersRouter } from "./routes/usersRouter"
import { bandsRouter } from "./routes/bandsRouter"
import { showsRouter } from "./routes/showsRouter"
import { eventsRouter } from "./routes/eventsRouter"

app.use("/users", usersRouter)

app.use("/bands", bandsRouter)

app.use("/shows", showsRouter)

app.use("/events", eventsRouter)