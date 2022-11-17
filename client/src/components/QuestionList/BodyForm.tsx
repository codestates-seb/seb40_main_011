import TextareaAutosize from 'react-textarea-autosize';
import { FiSend } from 'react-icons/fi';

export default function BodyForm() {
  return (
    <form
      action=""
      className="flex flex-row items-center hover:bg-slate-50 peer-invalid:bg-slate-50"
    >
      <TextareaAutosize
        placeholder="댓글 달기..."
        className="peer w-full resize-none pl-6 mt-2 mb-3 outline-none font-medium bg-transparent"
      />
      <button className="w-12 flex-none flex justify-center items-center">
        <FiSend className="text-3xl text-gray-400 hover:text-blue-500 mr-2 hover:text-blue-500  hover:bg-blue-100 p-1 rounded-lg w-10 h-8 pr-1.5" />
      </button>
    </form>
  );
}
