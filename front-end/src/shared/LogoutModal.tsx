import React from "react";
import Flex from "./Flex";
import { CiWarning } from "react-icons/ci";

interface LogOutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const LogOutModal: React.FC<LogOutModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <Flex className="bg-white p-4 rounded flex-col">
        <h2 className="text-lg font-bold flex items-center gap-2">
          <CiWarning size={24} className="text-red-500" />
          Logout
        </h2>
        <p className="text-gray-400">Are you sure you want to log out?</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white rounded-3xl px-4 py-2 mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-primary text-white rounded-3xl px-4 py-2"
          >
            Logout
          </button>
        </div>
      </Flex>
    </div>
  );
};

export default LogOutModal;
