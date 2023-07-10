# Taghive-Backend-Prework
### 📚 Description

This is a Node JS project for taghive-backend-prework.

---

### 🛠️ Prerequisites

#### Node version

- Install node version >=16.

#### TypeScript version
- Install TypeScript version >=5. (5.1.6)

---

### 👉 General Steps

- Create copy of `.env.example` file.

- Assign appropriate values to variables. (Follow below Environment Configuration section for more details)

- Execute the following command to install the dependencies:

```bash
$ npm install
```

- Execute the following command to to run the project:

```bash
$ npm run start
```

---

### 🔒 Environment Configuration

By default, the application comes with a config module that can read in every environment variable from the .env file.

**MODE** - the application environment to execute as, either in test, development or production. Determines the type of logging options to utilize. Options: `TEST`, `DEV` or `PROD`.

**PORT** - the port on which application will going to run. For e.x: `3000`, `3001`.

**MONGODB_URL** - the URL to the MongoDB collection.

**ENCRYPTION_KEY** - key which will use to encrypt and decrypt the password.

**JWT_SECRET** - the secret key that will going to use while generating token.

**SENDGRID_API_KEY** - sendgrid API key which will give access to use sendgrid mail service for sending mail to the user.

**SENDGRID_USER_EMAIL** - the authenticated mail from sendgrid, used for sending mails.

**SENDGRID_USER_NAME** - the mail sender name.

---


### 📝 API Collection/ Open API

Below is the postman collection for this application. You can import this link into your postman collection and try with calling API's. \
[Postman Collection](https://api.postman.com/collections/17072801-4f35b5e4-512d-4488-a513-57b7b3fa66ef?access_key=PMAT-01H4ZAEQ5R4H76AF4473ETVWH6)

---

### ✨ Mongoose

Mongoose provides a straight-forward, schema-based solution to model your application data. It includes built-in type casting, validation, query building, business logic hooks and more, out of the box. Please view the [documentation](https://mongoosejs.com) for further details.

The configuration for Mongoose can be found in the [database module](/src/database/dbconfig.js#L9).

---

### 🔊 Logs

This server comes with an integrated Winston module for logging, the configurations for Winston can be found in the [app module](/src/logger/logger.js#L4).

---