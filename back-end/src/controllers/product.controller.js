import { asyncHandler } from "../utils/asyncHandler.js";
import Product from "../model/product.model.js";
import Category from "../model/category.model.js";
import Subcategory from "../model/subcategory.model.js";
import { Op } from "sequelize";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { handleImageUpload } from "../utils/utils.js";



// Helper function to find a model by primary key
const findModelById = async (Model, id, modelName) => {
  const instance = await Model.findByPk(id);
  if (!instance) {
    throw new ApiError(404, `${modelName} not found.`);
  }
  return instance;
};

// Retrieve and paginate products
export const getProducts = asyncHandler(async (req, res) => {
  const {
    page = 1,
    pageSize = 10,
    searchTerm = "",
    sort = "{}",
  } = req.query;

  const { sortField = "createdAt", sortOrder = "DESC" } = JSON.parse(sort);

  const whereCondition = searchTerm
    ? { name: { [Op.iLike]: `%${searchTerm}%` } }
    : {};

  const orderCondition = [[sortField, sortOrder === "ascend" ? "ASC" : "DESC"]];

  const { count, rows } = await Product.findAndCountAll({
    where: whereCondition,
    order: orderCondition,
    limit: parseInt(pageSize, 10),
    offset: (parseInt(page, 10) - 1) * pageSize,
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

  res.status(200).json(new ApiResponse(200, rows, "Products retrieved successfully.", {
    total: count,
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
  }));
});

// Add a new product
export const addProduct = asyncHandler(async (req, res) => {
  const { category_id, subcategory_id, name } = req.body;

  if (!category_id || !subcategory_id || !name) {
    throw new ApiError(400, "Category ID, Subcategory ID, and Product name are required.");
  }

  await findModelById(Category, category_id, "Category");
  await findModelById(Subcategory, subcategory_id, "Subcategory");

  const imageUrl = await handleImageUpload(req.file?.path);

  const newProduct = await Product.create({
    category_id,
    subcategory_id,
    name,
    image_url: imageUrl,
  });

  res.status(201).json(new ApiResponse(201, newProduct, "Product added successfully."));
});

// Update an existing product
export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category_id, subcategory_id, name, status } = req.body;

  if (!id) {
    throw new ApiError(400, "Product ID is required.");
  }

  const existingProduct = await findModelById(Product, id, "Product");

  const imageUrl = await handleImageUpload(req.file?.path) || existingProduct.image_url;

  const updatedFields = {
    ...(category_id && { category_id }),
    ...(subcategory_id && { subcategory_id }),
    ...(name && { name }),
    ...(status && { status }),
    image_url: imageUrl,
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

    res.status(200).json(new ApiResponse(200, updatedProduct, "Product updated successfully."));
  } else {
    throw new ApiError(404, "Failed to update product.");
  }
});

// Delete an existing product
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiError(400, "Product ID is required.");
  }

  const deleted = await Product.destroy({ where: { id } });

  if (deleted) {
    res.status(200).json(new ApiResponse(200, null, "Product deleted successfully."));
  } else {
    throw new ApiError(404, "Product not found.");
  }
});
