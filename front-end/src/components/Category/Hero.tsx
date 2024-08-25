import { DataTable } from "../../shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaSort } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Category } from "./CategoryComponent";

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
      enableSorting: true, // Explicitly enabling sorting
    },
    {
      id: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex">
          <button onClick={() => handleEdit(row.original)}>
            <FaEdit size={24} />
          </button>
          <button onClick={() => handleDelete(row.original)}>
            <MdOutlineDeleteOutline size={24} />
          </button>
        </div>
      ),
      enableSorting: false, 
    },
  ];

  return (
    <div>
      <DataTable data={data} columns={columns} setView={setView} />
    </div>
  );
};

export default Hero;
