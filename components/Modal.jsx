import { useDispatch } from "react-redux";
import { closeModal } from "@/actions/modalAction";

export default function Modal() {
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    dispatch(closeModal(true));
  };

  return (
    <div className="fixed inset-0 z-10 h-screen bg-[rgba(0,0,0,0.7)] flex items-center justify-center flex-col">
      <div className="bg-white rounded-[10px] p-8 flex flex-col justify-between-">
        <h1 className="t-[20px] font-mono font-bold text-[18px] text-black text-center">
          Congratulations! <br /> Your campaign has been successfully created.
        </h1>
        <div className="flex flex-row justify-around pt-5">
          <button
            onClick={handleCloseModal}
            className="text-black self-center ring-1 ring-black rounded-[10px] px-3 py-2 mx-3 mt-2 hover:bg-gray-200"
          >
            Close
          </button>
          <button
            onClick={handleCloseModal}
            className="text-black self-center ring-1 ring-black rounded-[10px] px-3 py-2 mx-3 mt-2 hover:bg-gray-200"
          >
            Go to campaign
          </button>
        </div>
      </div>
    </div>
  );
}
