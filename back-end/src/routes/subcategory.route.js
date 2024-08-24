import Router from "express"

const router = Router()

router.route("/get_sub_category").get()
router.route("/add_sub_category").post()
router.route("/delete_sub_category").delete()
router.route("/update_sub_category").put()