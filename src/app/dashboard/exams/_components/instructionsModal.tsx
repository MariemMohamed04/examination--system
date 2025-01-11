import Modal from "@/components/custom/modal-component";
import React from "react";

type InstructionsModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onOpenModel: () => void;
};

const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isModalOpen,
  onClose,
  onOpenModel,
}) => {
  return (
    <>
    {
      
    }
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      <div className="mb-12">
        <ul className="list-disc list-inside text-[#535353] text-xl font-medium">
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
          <li>Lorem ipsum dolor sit amet consectetur.</li>
        </ul>
      </div>
      <div className="">
        <button
          type="button"
          onClick={onOpenModel}
          className="bg-[#4461F2] w-[600px] h-[48px] rounded-[100px] text-white"
        >
          Start
        </button>
      </div>
    </Modal>
    </>
  );
};

export default InstructionsModal;
