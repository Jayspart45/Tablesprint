import React, { useState } from "react";
import { DataTable } from "../../shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaSort } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import type { Product } from "./ProductComponent";
import ConfirmModal from "../../shared/ConfirmModal";
import { IoCubeOutline } from "react-icons/io5";

interface ProductProps {
  data: Product[];
  setView: (view: "list" | "add" | "edit") => void;
  handleEdit: (product: Product) => void;
  handleDelete: (product: Product) => void;
}

const Product: React.FC<ProductProps> = ({
  data,
  setView,
  handleEdit,
  handleDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Product | null>(null);
  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: ({ column }) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Id
          <FaSort />
        </button>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <FaSort />
        </button>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "Category.name",
      header: ({ column }) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <FaSort />
        </button>
      ),
      enableSorting: true,
    },
    {
      accessorKey: "Subcategory.name",
      header: ({ column }) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SubCategory
          <FaSort />
        </button>
      ),
      enableSorting: true,
    },

    {
      accessorKey: "image_url",
      header: "Image",
      cell: ({ getValue }) => (
        <img
          src={getValue() as string}
          alt="Category"
          style={{ width: "50px", height: "auto" }}
        />
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <FaSort />
        </button>
      ),
      cell: ({ row }) => (
        <span
          className={`${
            row.original.status == "active" ? "text-green-500" : "text-red-500"
          }`}
        >
          {row.original.status == "active" ? "Active" : "InActive"}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex">
          <button
            className="text-gray-500"
            onClick={() => handleEdit(row.original)}
          >
            <FaEdit size={24} />
          </button>
          <button
            className="text-gray-500"
            onClick={() => {
              setItemToDelete(row.original);
              setIsModalOpen(true);
            }}
          >
            <MdOutlineDeleteOutline size={24} />
          </button>
        </div>
      ),
      enableSorting: false,
    },
  ];
  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      handleDelete(itemToDelete);
      setIsModalOpen(false);
      setItemToDelete(null);
    }
  };
  return (
    <div>
      <DataTable
        img={<IoCubeOutline size={24} />}
        title={"Product"}
        data={data}
        columns={columns}
        setView={setView}
      />
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        itemName={itemToDelete ? itemToDelete.name : ""}
      />
    </div>
  );
};

export default Product;
