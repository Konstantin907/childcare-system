import express from 'express'
import { loginAdmin, logoutAdmin, registerAdmin } from '../../controllers/users.controller/users.controller.js';


const router = express.Router();

// routes for user:
router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.post('/logout', logoutAdmin);


export default router