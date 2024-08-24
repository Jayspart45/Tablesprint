import { Router } from 'express';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';
import { upload } from "../middleware/multer.middleware.js";


const router = Router();

router.route('/list_products').get(getProducts);
router.route('/add_product').post(upload.single("image"),addProduct);
router.route('/update_product/:id').put(upload.single("image"),updateProduct);
router.route('/delete_product/:id').delete(deleteProduct);

export default router;
