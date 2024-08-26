import Router from "express";
import {
  getCategory,
  addCategory,
  deleteCategory,
  editCategory,
  getCategories,
} from "../controllers/category.controller.js";

import verifyJWT from "../middleware/auth.middleware.js";

import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/get_category/:id").get(verifyJWT, getCategory);

router
  .route("/add_category")
  .post(verifyJWT, upload.single("image_url"), addCategory);

router.route("/delete_category/:id").delete(verifyJWT, deleteCategory);

router
  .route("/update_category/:id")
  .put(verifyJWT, upload.single("image_url"), editCategory);

router.route("/list_categories").get(verifyJWT, getCategories);

export default router;
