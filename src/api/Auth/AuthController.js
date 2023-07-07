import logger from "../../logger/logger.js";
import { isEmailValid, loginUser, registerUserData } from "./AuthService.js";

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
        const { userName, email, password, role } = req.body;

        let isValidEmail = await isEmailValid(email);

        if (!isValidEmail) {
            logger.error({ "Status": "FAILED", "Response": "E-mail is Not valid, Please Enter Valid Email Id" });
            res.status(400).send({ "Status": "FAILED", "Response": "E-mail is Not valid, Please Enter Valid Email Id" });
        }
        await registerUserData(userName, email, password, role).then((response) => {
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

export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        logger.info("req.body :", { email, password });
        if ((email && email.length == 0) && (password && password.length == 0)) {
            logger.error("Please Enter Valid Login Credentials");
            res.status(400).send({ Message: "Please Enter Valid Login Credentials" })
        }

        await loginUser(email, password).then((response) => {
            res.status(200).send({ "Status": "SUCCESS", "Response": response });
        }).catch((err) => {
            res.status(400).send({ "Status": "FAILED", "Response:": err.message })
        })
    }
    catch (e) {
        logger.error("Error in userLogin controller : ", e.message);
        throw new Error("Error in userLogin controller : ", e.message);
    }
}