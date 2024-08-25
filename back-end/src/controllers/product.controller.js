import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../model/product.model.js";
import Category from "../model/category.model.js";
import Subcategory from "../model/subcategory.model.js";
import { Op } from "sequelize";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnImgbb } from "../utils/cloudinary.js";

export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const searchTerm = req.query.searchTerm || "";
  const sort = JSON.parse(req.query.sort || "{}");
  const { sortField, sortOrder } = sort;

  const whereCondition = searchTerm
    ? { name: { [Op.iLike]: `%${searchTerm}%` } }
    : {};

  const orderCondition =
    sortField && sortOrder
      ? [[sortField, sortOrder === "ascend" ? "ASC" : "DESC"]]
      : [["createdAt", "DESC"]];

  const { count, rows } = await Product.findAndCountAll({
    where: whereCondition,
    order: orderCondition,
    limit: pageSize,
    offset: (page - 1) * pageSize,
    include: [
      {
        model: Category,
        attributes: ["id", "name"], 
      },
      {
        model: Subcategory,
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "name", "status", "image_url"],
  });

  res.status(200).json({
    success: true,
    data: rows,
    pagination: {
      total: count,
      page,
      pageSize,
    },
  });
});


export const addProduct = asyncHandler(async (req, res) => {
  const { category_id, subcategory_id, name } = req.body;
  const imageFile = req.file ? req.file.path : null;

  let imageUrl = null;

  if (imageFile) {
    imageUrl = await uploadOnImgbb(imageFile);
  }

  if (!category_id || !subcategory_id || !name) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          "Category ID, subcategory ID, and product name are required."
        )
      );
  }

  const category = await Category.findByPk(category_id);
  if (!category) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Category does not exist."));
  }

  const subcategory = await Subcategory.findByPk(subcategory_id);
  if (!subcategory) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Subcategory does not exist."));
  }

  const newProduct = await Product.create({
    category_id,
    subcategory_id,
    name,
    image_url: imageUrl,
  });

  res
    .status(201)
    .json(new ApiResponse(201, newProduct, "Product added successfully."));
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category_id, subcategory_id, name, status } = req.body;
  const imageFile = req.file ? req.file.path : null;

  let imageUrl = null;

  if (imageFile) {
    imageUrl = await uploadOnImgbb(imageFile);
  }

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Product ID is required."));
  }


  const existingProduct = await Product.findByPk(id);

  if (!existingProduct) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Product not found."));
  }

  const updatedFields = {
    ...(category_id && { category_id }),
    ...(subcategory_id && { subcategory_id }),
    ...(name && { name }),
    ...(status && { status }),
    ...(imageUrl && { image_url: imageUrl }), 
  };


  const [updated] = await Product.update(updatedFields, {
    where: { id },
    returning: true, 
  });

  if (updated) {
    const updatedProduct = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["id", "name"], 
        },
        {
          model: Subcategory,
          attributes: ["id", "name"], 
        },
      ],
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedProduct, "Product updated successfully.")
      );
  } else {
    res.status(404).json(new ApiResponse(404, null, "Product not found."));
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Product ID is required."));
  }

  const deleted = await Product.destroy({ where: { id } });

  if (deleted) {
    res
      .status(200)
      .json(new ApiResponse(200, null, "Product deleted successfully."));
  } else {
    res.status(404).json(new ApiResponse(404, null, "Product not found."));
  }
});
