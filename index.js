import { app } from "./app.js";
import connectToDb from './database/database.js'


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectToDb()
})