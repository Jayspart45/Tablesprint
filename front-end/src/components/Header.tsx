import { FaRegUserCircle } from "react-icons/fa";
import Flex from "../shared/Flex";

interface HeaderProps {
  onOpenModal: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <Flex className="fixed top-0 left-0 right-0 flex justify-end items-center px-5 py-4 z-30 bg-primary text-secondary">
      <button
        onClick={onOpenModal}
        className="text-white rounded px-4 py-2"
        aria-label="Open user menu"
      >
        <FaRegUserCircle size={24} />
      </button>
    </Flex>
  );
};

export default Header;
