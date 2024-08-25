import { DataTable } from "../../shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaSort } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { SubCategory } from "./SubCategoryComponent";
import ConfirmModal from "../../shared/ConfirmModal";
import { useState } from "react";

interface HeroProps {
  data: SubCategory[];
  setView: (view: "list" | "add" | "edit") => void;
  handleEdit: (subcategory: SubCategory) => void;
  handleDelete: (subcategory: SubCategory) => void;
}

const Hero: React.FC<HeroProps> = ({
  data,
  setView,
  handleEdit,
  handleDelete,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<SubCategory | null>(null);
  const columns: ColumnDef<SubCategory>[] = [
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
          SubCategory Name
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
      accessorKey: "image_url",
      header: "Image",
      cell: ({ getValue }) => (
        <img
          src={getValue() as string}
          alt="SubCategory"
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
            <FaEdit size={24} />
          </button>
          <button
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
        title={"Sub Category"}
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
