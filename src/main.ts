import express from 'express'
import cors from "cors"
import bookRoutes from "./routes/product-routes"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.use('/books', bookRoutes)

app.listen(3000, () => {
    console.log("Server is running");
})