import { Router } from "express";
import {
  getSubcategories,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategory.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/list_subcategories").get(verifyJWT, getSubcategories);

router
  .route("/add_subcategory")
  .post(verifyJWT, upload.single("image_url"), addSubcategory);

router
  .route("/update_subcategory/:id")
  .put(verifyJWT, upload.single("image_url"), updateSubcategory);

router.route("/delete_subcategory/:id").delete(verifyJWT, deleteSubcategory);

export default router;
