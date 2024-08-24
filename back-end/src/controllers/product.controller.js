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
        attributes: ["id", "name"], // Specify which attributes to include from Category
      },
      {
        model: Subcategory,
        attributes: ["id", "name"], // Specify which attributes to include from Subcategory
      },
    ],
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        total: count,
        page,
        pageSize,
        data: rows,
      },
      "Products retrieved successfully."
    )
  );
});

// Add a new product
// Add a new product
export const addProduct = asyncHandler(async (req, res) => {
  const { category_id, subcategory_id, name } = req.body;
  const imageFile = req.file ? req.file.path : null;

  let imageUrl = null;

  if (imageFile) {
    imageUrl = await uploadOnImgbb(imageFile);
  }

  // Validate required fields
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

  // Check if category exists
  const category = await Category.findByPk(category_id);
  if (!category) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Category does not exist."));
  }

  // Check if subcategory exists
  const subcategory = await Subcategory.findByPk(subcategory_id);
  if (!subcategory) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Subcategory does not exist."));
  }

  // Create the product
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
  const { category_id, subcategory_id, name } = req.body;
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

  // Debug logging
  console.log("Updating product with ID:", id);

  // Fetch the existing product to get the current image URL if not updated
  const existingProduct = await Product.findByPk(id);

  if (!existingProduct) {
    console.log("Product not found with ID:", id); // Log if product is not found
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Product not found."));
  }

  // Update only the fields provided
  const updatedFields = {
    ...(category_id && { category_id }),
    ...(subcategory_id && { subcategory_id }),
    ...(name && { name }),
    ...(imageUrl && { image_url: imageUrl }), // Use imageUrl if it's set
  };

  // Debug logging
  console.log("Fields to update:", updatedFields);

  // Perform the update
  const [updated] = await Product.update(updatedFields, {
    where: { id },
    returning: true, // Get the updated rows back
  });

  if (updated) {
    // Fetch the updated product with associations
    const updatedProduct = await Product.findByPk(id, {
      include: [
        {
          model: Category,
          attributes: ["id", "name"], // Specify attributes from Category
        },
        {
          model: Subcategory,
          attributes: ["id", "name"], // Specify attributes from Subcategory
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

// Delete a product
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
