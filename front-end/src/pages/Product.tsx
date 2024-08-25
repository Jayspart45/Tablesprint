import React, { useEffect, useState } from "react";
import {
  getProductData,
  deleteProduct,
  addProduct,
  editProduct,
} from "../api/productApi";
import type { Product } from "../components/Product/ProductComponent";
import ProductComponent from "../components/Product/ProductComponent";
import { toast } from "react-toastify";
import Hero from "../components/Product/Hero";
import { getCategoryData } from "../api/categoryApi";
import { getSubCategoryData } from "../api/subcategoryApi";

const Product: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [editProductData, setEditProductData] = useState<Product | null>(null);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [subcategories, setSubcategories] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await getProductData();
        setData(products);

        const categoriesData = await getCategoryData(); // Fetch categories
        setCategories(categoriesData);

        const subcategoriesData = await getSubCategoryData(); // Fetch subcategories
        setSubcategories(subcategoriesData);
      } catch (error) {
        console.error("Failed to fetch product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (product: Product) => {
    setEditProductData(product);
    setView("edit");
  };

  const handleDelete = async (product: Product) => {
    try {
      await deleteProduct(product.id);
      setData(data.filter((item) => item.id !== product.id));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  const handleAddSubmit = async (formData: FormData) => {
    try {
      await addProduct(formData);
      const updatedData = await getProductData();
      setData(updatedData);
      setView("list");
    } catch (error) {
      console.error("Failed to add product:", error);
      toast.error("Failed to add product. Please try again.");
    }
  };

  const handleEditSubmit = async (formData: FormData) => {
    if (editProductData) {
      try {
        await editProduct(editProductData.id, formData);
        const updatedData = await getProductData();
        setData(updatedData);
        setView("list");
        setEditProductData(null);
      } catch (error) {
        console.error("Failed to edit product:", error);
        toast.error("Failed to edit product. Please try again.");
      }
    }
  };

  return (
    <div className="w-full p-10 h-screen overflow-y-auto">
      {loading && <p>Loading...</p>}

      {view === "list" && (
        <>
          <Hero
            data={data}
            setView={setView}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}

      {view === "add" && (
        <ProductComponent
          setView={setView}
          title="Add Product"
          onSubmit={handleAddSubmit}
          categories={categories}
          subcategories={subcategories}
        />
      )}

      {view === "edit" && editProductData && (
        <ProductComponent
          setView={setView}
          title="Edit Product"
          data={editProductData}
          onSubmit={handleEditSubmit}
          categories={categories}
          subcategories={subcategories}
        />
      )}
    </div>
  );
};

export default Product;
