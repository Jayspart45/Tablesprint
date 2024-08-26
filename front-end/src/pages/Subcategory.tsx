import React, { useEffect, useState } from "react";
import {
  getSubCategoryData,
  deleteSubCategory,
  addSubCategory,
  editSubCategory,
} from "../api/subcategoryApi";
import type { SubCategory } from "../components/SubCategory/SubCategoryComponent";
import SubCategoryComponent from "../components/SubCategory/SubCategoryComponent";
import { toast } from "react-toastify";
import Hero from "../components/SubCategory/Hero";
import { getCategoryData } from "../api/categoryApi";
import Loading from "../shared/Loading";

const SubCategory: React.FC = () => {
  const [data, setData] = useState<SubCategory[]>([]);
  const [editSubCategoryData, setEditSubCategoryData] =
    useState<SubCategory | null>(null);
  const [view, setView] = useState<"list" | "add" | "edit">("list");
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getSubCategoryData();
        setData(res);
        const categoriesData = await getCategoryData();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch subcategory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (subcategory: SubCategory) => {
    setEditSubCategoryData(subcategory);
    setView("edit");
  };

  const handleDelete = async (subcategory: SubCategory) => {
    try {
      await deleteSubCategory(subcategory.id);
      setData(data.filter((item) => item.id !== subcategory.id));
    } catch (error) {
      console.error("Failed to delete subcategory:", error);
    }
  };

  const handleAddSubmit = async (formData: FormData) => {
    try {

      await addSubCategory(formData);
      const updatedData = await getSubCategoryData();
      setData(updatedData);
      setView("list");
    } catch (error) {
      console.error("Failed to add subcategory:", error);
      toast.error("Failed to add subcategory. Please try again.");
    }
  };

  const handleEditSubmit = async (formData: FormData) => {
    if (editSubCategoryData) {
      try {
        await editSubCategory(editSubCategoryData.id, formData);
        const updatedData = await getSubCategoryData();
        setData(updatedData);
        setView("list");
        setEditSubCategoryData(null);
      } catch (error) {
        console.error("Failed to edit subcategory:", error);
        toast.error("Failed to edit subcategory. Please try again.");
      }
    }
  };

  return (
    <div className="w-full p-10 h-screen overflow-y-auto">
      {loading && <Loading />}

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
        <SubCategoryComponent
          setView={setView}
          title="Add SubCategory"
          onSubmit={handleAddSubmit}
          categories={categories}
        />
      )}

      {view === "edit" && editSubCategoryData && (
        <SubCategoryComponent
          setView={setView}
          title="Edit SubCategory"
          data={editSubCategoryData}
          onSubmit={handleEditSubmit}
          categories={categories}
        />
      )}
    </div>
  );
};

export default SubCategory;
