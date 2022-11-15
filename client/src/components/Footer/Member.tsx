import { team } from './Footer';
export interface propTeam {
  memberInfo: team;
}
export default function Member({ memberInfo }: propTeam) {
  const { devRole, name, github } = memberInfo;
  return (
    <div className="text-center mx-4 w-24 inline-block">
      <img
        src={require('../../images/GitHub-Mark-Light-120px-plus.png')}
        alt=""
        className="w-9 mb-1 mx-auto"
      />
      <div className="flex flex-col items-center">
        <a
          className="text-gray-300 hover:text-emerald-400 my-1"
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
