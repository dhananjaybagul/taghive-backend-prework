import {loggers} from "./appLogger.js";

let logger;
if (process.env.MODE === "TEST" ) {
    logger = loggers;
} else {
    logger = loggers;
}
export default logger;