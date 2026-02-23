type ConfirmModalProps = {
  title: string;
  message: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  title,
  message,
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>

        <p className="text-sm text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 rounded-md border">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-600 text-white"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
