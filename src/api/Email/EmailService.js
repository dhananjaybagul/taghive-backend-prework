import dotenv from 'dotenv'
dotenv.config();
import sgMail from '@sendgrid/mail';
import logger from '../../logger/logger.js';

sgMail.setApiKey(process.env.sendGrid_API_KEY)
const sendgridUserEmail = process.env.SENDGRID_USER_EMAIL;

export const sendRegistrationEmail = async (email, name) => {
    console.log({email,name,sendgridUserEmail});
        sgMail.send({
        to: email,
        from:{
            email :sendgridUserEmail,
            name: name
        } ,
        subject: 'Registration',
        html:
            '<div style="font-size: 16px;">' +
            '<h4 style="color: #3d4852;"><b>Hello ' +
            name +
            '</b></h4> <br /> <p> Your registration is completed successfully</p> </div>',
    }).then(() => {
        logger.info(`Email sent to ${email}`)
    })
        .catch((error) => {
            logger.error("Error in sendRegistrationEmail : ", error.message);
            throw new Error(error.message);
        })
}