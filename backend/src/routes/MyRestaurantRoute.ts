import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

//  image upload
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //  5-mb
  },
});

//  restaurant route controller
router
  //  get the existing restaurant
  .get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant)
  
  //  create a new restaurant
  .post(
    "/",
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.createMyRestaurant,
  )

  //  update the existing restaurant
  .put(
    "/",
    upload.single("imageFile"),
    validateMyRestaurantRequest,
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateMyRestaurant,
  );

export default router;
