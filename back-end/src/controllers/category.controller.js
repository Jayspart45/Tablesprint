import { asyncHandler } from "../utils/asyncHandler.js";
import Category from "../model/category.model.js";
import { uploadOnImgbb } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Op } from "sequelize";

export const addCategory = asyncHandler(async (req, res) => {
  const { name, sequence } = req.body;
  if (!name || !sequence) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "name and sequence are required."));
  }
  const image_url = req.file ? req.file.path : null;

  let url = null;

  if (image_url) {
    url = await uploadOnImgbb(image_url);
  }

  const category = await Category.create({
    name,
    sequence,
    image_url: url,
  });

  res.status(201).json(new ApiResponse(200, category, "Category uploaded"));
});

export const getCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findByPk(id);
  if (!category) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Category not found"));
  }
  res
    .status(200)
    .json(new ApiResponse(200, category, "Category retrieved successfully"));
});

export const listCategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const pageSize = parseInt(req.query.pageSize) || 10;
  const searchTerm = req.query.searchTerm || "";
  const sortField = req.query.sortField || "id";
  const sortOrder = req.query.sortOrder || "ASC";

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
    attributes: ['id', 'name', 'status', 'sequence', 'image_url']
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

export const editCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, sequence, status } = req.body;
  const imageFile = req.file ? req.file.path : null;

  let updatedImageUrl = null;

  if (!id) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Category ID is required."));
  }

  console.log("Editing category with ID:", id);

  const existingCategory = await Category.findByPk(id);

  if (!existingCategory) {
    console.log("Category not found with ID:", id); // Log if category is not found
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Category not found."));
  }

  if (imageFile) {
    updatedImageUrl = await uploadOnImgbb(imageFile);
  } else {
    updatedImageUrl = existingCategory.image_url;
  }

  const updatedFields = {
    ...(name && { name }),
    ...(sequence && { sequence }),
    ...(status && { status }),
    ...(updatedImageUrl && { image_url: updatedImageUrl }), // Use updatedImageUrl if it's set
  };

  console.log("Fields to update:", updatedFields);

  const [updated] = await Category.update(updatedFields, {
    where: { id },
    returning: true, 
  });

  if (updated) {
    const updatedCategory = await Category.findByPk(id);

    res
      .status(200)
      .json(
        new ApiResponse(200, updatedCategory, "Category updated successfully.")
      );
  } else {
    res.status(404).json(new ApiResponse(404, null, "Category not found."));
  }
});


export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deleted = await Category.destroy({ where: { id } });

  if (deleted === 0) {
    return res
      .status(404)
      .json(new ApiResponse(404, null, "Category not found"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Category deleted successfully"));
});
