import React, { useEffect, useState } from "react";
import Flex from "../../shared/Flex";
import Input from "../../shared/Input";
import Select from "../../shared/Select";
import { toast } from "react-toastify";

export type Product = {
  id: number;
  name: string;
  image_url: string;
  categoryId: number;
  subcategoryId: number;
  status?: string; 
  Category?: { id: number; name: string };
  SubCategory?: { id: number; name: string };
};

interface ProductComponentProps {
  title: string;
  data?: Product;
  onSubmit: (formData: FormData) => void;
  setView: (view: "list" | "add" | "edit") => void;
  categories: { id: number; name: string }[]; 
  subcategories: { id: number; name: string }[]; 
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
    subcategoryId: number;
  }>({
    productName: "",
    imageFile: null,
    categoryId: categories.length > 0 ? categories[0].id : 0, 
    subcategoryId: subcategories.length > 0 ? subcategories[0].id : 0, 
  });

  useEffect(() => {
    if (data) {
      setFormData({
        productName: data.name,
        imageFile: null,
        categoryId: data.Category?.id || categories[0].id,
        subcategoryId: data.SubCategory?.id || subcategories[0].id,
      });
    }
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: files[0],
      }));
    }
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("name", formData.productName);
    submissionData.append("category_id", formData.categoryId.toString());
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
          value={formData.subcategoryId.toString()}
          onChange={handleSubcategoryChange}
        >
          {subcategories.map((subcategory) => (
            <option key={subcategory.id} value={subcategory.id}>
              {subcategory.name}
            </option>
          ))}
        </Select>

        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {data?.image_url && (
          <img
            src={data.image_url}
            alt="Preview"
            className="mt-2 w-32 h-32 object-cover"
          />
        )}
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
