import { Router } from "express";
import {
  getSubcategories,
  addSubcategory,
  updateSubcategory,
  deleteSubcategory,
} from "../controllers/subcategory.controller.js";
import { upload } from "../middleware/multer.middleware.js";

const router = Router();

router.route("/list_subcategories").get(getSubcategories);
router.route("/add_subcategory").post(upload.single("image_url"), addSubcategory);
router
  .route("/update_subcategory/:id")
  .put(upload.single("image_url"), updateSubcategory);
router.route("/delete_subcategory/:id").delete(deleteSubcategory);

export default router;
