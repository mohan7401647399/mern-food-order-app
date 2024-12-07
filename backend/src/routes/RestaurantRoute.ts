import express from "express";
import { param } from "express-validator";
import RestaurantController from "../controllers/RestaurantController";

const router = express.Router();

// get a restaurant
router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("restaurantId Parameter must be a valid string"),
  RestaurantController.getRestaurant
);

//  search restaurant
router.get(
  "/search/:city",
  param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("City Parameter must be a valid string"),
  RestaurantController.searchRestaurant
);

export default router;
