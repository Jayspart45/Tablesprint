import React, { useEffect, useState } from "react";
import Flex from "../../shared/Flex";
import Input from "../../shared/Input";

export type Category = {
  id: number;
  name: string;
  sequence: string;
  image_url: string;
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
  }>({
    categoryName: "",
    sequence: "",
    imageFile: null,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        categoryName: data.name,
        sequence: data.sequence,
        imageFile: null,
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
          placeholder="Sequence"
        />

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

export default CategoryComponent;
