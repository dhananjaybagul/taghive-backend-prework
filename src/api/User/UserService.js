import User from './UserModel.js';

export const findUser = async (email) => {
    return await User.findOne({ email: email })
}

export const createUser = async (userName, email, userPassword) => {
    const user = await User.create({
        userName,
        email: email.toLowerCase(),
        password: userPassword,
    });
    return await user.save().then((data) => {
        let userData = data.toObject();
        delete (userData.password);
        return userData;
    })
}