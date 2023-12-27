/* eslint-disable react/prop-types */
const ConfirmDeleteModal = ({ onCancel, onConfirm }) => {
  return (
    <div
      className="fixed flex top-0 left-0 w-full h-full justify-center items-center bg-opacity-20 bg-slate-500"
      onClick={onCancel}
    >
      <div
        className="bg-white text-center p-5 border-1 border-black"
        onClick={(e) => e.stopPropagation()}
      >
        <p>Are you sure you want to delete this Section?</p>
        <div className="mt-8 flex gap-x-10 justify-center">
          <button onClick={onCancel} type="button">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-black text-white font-bold px-2 py-1"
            type="button"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
