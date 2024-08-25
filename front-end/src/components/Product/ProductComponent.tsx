// import React, { useEffect, useState } from "react";
// import Flex from "../../shared/Flex";
// import Input from "../../shared/Input";
// import Select from "../../shared/Select";
// import { toast } from "react-toastify";
// import { getCategoryData } from "../../api/categoryApi";
// import { getSubCategoryData } from "../../api/subcategoryApi"; // Import the function to get subcategories

// export type Product = {
//   id?: number;
//   name: string;
//   description: string;
//   price: number;
//   categoryId: number;
//   subCategoryId: number;
// };

// interface ProductComponentProps {
//   title: string;
//   data?: Product;
//   onSubmit: (formData: FormData) => void;
//   setView: (view: "list" | "add" | "edit") => void;
// }

// const ProductComponent: React.FC<ProductComponentProps> = ({
//   title,
//   data,
//   onSubmit,
//   setView,
// }) => {
//   const [formData, setFormData] = useState<{
//     name: string;
//     description: string;
//     price: number;
//     categoryId: number;
//     subCategoryId: number;
//   }>({
//     name: "",
//     description: "",
//     price: 0,
//     categoryId: 0,
//     subCategoryId: 0,
//   });
//   const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
//   const [subCategories, setSubCategories] = useState<{ id: number; name: string }[]>([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       const res = await getCategoryData();
//       setCategories(res);
//       if (data) {
//         setFormData((prevData) => ({
//           ...prevData,
//           categoryId: data.categoryId,
//           subCategoryId: data.subCategoryId,
//         }));
//         fetchSubCategories(data.categoryId);
//       }
//     };

//     fetchCategories();
//   }, [data]);

//   const fetchSubCategories = async (categoryId: number) => {
//     const res = await getSubCategoryData(1, 10, "", "id", "ASC", categoryId);
//     setSubCategories(res);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: name === "price" ? parseFloat(value) : value,
//     }));
//   };

//   const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const categoryId = parseInt(e.target.value);
//     setFormData((prevData) => ({
//       ...prevData,
//       categoryId,
//     }));
//     fetchSubCategories(categoryId);
//   };

//   const handleSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       subCategoryId: parseInt(e.target.value),
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const submissionData = new FormData();
//     submissionData.append("name", formData.name);
//     submissionData.append("description", formData.description);
//     submissionData.append("price", formData.price.toString());
//     submissionData.append("category_id", formData.categoryId.toString());
//     submissionData.append("sub_category_id", formData.subCategoryId.toString());

//     try {
//       await onSubmit(submissionData);
//       toast.success("Product submitted successfully.");
//     } catch (error) {
//       console.error("Failed to submit:", error);
//       toast.error("Failed to submit. Please try again.");
//     }
//   };

//   return (
//     <Flex className="flex-col items-start justify-between gap-10 h-[80vh]">
//       <form className="grid sm:grid-cols-2 gap-10" onSubmit={handleSubmit}>
//         <h1 className="font-semibold text-xl col-span-2">{title}</h1>

//         <Input
//           name="name"
//           value={formData.name}
//           onChange={handleInputChange}
//           placeholder="Product Name"
//         />
//         <Input
//           name="description"
//           value={formData.description}
//           onChange={handleInputChange}
//           placeholder="Description"
//         />
//         <Input
//           name="price"
//           type="number"
//           value={formData.price}
//           onChange={handleInputChange}
//           placeholder="Price"
//         />

//         <Select
//           value={formData.categoryId.toString()}
//           onChange={handleCategoryChange}
//         >
//           {categories.map((category) => (
//             <option key={category.id} value={category.id}>
//               {category.name}
//             </option>
//           ))}
//         </Select>

//         <Select
//           value={formData.subCategoryId.toString()}
//           onChange={handleSubCategoryChange}
//         >
//           {subCategories.map((subCategory) => (
//             <option key={subCategory.id} value={subCategory.id}>
//               {subCategory.name}
//             </option>
//           ))}
//         </Select>

//         <Flex className="w-full justify-end">
//           <button
//             type="button"
//             onClick={() => setView("list")}
//             className="bg-gray-500 text-white rounded-xl px-4 py-2 mr-4"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="bg-primary text-secondary rounded-xl px-4 py-2"
//           >
//             Save
//           </button>
//         </Flex>
//       </form>
//     </Flex>
//   );
// };

// export default ProductComponent;
