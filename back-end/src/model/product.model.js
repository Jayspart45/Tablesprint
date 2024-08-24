import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import Category from "./category.model.js";
import Subcategory from "./subcategory.model.js";

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Categories",
        key: "id",
      },
    },
    subcategory_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Subcategories",
        key: "id",
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
    tableName: "Products",
  }
);
Product.belongsTo(Category, { foreignKey: "category_id" });
Product.belongsTo(Subcategory, { foreignKey: "subcategory_id" });
Category.hasMany(Product, { foreignKey: "category_id" });
Subcategory.hasMany(Product, { foreignKey: "subcategory_id" });

export default Product;
