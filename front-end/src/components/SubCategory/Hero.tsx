import { DataTable } from "../../shared/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { FaEdit, FaSort } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { SubCategory } from "./SubCategoryComponent";

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
      enableSorting: true,
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
      <DataTable title={"Sub Category"} data={data} columns={columns} setView={setView} />
    </div>
  );
};

export default Hero;
