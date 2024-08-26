import { asyncHandler } from "../utils/asyncHandler.js";
import Category from "../model/category.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Op } from "sequelize";
import { handleImageUpload } from "../utils/utils.js";

// Add a new category
export const addCategory = asyncHandler(async (req, res) => {
  const { name, sequence } = req.body;
  
  if (!name || !sequence) {
    throw new ApiError(400, "name and sequence are required.");
  }

  const image_url = req.file ? req.file.path : null;
  const uploadedImageUrl = await handleImageUpload(image_url);

  const category = await Category.create({
    name,
    sequence,
    image_url: uploadedImageUrl,
  });

  res.status(201).json(new ApiResponse(200, category, "Category uploaded successfully."));
});

// Retrieve a category by ID
export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);
  if (!category) {
    throw new ApiError(404, "Category not found.");
  }

  res.status(200).json(new ApiResponse(200, category, "Category retrieved successfully."));
});

export const getCategories = asyncHandler(async (req, res) => {
  const {
    page = 1,
    pageSize = 10,
    searchTerm = "",
    sortField = "id",
    sortOrder = "ASC",
  } = req.query;

  const offset = (page - 1) * pageSize;

  const { count, rows } = await Category.findAndCountAll({
    where: {
      name: {
        [Op.iLike]: `%${searchTerm}%`,
      },
    },
    order: [[sortField, sortOrder]],
    limit: pageSize,
    offset,
    attributes: ["id", "name", "status", "sequence", "image_url"],
  });

 
  res.status(200).json(new ApiResponse(200, rows, "Category retrieved successfully.", {
    total: count,
    page: parseInt(page, 10),
    pageSize: parseInt(pageSize, 10),
  }));
});

// Edit an existing category
export const editCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, sequence, status } = req.body;
  const imageFile = req.file ? req.file.path : null;

  if (!id) {
    throw new ApiError(400, "Category ID is required.");
  }

  const existingCategory = await Category.findByPk(id);

  if (!existingCategory) {
    throw new ApiError(404, "Category not found.");
  }

  const updatedImageUrl = await handleImageUpload(imageFile) || existingCategory.image_url;

  const updatedFields = {
    ...(name && { name }),
    ...(sequence && { sequence }),
    ...(status && { status }),
    image_url: updatedImageUrl,
  };

  const [updated] = await Category.update(updatedFields, {
    where: { id },
    returning: true,
  });

  if (updated) {
    const updatedCategory = await Category.findByPk(id);
    res.status(200).json(new ApiResponse(200, updatedCategory, "Category updated successfully."));
  } else {
    throw new ApiError(404, "Failed to update category.");
  }
});

// Delete an existing category
export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Category.destroy({ where: { id } });

  if (deleted === 0) {
    throw new ApiError(404, "Category not found.");
  }

  res.status(200).json(new ApiResponse(200, null, "Category deleted successfully."));
});
