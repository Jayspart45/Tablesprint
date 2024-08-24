import Router from "express"

const router = Router()

router.route("/get_product").get()
router.route("/add_product").post()
router.route("/delete_product").delete()
router.route("/update_product").put()