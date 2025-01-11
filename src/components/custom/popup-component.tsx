import Modal from './modal-component';

type PopupModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const PopupModal: React.FC<PopupModalProps> = ({
  isModalOpen,
  onClose,
  onConfirm,
}) => {

  return (
    <Modal isModalOpen={isModalOpen}>
        <div className="text-center">
          <h2 className="text-5xl font-semibold text-[#545454] mb-4">Are you sure?</h2>
          <p className="text-[#545454] mb-6 text-lg">You are about to sign out.</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={onConfirm} 
              className="bg-[#3085D6] text-white hover:bg-blue-600 px-4 py-2 rounded-lg text-lg focus:outline-none transition-all duration-200"
            >
              Yes, logout!
            </button>
            <button 
              onClick={onClose} 
              className="bg-[#DD3333] text-white hover:bg-red-800 px-4 py-2 rounded-lg text-lg focus:outline-none transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
    </Modal>
  );
};

export default PopupModal;
