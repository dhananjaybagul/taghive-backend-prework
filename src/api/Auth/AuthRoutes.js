import express from "express";
import { registerUser, test, userLogin } from "./AuthController.js";
const router = express.Router();

router.get('/test' ,test);
router.post('/register', registerUser);
router.post('/login', userLogin);
export default router;