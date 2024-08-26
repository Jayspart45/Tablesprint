import { asyncHandler } from "../utils/asyncHandler.js";
import Subcategory from "../model/subcategory.model.js";
import Category from "../model/category.model.js";
import { Op } from "sequelize";
import { ApiResponse } from "../utils/ApiResponse.js";
import { handleImageUpload } from "../utils/utils.js";
import { ApiError } from "../utils/ApiError.js";

// Get list of subcategories with pagination, search, and sorting
export const getSubcategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const searchTerm = req.query.searchTerm || "";
  const sort = JSON.parse(req.query.sort || "{}");
  const { sortField = "createdAt", sortOrder = "DESC" } = sort;

  const whereCondition = searchTerm
    ? { name: { [Op.iLike]: `%${searchTerm}%` } }
    : {};

  const orderCondition = [
    [sortField, sortOrder.toUpperCase() === "ASC" ? "ASC" : "DESC"],
  ];

  const { count, rows } = await Subcategory.findAndCountAll({
    where: whereCondition,
    order: orderCondition,
    limit: pageSize,
    offset: (page - 1) * pageSize,
    include: [
      {
        model: Category,
        attributes: ["id", "name"],
      },
    ],
    attributes: ["id", "name", "status", "sequence", "image_url"],
  });

  res.status(200).json(
    new ApiResponse(200, rows, "Subcategories retrieved successfully.", {
      total: count,
      page,
      pageSize,
    })
  );
});

// Add a new subcategory
export const addSubcategory = asyncHandler(async (req, res) => {
  const { category_id, name, sequence } = req.body;
  const imageFile = req.file ? req.file.path : null;

  if (!category_id || !name || !sequence) {
    throw new ApiError(400, "Category ID, name, and sequence are required.");
  }

  const category = await Category.findByPk(category_id);
  if (!category) {
    throw new ApiError(400, null, "Category does not exist.");
  }

  const imageUrl = await handleImageUpload(imageFile);

  const newSubcategory = await Subcategory.create({
    category_id,
    name,
    sequence,
    image_url: imageUrl,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, newSubcategory, "Subcategory added successfully.")
    );
});

// Update an existing subcategory
export const updateSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category_id, name, sequence, status } = req.body;
  const imageFile = req.file ? req.file.path : null;

  if (!id) {
    throw new ApiError(400, null, "Subcategory ID is required.");
  }

  const existingSubcategory = await Subcategory.findByPk(id);
  if (!existingSubcategory) {
    throw new ApiResponse(404, "Subcategory not found.");
  }

  const updatedImageUrl =
    (await handleImageUpload(imageFile)) || existingSubcategory.image_url;

  const [updated] = await Subcategory.update(
    {
      ...(category_id && { category_id }),
      ...(name && { name }),
      ...(sequence && { sequence }),
      ...(status && { status }),
      image_url: updatedImageUrl,
    },
    {
      where: { id },
      returning: true,
    }
  );

  if (updated) {
    const updatedSubcategory = await Subcategory.findByPk(id);
    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          updatedSubcategory,
          "Subcategory updated successfully."
        )
      );
  } else {
    throw new ApiResponse(404, "Failed to update subcategory.");
  }
});

// Delete an existing subcategory
export const deleteSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    throw new ApiResponse(400, "Subcategory ID is required.");
  }

  const deleted = await Subcategory.destroy({ where: { id } });

  if (deleted) {
    res
      .status(200)
      .json(new ApiResponse(200, null, "Subcategory deleted successfully."));
  } else {
    throw new ApiResponse(404, "Subcategory not found.");
  }
});
