import React, { useEffect, useState } from "react";
import {
  getCategoryData,
  deleteCategory,
  addCategory,
  editCategory, // Ensure this function is imported
} from "../api/categoryApi";
import Hero from "../components/Category/Hero";
import type { Category } from "../components/Category/CategoryComponent";
import CategoryComponent from "../components/Category/CategoryComponent";
import { toast } from "react-toastify";

const Category: React.FC = () => {
  const [data, setData] = useState<Category[]>([]);
  const [editCategoryData, setEditCategoryData] = useState<Category | null>(
    null
  );
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getCategoryData();
        console.log(res);

        setData(res);
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (category: Category) => {
    console.log(category);

    setEditCategoryData(category);
    setView("edit");
  };

  const handleDelete = async (category: Category) => {
    try {
      await deleteCategory(category.id);
      setData(data.filter((item) => item.id !== category.id));
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleAddSubmit = async (formData: FormData) => {
    try {
      await addCategory(formData);
      const updatedData = await getCategoryData();
      setData(updatedData);
      setView("list");
    } catch (error) {
      console.error("Failed to add category:", error);
      toast.error("Failed to add category. Please try again.");
    }
  };

  const handleEditSubmit = async (formData: FormData) => {
    if (editCategoryData) {
      try {
        await editCategory(editCategoryData.id, formData); 
        const updatedData = await getCategoryData();
        setData(updatedData);
        setView("list");
        setEditCategoryData(null);
      } catch (error) {
        console.error("Failed to edit category:", error);
        toast.error("Failed to edit category. Please try again.");
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
        <CategoryComponent
          setView={setView}
          title="Add Category"
          onSubmit={handleAddSubmit}
        />
      )}

      {view === "edit" && editCategoryData && (
        <CategoryComponent
          setView={setView}
          title="Edit Category"
          data={editCategoryData}
          onSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default Category;
