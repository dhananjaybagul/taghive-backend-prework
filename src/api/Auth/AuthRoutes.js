import express from "express";
import { registerUser, test } from "./AuthController.js";
const router = express.Router();

router.get('/test' ,test);
router.post('/register', registerUser);

export default router;