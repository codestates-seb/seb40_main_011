import { team } from './Footer';
export interface propTeam {
  memberInfo: team;
}
export default function Member({ memberInfo }: propTeam) {
  const { devRole, name, github } = memberInfo;
  return (
    <div className="inline-block w-24 mx-4 text-center">
      <img
        src={require('../../images/GitHub-Mark-Light-120px-plus.png')}
        alt=""
        className="mx-auto mb-1 w-9"
      />
      <div className="flex flex-col items-center">
        <a
          className="my-1 text-gray-300 hover:text-emerald-400"
          href={github}
          target="_blank"
          rel="noreferrer"
        >
          {name}
        </a>
        <div className="text-slate-400 text-xs border-solid border-2 border-slate-600 px-2 rounded-full pb-0.5 mt-1 w-fit">
          {devRole}
        </div>
      </div>
    </div>
  );
}
