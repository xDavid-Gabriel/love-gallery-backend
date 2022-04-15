import dotenv from "dotenv"

//Dotenv
dotenv.config()

export const MONGODB_URL_DEV = process.env.MONGODB_URL_DEV
export const MONGODB_URL = process.env.MONGODB_URL
export const PORT_ENV = process.env.PORT_ENV

export const CLOUD_NAME = process.env.CLOUD_NAME;
export const API_KEY = process.env.API_KEY;
export const API_SECRET = process.env.API_SECRET;