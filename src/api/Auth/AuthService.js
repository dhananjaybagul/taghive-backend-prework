import logger from "../../logger/logger.js";
import { emailRegexValue, passwordregexValue } from "../../resource/constants.js";
import { createUser, findUser } from "../User/UserService.js";
import cryptojs from 'crypto-js'
import {sendRegistrationEmail} from '../Email/EmailService.js'

export const isEmailValid = async (email) => {
    let emailRegex = emailRegexValue;
    try {
        if (!email)
            return false;
        if (email.length > 254)
            return false;
        let valid = emailRegex.test(email);
        if (!valid)
            return false;
        let parts = email.split("@");
        if (parts[0].length > 64)
            return false;
        let domainParts = parts[1].split(".");
        if (domainParts.some(function (part) { return part.length > 63; }))
            return false;
        return true;
    }
    catch (e) {
        logger.error("Error in isEmailValid catch : ", e);
        throw (e);
    }
}

export const registerUserData = async (userName, email, password) => {
    try {
        if (userName.length == 0 || email.length == 0 || password.length == 0) {
            throw new Error("Please Enter Valid Data");
        }
        if (password.length < 5) {
            throw new Error("Password Length Must be Greater than 5")
        }
        let paswd = passwordregexValue;
        if (!password.match(paswd)) {
            throw new Error("Your password must contain at least one uppercase, one numeric digit and a special character")
        }
        let getUserFromDB = await findUser(email);
        if (getUserFromDB) {
            throw new Error("User Already Exists! Please Login");
        }
            let userPassword = cryptojs.AES.encrypt(password, process.env.ENCRYPTION_KEY).toString();
            logger.info("user pass", userPassword);
            logger.info(cryptojs.AES.encrypt(password, process.env.ENCRYPTION_KEY).toString());
            let userData = await createUser(userName, email.toLowerCase(), userPassword);
            logger.info("userData : ", userData);
            await sendRegistrationEmail(email, userName);
            return (userData);
    } catch (error) {
        logger.error("Error in registerUserData : ", error);
        throw new Error(error.message)
    }
}