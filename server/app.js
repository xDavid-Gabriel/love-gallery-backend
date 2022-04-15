import express,{json} from "express"
import fileUpload from "express-fileupload"
import postRoutes from "./routes/posts.routes.js";
import CORS  from "cors" 

//Express
const app = express()

//Middlewares
app.use(CORS())
app.use(json())
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"./upload"
}))

// Mis rutas
app.use("/api",postRoutes)


export default app