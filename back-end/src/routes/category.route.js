import Router from "express";
import {
  getCategory,
  addCategory,
  deleteCategory,
  editCategory,
  listCategories,
} from "../controllers/category.controller.js";

import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/get_category/:id").get(getCategory);

router.route("/add_category").post(upload.single("image_url"), addCategory);

router.route("/delete_category/:id").delete(deleteCategory);

router.route("/update_category/:id").put(upload.single("image_url"), editCategory);

router.route("/list_categories").get(listCategories);

export default router;
