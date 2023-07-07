import express from "express";
import { registerUser, resetUserPassword, test, userLogin } from "./AuthController.js";
const router = express.Router();

router.get('/test' ,test);
router.post('/register', registerUser);
router.post('/login', userLogin);
router.post('/reset_password', resetUserPassword);
export default router;