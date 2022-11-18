export default function HeaderTextButton({ name }: { name: string }) {
  return (
    <>
      <button className="h-full w-28 font-medium text-lg hover:bg-slate-100 hover:border-b-4 hover:border-slate-500 box-content">
        {name}
      </button>
    </>
  );
}
