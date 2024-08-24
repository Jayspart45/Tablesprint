import { asyncHandler } from '../utils/asyncHandler.js';
import Subcategory from '../model/subcategory.model.js';
import Category from '../model/category.model.js';
import { Op } from 'sequelize';
import { ApiResponse } from '../utils/ApiResponse.js';
import { uploadOnImgbb } from '../utils/cloudinary.js';

export const getSubcategories = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 10;
  const searchTerm = req.query.searchTerm || '';
  const sort = JSON.parse(req.query.sort || '{}');
  const { sortField, sortOrder } = sort;

  const whereCondition = searchTerm
    ? { name: { [Op.iLike]: `%${searchTerm}%` } }
    : {};

  const orderCondition = sortField && sortOrder
    ? [[sortField, sortOrder === 'ascend' ? 'ASC' : 'DESC']]
    : [['createdAt', 'DESC']];

  const { count, rows } = await Subcategory.findAndCountAll({
    where: whereCondition,
    order: orderCondition,
    limit: pageSize,
    offset: (page - 1) * pageSize,
    include: [
      {
        model: Category,
        attributes: ['id', 'name'], // Specify which attributes to include from Category
      },
    ],
  });

  res.status(200).json(new ApiResponse(200, {
    total: count,
    page,
    pageSize,
    data: rows,
  }, 'Subcategories retrieved successfully.'));
});

// Add a new subcategory
export const addSubcategory = asyncHandler(async (req, res) => {
  const { category_id, name, sequence } = req.body;
  const imageFile = req.file ? req.file.path : null;

  let imageUrl = null;

  if (imageFile) {
    imageUrl = await uploadOnImgbb(imageFile);
  }

  // Validate required fields
  if (!category_id || !name || !sequence) {
    return res
      .status(400)
      .json(
        new ApiResponse(
          400,
          null,
          "Category ID, name, and sequence are required."
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

  // Create the subcategory
  const newSubcategory = await Subcategory.create({
    category_id,
    name,
    sequence,
    image_url: imageUrl,
  });

  res
    .status(201)
    .json(new ApiResponse(201, newSubcategory, "Subcategory added successfully."));
});


// Update an existing subcategory
export const updateSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category_id, name, sequence } = req.body;
  const imageFile = req.file ? req.file.path : null;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, null, "Subcategory ID is required."));
  }

  // Debug logging
  console.log("Updating subcategory with ID:", id);

  // Fetch the existing subcategory to get the current image URL if not updated
  const existingSubcategory = await Subcategory.findByPk(id);

  if (!existingSubcategory) {
    console.log("Subcategory not found with ID:", id); // Log if subcategory is not found
    return res.status(404).json(new ApiResponse(404, null, "Subcategory not found."));
  }

  let updatedImageUrl = existingSubcategory.image_url;

  if (imageFile) {
    // Upload the new image and get the URL
    updatedImageUrl = await uploadOnImgbb(imageFile);
  }

  // Update only the fields provided
  const updatedFields = {
    ...(category_id && { category_id }),
    ...(name && { name }),
    ...(sequence && { sequence }),
    ...(updatedImageUrl && { image_url: updatedImageUrl }), // Use updatedImageUrl if it's set
  };

  // Debug logging
  console.log("Fields to update:", updatedFields);

  // Perform the update
  const [updated] = await Subcategory.update(updatedFields, {
    where: { id },
    returning: true, // Get the updated rows back
  });

  if (updated) {
    const updatedSubcategory = await Subcategory.findByPk(id);

    res.status(200).json(new ApiResponse(200, updatedSubcategory, "Subcategory updated successfully."));
  } else {
    res.status(404).json(new ApiResponse(404, null, "Subcategory not found."));
  }
});


// Delete a subcategory
export const deleteSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, null, 'Subcategory ID is required.'));
  }

  const deleted = await Subcategory.destroy({ where: { id } });

  if (deleted) {
    res.status(200).json(new ApiResponse(200, null, 'Subcategory deleted successfully.'));
  } else {
    res.status(404).json(new ApiResponse(404, null, 'Subcategory not found.'));
  }
});
