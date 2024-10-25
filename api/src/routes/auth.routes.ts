import { Router } from "npm:express";

// Import controllers.
import { signin, signout, signup } from "../controllers/auth.controllers.ts";

const router:Router = Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/signout', signout)

export default router;