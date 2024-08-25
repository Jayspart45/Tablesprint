import React, { useState, useEffect } from "react";
import { BiCategory } from "react-icons/bi";
import { CiBoxList } from "react-icons/ci";
import { IoMdArrowDropright } from "react-icons/io";
import { IoCubeOutline, IoHomeOutline } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";

interface SidebarLink {
  title: string;
  link: string;
  icon: JSX.Element;
}

const sidebarLinks: SidebarLink[] = [
  { title: "Dashboard", link: "/admin/dashboard", icon: <IoHomeOutline size={24} /> },
  {
    title: "Category",
    link: "/admin/category",
    icon: <BiCategory size={24} />,
  },
  {
    title: "Subcategory",
    link: "/admin/subcategory",
    icon: <CiBoxList size={24} />,
  },
  {
    title: "Products",
    link: "/admin/products",
    icon: <IoCubeOutline size={24} />,
  },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const currentPath = location.pathname;
    const activeLink = sidebarLinks.find((link) =>
      currentPath.startsWith(link.link)
    );
    if (activeLink) {
      setActive(activeLink.title);
    }
  }, [location.pathname]);

  const handleLink = (link: SidebarLink) => {
    setActive(link.title);
    navigate(link.link);
  };

  return (
    <div className="bg-sidebar min-h-screen max-w-sm py-10 w-full">
      {sidebarLinks.map((link) => (
        <div
          key={link.title}
          className={`flex items-center justify-between px-5 py-4 cursor-pointer ${
            active === link.title ? "bg-gray-200 text-primary" : "text-gray-600"
          }`}
          onClick={() => handleLink(link)}
        >
          {link.icon}
          <span className={`ml-4 ${active === link.title ? "font-bold" : ""}`}>
            {link.title}
          </span>
          <IoMdArrowDropright
            className={`transition-transform duration-300 ${
              active === link.title ? "rotate-90" : ""
            } text-gray-400`}
            size={24}
          />
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
