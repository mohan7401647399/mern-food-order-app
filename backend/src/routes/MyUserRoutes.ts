import express from "express";
import MyUserController from "../controllers/MyUserController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

//  user route controller
router
    //  get user
    .get('/', jwtCheck, jwtParse, MyUserController.getCurrentUser)
    //  create a new user
    .post("/", jwtCheck, MyUserController.createCurrentUser)
    //  update the existing user
    .put(
        "/",
        jwtCheck,
        jwtParse,
        validateMyUserRequest,
        MyUserController.updateCurrentUser
    );

export default router;
