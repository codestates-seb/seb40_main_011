export default function Option({ id }: { id: string }) {
  return (
    <li>
      <button className="w-full px-4 text-sm pb-3 pt-2 hover:bg-gray-100 flex items-center text-gray-500 hover:text-gray-900 font-medium">
        {id}
      </button>
    </li>
  );
}
