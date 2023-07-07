import logger from "../../logger/logger.js";
import { isEmailValid, registerUserData } from "./AuthService.js";

export const test = (req, res) => {
    try {
        res.status(200).send('Test API called successfully!')
    } catch (error) {
        logger.error("Error in registerUser controller : ", error.message);
        throw new Error(error.message);
    }
}


export const registerUser = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        let isValidEmail = await isEmailValid(email);

        if (!isValidEmail) {
            logger.error({ "Status": "FAILED", "Response": "E-mail is Not valid, Please Enter Valid Email Id" });
            res.status(400).send({ "Status": "FAILED", "Response": "E-mail is Not valid, Please Enter Valid Email Id" });
        }
        await registerUserData(userName, email, password).then((response) => {
            logger.info("registerUserData function response : ", response);
            res.status(201).send({ "Status": "SUCCESS", "Message": "Account Registered Successfully!", "Response": response });
        }).catch((err) => {
            logger.error("registerUserData catch function :", err );
            res.status(400).send({ "Status": "FAILED", "Response": err.message });
        })
    }
    catch (e) {
        logger.error("Error in registerUser controller : ", e.message);
        throw new Error(e.message);
    }
}