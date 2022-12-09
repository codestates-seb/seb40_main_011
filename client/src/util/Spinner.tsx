import { ImSpinner6 } from 'react-icons/im';

const Spinner = () => {
  return (
    <div
      className="bg-zinc-100 h-screen w-screen flex items-center justify-center dark:bg-DMMainColor"
      id="spinner"
    >
      <ImSpinner6 className="animate-spin mb-56" size="70" color="#2962F5" />
    </div>
  );
};

export default Spinner;
