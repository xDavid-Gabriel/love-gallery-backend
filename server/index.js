import mongoose from "mongoose";
import { MONGODB_URL_DEV, MONGODB_URL, PORT_ENV } from "./config.js";
import app from "./app.js";

// Mi puerto
const PORT = process.env.PORT ?? 4000;

//Excucha mi puerto y mi base de datos
app.listen(PORT, async () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
  try {
    const db = await mongoose.connect(
      process.env.NODE_ENV === "production" ? MONGODB_URL : MONGODB_URL_DEV
    );
    console.log(
      `Conectado a la base de datos exitosamente ${db.connection.name}`
    );
  } catch (error) {
    console.log(error);
  }
});
