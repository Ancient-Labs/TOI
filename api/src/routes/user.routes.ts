import { Router } from "npm:express";
import { updateUsername } from "../controllers/user.controllers.ts";

const router:Router = Router();;

router.patch('/username', updateUsername);

export default router;