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
