import logger from "../../logger/logger.js";
import { emailRegexValue, passwordregexValue } from "../../resource/constants.js";
import { createUser, findUser, generatePassword, savePassword } from "../User/UserService.js";
import cryptojs from 'crypto-js'
import {sendChangedPasswordEmail, sendRegistrationEmail} from '../Email/EmailService.js'
import { roles } from "../User/UserModel.js";
import { generateToken } from "../../resource/utils.js";

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

export const registerUserData = async (userName, email, password, role) => {
    try {
        if (userName.length == 0 || email.length == 0 || password.length == 0 || role.length == 0) {
            throw new Error("Please Enter Valid Data");
        }
        if(!roles.includes(role)){
            throw new Error("Please Enter Valid Role. Role should be Teacher, Student or ADMIN");
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
            let userData = await createUser(userName, email.toLowerCase(), userPassword, role);
            logger.info("userData : ", userData);
            await sendRegistrationEmail(email, userName);
            return (userData);
    } catch (error) {
        logger.error("Error in registerUserData : ", error);
        throw new Error(error.message)
    }
}

export const loginUser = async (email, password) => {
    try {
        logger.info("email :", email, "password : ", password);
        let user = await findUser(email);
        logger.info("response from db :", user);
        if (!user) {
            throw new Error("User Doesnt Exist , Please Register Yourself.")
        }
        let userPassword = cryptojs.AES.decrypt(user.password, process.env.ENCRYPTION_KEY)
        let decryptedUserPass = userPassword.toString(cryptojs.enc.Utf8);
        logger.info("converted pass :", decryptedUserPass);

        let comparedPass = (password === decryptedUserPass);
        logger.info("comparedPass :", comparedPass);

        if (!(user && comparedPass)) {
            throw new Error("you have Entered Invalid Email or Password , Please Try Again.")
        }

        const payload = {
            email,
            id: user._id.toString(),
            role: user.role
        };
        let jwtToken = generateToken(payload, '2d');
        let message = `Welcome ${user.userName}`;
        return { message, jwtToken }
    }
    catch (e) {
        logger.error("Error in login catch :", e);
        throw (e);
    }
}

export const passwordReset = async (email, oldpassword, newpassword, confirmpassword) => {
    try {
        let user = await findUser(email);
        logger.info("user", user);
        if (!user) {
            throw new Error("User Not Found");
        }
        logger.info("oldpassword :", oldpassword, "newpassword :", newpassword);
        logger.info("user.password :", user.password);

        let dbUserPassword = cryptojs.AES.decrypt(user.password, process.env.ENCRYPTION_KEY);
        let decryptedUserPass = dbUserPassword.toString(cryptojs.enc.Utf8);
        logger.info("decryptedUserPass :", decryptedUserPass);

        let passcompare = (decryptedUserPass === oldpassword);
        logger.info("comparedPass :", passcompare);

        if (!passcompare) {
            throw new Error("Old password doesn't match")
        }

        if (oldpassword === newpassword) {
            throw new Error("Please enter another password")
        }

        if (newpassword !== confirmpassword) {
            throw new Error("New password and Confirm password doesn't match ,please enter same password")
        }

        if (!(newpassword.length > 5) && !(confirmpassword.length > 5)) {
            throw new Error("Password length must be greater than 5");
        }

        let paswd = passwordregexValue;
        if (!newpassword.match(paswd)) {
            throw new Error("Your password must contain at least one uppercase, one numeric digit and a special character")
        }

        logger.info("user before password reset:", user);
        let userPassword = cryptojs.AES.encrypt(newpassword, process.env.ENCRYPTION_KEY).toString();
        logger.info("userPassword :", userPassword);

        let updatedUser = await savePassword(email, userPassword);
        logger.info("new password :", newpassword);
        logger.info("user after password reset:", updatedUser);
        return ("Password changed successfully!")
    }
    catch (e) {
        logger.error("Error in passwordReset catch : ", e.message);
        throw new Error(e.message);
    }
}

export const passwordForgot = async (email) => {
    try {
        let pass = await generatePassword();
        logger.info("Randomly Generated Password : ", pass);
        let newPassword = cryptojs.AES.encrypt(pass, process.env.ENCRYPTION_KEY).toString();
        await savePassword(email, newPassword);
        await sendChangedPasswordEmail(email, pass);
        return ('We Have Mailed You The Newly Generated Password, Please Check.')
    }
    catch (e) {
        logger.error("Error in passwordForgot catch : ", e);
        throw new Error('Failed To Create New Password , Please Try Again.')
    }
}