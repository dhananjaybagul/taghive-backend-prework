import dotenv from 'dotenv'
dotenv.config();
import sgMail from '@sendgrid/mail';
import logger from '../../logger/logger.js';

sgMail.setApiKey(process.env.sendGrid_API_KEY)
const sendgridUserEmail = process.env.SENDGRID_USER_EMAIL;
const sendgridUserName = process.env.SENDGRID_USER_NAME;
let contact = 'contact@dhananjay.com';

export const sendRegistrationEmail = async (email,name) => {
        sgMail.send({
        to: email,
        from:{
            email :sendgridUserEmail,
            name: sendgridUserName
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

export const sendChangedPasswordEmail = async (email, pass) => {
    sgMail.send({
        to: email,
        from: {
            email: sendgridUserEmail,
            name: sendgridUserName
        },
        subject: 'Password changed successfully!',
        html: `<p>We detected that you have changed your password . The new password is <span style="font-weight: bold; color: #3d4852;">${pass}</span> , 
                you can change your password within 24 hours. If it's not you, Please fell free to contact us at <span style="font-weight: bold; color: #3d4852;">${contact}</span>`
    }).then(() => {
        logger.info('Email Sent Successfully!')
    })
        .catch((error) => {
            logger.error("Error in sendChangedPasswordEmail : ", error.message);
            throw new Error(error);
        })
}

export const sendCourseEnrollEmail = async (email, name, course) => {
    sgMail.send({
        to: email,
        from: {
            email: sendgridUserEmail,
            name: sendgridUserName
        },
        subject: 'New course enrollment',
        html:
        '<div style="font-size: 16px;">' +
        '<h4 style="color: #3d4852;"><b>Hello ' +
        name +
        '</b></h4> <br /> <p> You are successfully enrolled into ' + 
        course + 
        ' course.</p><br /><h4 style="color: #3d4852;"><b>Keep learning !!!</b></h4></div>',
    }).then(() => {
        logger.info('Email Sent Successfully!')
    })
        .catch((error) => {
            logger.error("Error in sendCourseEnrollEmail : ", error.message);
            throw new Error(error);
        })
}