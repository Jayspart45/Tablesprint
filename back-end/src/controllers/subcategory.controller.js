import { asyncHandler } from '../utils/asyncHandler.js';
import Subcategory from '../model/subcategory.model.js';
import Category from '../model/category.model.js';
import { Op } from 'sequelize';
import { ApiResponse } from '../utils/ApiResponse.js';

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
  const { category_id, name, sequence, image_url } = req.body;

  if (!category_id || !name || !sequence) {
    return res.status(400).json(new ApiResponse(400, null, 'Category ID, name, and sequence are required.'));
  }

  const newSubcategory = await Subcategory.create({ category_id, name, sequence, image_url });
  res.status(201).json(new ApiResponse(201, newSubcategory, 'Subcategory added successfully.'));
});

// Update an existing subcategory
export const updateSubcategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category_id, name, sequence, image_url } = req.body;

  if (!id) {
    return res.status(400).json(new ApiResponse(400, null, 'Subcategory ID is required.'));
  }

  const [updated] = await Subcategory.update(
    { category_id, name, sequence, image_url },
    { where: { id } }
  );

  if (updated) {
    const updatedSubcategory = await Subcategory.findByPk(id);
    res.status(200).json(new ApiResponse(200, updatedSubcategory, 'Subcategory updated successfully.'));
  } else {
    res.status(404).json(new ApiResponse(404, null, 'Subcategory not found.'));
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
