import { generatePasswordValue } from '../../resource/constants.js';
import User from './UserModel.js';

export const findUser = async (email) => {
    return await User.findOne({ email: email })
}

export const createUser = async (userName, email, userPassword, role) => {
    const user = await User.create({
        userName,
        email: email.toLowerCase(),
        password: userPassword,
        role
    });
    return await user.save().then((data) => {
        let userData = data.toObject();
        delete (userData.password);
        return userData;
    })
}

export const saveToken = async (email, jwtToken) => {
    try {
        let user = await findUser(email);
        if (!user) {
            throw new Error('User Not Found To Update Token')
        }
        user.token = jwtToken;
        return await user.save();
    }
    catch (e) {
        throw new Error('Error in saveToken :', e)
    }
}

export const savePassword = async (email, newPassword) => {
    try {
        let user = await findUser(email);
        if (!user) {
            throw new Error(`No User Found in savePassword`)
        }
        user.password = newPassword;
        console.log("Password Saved Successfully!");
        return await user.save();
    }
    catch (e) {
        console.log("Error in savePassword : ", e);
        throw (e);
    }
}

export const generatePassword = async () => {
    try {
        let length = 10,
            charSet = generatePasswordValue,
            newPassword = "";
        for (let i = 0, n = charSet.length; i < length; ++i) {
            newPassword += charSet.charAt(Math.floor(Math.random() * n));
        }
        return newPassword;
    }
    catch (e) {
        logger.error("Error in generatePassword catch : ", e.message);
        throw new Error(e.message);
    }
}
