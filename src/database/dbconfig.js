import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
import logger from '../logger/logger.js';

const mongoUrl = process.env.MONGODB_URL;

mongoose.set('strictQuery', true);
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    })
.then(() => {
    logger.info("Database is connected Successfully!")
})
.catch(() => {
    logger.error("Failed To Connect To Database! Please Try Again");
    throw new Error("Failed To Connect To Database! Please Try Again");
})