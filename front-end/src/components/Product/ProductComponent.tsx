import React, { useEffect, useState } from "react";
import Flex from "../../shared/Flex";
import Input from "../../shared/Input";
import Select from "../../shared/Select";
import { toast } from "react-toastify";
import CustomFileInput from "../../shared/CustomFileInput";

export type Product = {
  id: number;
  name: string;
  image_url: string;
  categoryId: number;
  subcategoryId: number;
  status?: string;
  Category?: { id: number; name: string };
  SubCategory?: { id: number; name: string; Category: { id: number; name: string } };
};

interface ProductComponentProps {
  title: string;
  data?: Product;
  onSubmit: (formData: FormData) => void;
  setView: (view: "list" | "add" | "edit") => void;
  categories: { id: number; name: string }[];
  subcategories: { id: number; name: string; Category: { id: number; name: string } }[]; // Updated to match your data structure
}

const ProductComponent: React.FC<ProductComponentProps> = ({
  title,
  data,
  onSubmit,
  setView,
  categories,
  subcategories,
}) => {
  const [formData, setFormData] = useState<{
    productName: string;
    imageFile: File | null;
    categoryId: number;
    status: string;
    subcategoryId: number;
  }>({
    productName: "",
    imageFile: null,
    categoryId: categories.length > 0 ? categories[0].id : 0,
    subcategoryId: subcategories.length > 0 ? subcategories[0].id : 0,
    status: data?.status || "",
  });

  const [filteredSubcategories, setFilteredSubcategories] = useState<
    { id: number; name: string }[]
  >([]);

  useEffect(() => {
    if (data) {
      setFormData({
        productName: data.name,
        imageFile: null,
        categoryId: data.Category?.id || categories[0].id,
        subcategoryId: data.SubCategory?.id || subcategories[0].id,
        status: data?.status || "",
      });
    }
  }, [data, categories, subcategories]);

  useEffect(() => {
    // Filter subcategories based on the selected category
    const filtered = subcategories.filter(
      (sub) => sub.Category.id === formData.categoryId
    );
    setFilteredSubcategories(filtered);
  }, [formData.categoryId, subcategories]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      categoryId: parseInt(e.target.value),
    }));
  };

  const handleSubcategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      subcategoryId: parseInt(e.target.value),
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      imageFile: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("name", formData.productName);
    submissionData.append("category_id", formData.categoryId.toString());
    submissionData.append("status", formData.status);
    submissionData.append("subcategory_id", formData.subcategoryId.toString());
    if (formData.imageFile) {
      submissionData.append("image_url", formData.imageFile);
    }
    if (data?.id) {
      submissionData.append("id", data.id.toString());
    }

    try {
      onSubmit(submissionData);
      toast.success("Product submitted successfully.");
    } catch (error) {
      console.error("Failed to submit:", error);
      toast.error("Failed to submit. Please try again.");
    }
  };

  useEffect(() => {
    return () => {
      if (formData.imageFile) {
        URL.revokeObjectURL(URL.createObjectURL(formData.imageFile));
      }
    };
  }, [formData.imageFile]);

  return (
    <Flex className="flex-col items-start justify-between gap-10 h-[80vh]">
      <form className="grid sm:grid-cols-2 gap-10">
        <h1 className="font-semibold text-xl col-span-2">{title}</h1>

        <Input
          name="productName"
          value={formData.productName}
          onChange={handleInputChange}
          placeholder="Product Name"
        />

        <Select
          title="Category name"
          value={formData.categoryId.toString()}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <Select
          title="Sub Category name"
          value={formData.subcategoryId.toString()}
          onChange={handleSubcategoryChange}
        >
          {filteredSubcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </Select>

        {data && (
          <Select
            title="status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            className="mt-1 w-full border border-gray-300 rounded-md"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </Select>
        )}
        <CustomFileInput
          onFileChange={handleFileChange}
          imageUrl={
            formData.imageFile
              ? URL.createObjectURL(formData.imageFile)
              : data?.image_url
          }
        />
      </form>
      <Flex className="w-full justify-end">
        <button
          type="button"
          onClick={() => setView("list")}
          className="bg-gray-500 text-white rounded-xl px-4 py-2 mr-4"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-primary text-secondary rounded-xl px-4 py-2"
        >
          Save
        </button>
      </Flex>
    </Flex>
  );
};

export default ProductComponent;
