import { Router } from "express";
import { updatePassword, updateUser } from "../../controller/user/user.js";
import { verifyToken } from "../../middleware/auth.js";

const router = Router();

router.put("/update/", verifyToken, updateUser);
router.put("/updatepassword/", verifyToken, updatePassword);

export default router;
