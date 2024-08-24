import Router from "express"

const router = Router()

router.route("/get_category").get()
router.route("/add_category").post()
router.route("/delete_category").delete()
router.route("/update_category").put()