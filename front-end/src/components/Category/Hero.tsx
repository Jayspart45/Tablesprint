import { DataTable } from "../../shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaSort } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Category } from "./CategoryComponent";
import ConfirmModal from "../../shared/ConfirmModal";
import { useState } from "react";
import { BiCategory } from "react-icons/bi";

interface HeroProps {
  data: Category[];
  setView: (view: "list" | "add" | "edit") => void;
  handleEdit: (category: Category) => void;
  handleDelete: (category: Category) => void;
}

const Hero: React.FC<HeroProps> = ({
  data,
  setView,
  handleEdit,
  handleDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<Category | null>(null);
  const columns: ColumnDef<Category>[] = [
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
          Category Name
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
      accessorKey: "sequence",
      header: ({ column }) => (
        <button
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sequence
          <FaSort />
        </button>
      ),
      enableSorting: true,
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
          {row.original.status == "active"?"Active":"InActive"}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex">
          <button onClick={() => handleEdit(row.original)}>
            <FaEdit className="text-gray-500" size={22} />
          </button>
          <button
            onClick={() => {
              setItemToDelete(row.original);
              setIsModalOpen(true);
            }}
          >
            <MdOutlineDeleteOutline className="text-gray-500" size={24} />
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
      img={<BiCategory size={24} />}
        title={"Category"}
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

export default Hero;
