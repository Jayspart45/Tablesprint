import React, { useEffect, useState } from "react";
import Flex from "../../shared/Flex";
import Input from "../../shared/Input";
import CustomFileInput from "../../shared/CustomFileInput";
import Select from "../../shared/Select";

export type Category = {
  id: number;
  name: string;
  sequence: string;
  image_url: string;
  status: string;
};

interface CategoryComponentProps {
  title: string;
  data?: Category;
  onSubmit: (formData: FormData) => void;
  setView: (view: "list" | "add" | "edit") => void;
}

const CategoryComponent: React.FC<CategoryComponentProps> = ({
  title,
  data,
  onSubmit,
  setView,
}) => {
  const [formData, setFormData] = useState<{
    categoryName: string;
    sequence: string;
    imageFile: File | null;
    status: string;
  }>({
    categoryName: "",
    sequence: "",
    imageFile: null,
    status: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        categoryName: data.name,
        sequence: data.sequence,
        imageFile: null,
        status: data.status,
      });
    }
  }, [data]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (file: File | null) => {
    setFormData((prevData) => ({
      ...prevData,
      imageFile: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = new FormData();
    submissionData.append("name", formData.categoryName);
    submissionData.append("sequence", formData.sequence);
    if (formData.imageFile) {
      submissionData.append("image_url", formData.imageFile);
    }
    if (data?.id) {
      submissionData.append("id", data.id.toString());
    }
    submissionData.append("status", formData.status);

    onSubmit(submissionData);
  };

  return (
    <Flex className="flex-col items-start justify-between gap-10 h-[80vh]">
      <form className="grid sm:grid-cols-2 gap-10">
        <h1 className="font-semibold text-xl col-span-2">{title}</h1>

        <Input
          name="categoryName"
          value={formData.categoryName}
          onChange={handleInputChange}
          placeholder="Category Name"
        />
        <Input
          name="sequence"
          type="number"
          value={formData.sequence}
          onChange={handleInputChange}
          placeholder="Category Sequence"
        />

        {formData.status && (
            <Select
              title="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="block mt-1 w-full border border-gray-300 rounded-md"
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
          className="bg-primary text-secondary rounded-xl px-4 py-2"
        >
          Save
        </button>
      </Flex>
    </Flex>
  );
};

export default CategoryComponent;
