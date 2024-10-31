import express from 'express'
import { addParent, childStatus, getAll, verifyPinAndGetChildInfo } from '../../controllers/parents.controller/parents.controller.js';


const router = express.Router();

// adding a parent:
router.post('/add', addParent)
// search for kid in childcare:
router.post('/verify-pin', verifyPinAndGetChildInfo)
// kid status(sign-in & sign out)
router.put('/update-status', childStatus)
// get all for admin dashboard:
router.get('/getAll', getAll)

export default router;