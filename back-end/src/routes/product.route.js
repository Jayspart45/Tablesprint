import { Router } from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { upload } from "../middleware/multer.middleware.js";

import verifyJWT from "../middleware/auth.middleware.js";

const router = Router();

router.route("/list_products").get(verifyJWT, getProducts);

router
  .route("/add_product")
  .post(verifyJWT, upload.single("image_url"), addProduct);

router
  .route("/update_product/:id")
  .put(verifyJWT, upload.single("image_url"), updateProduct);

router.route("/delete_product/:id").delete(verifyJWT, deleteProduct);

export default router;
