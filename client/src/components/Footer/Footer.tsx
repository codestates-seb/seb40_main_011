import Member from './Member';
export interface team {
  devRole: string;
  name: string;
  github: string;
}

function Banner() {
  return (
    <a
      className="mx-auto flex flex-col mb-8 w-fit m-4"
      href="https://github.com/codestates-seb/seb40_main_011"
      target="_blank"
      rel="noreferrer"
    >
      <span className="text-center text-emerald-400">Team GitHub</span>
      <span className="text-center text-slate-500 text-xl">
        Codestates Front-End & Back-End Bootcamp 40th
      </span>
      <div className="text-center max-sm:hidden">
        <span className="text-center text-gray-300 text-2xl">Main-Project</span>
        <span className="border-l-gray-500 border-l border-solid mx-4 text-xs"></span>
        <span className="text-center text-gray-300 text-2xl">
          seb40_main_011
        </span>
        <span className="border-l-gray-500 border-l border-solid mx-4 text-xs"></span>
        <span className="text-center text-gray-300 text-2xl">Core i7</span>
      </div>
    </a>
  );
}

export default function Footer() {
  const teamMember: team[] = [
    {
      devRole: 'Front-End',
      name: '정준일',
      github: 'https://github.com/EthanJcoding',
    },
    {
      devRole: 'Front-End',
      name: '김광민',
      github: 'https://github.com/kwngmin',
    },
    {
      devRole: 'Front-End',
      name: '안지은',
      github: 'https://github.com/Heera1',
    },
    {
      devRole: 'Front-End',
      name: '신병규',
      github: 'https://github.com/byeonggyu-shin',
    },
    {
      devRole: 'Back-End',
      name: '김창일',
      github: 'https://github.com/INewWorldI',
    },
    {
      devRole: 'Back-End',
      name: '이혜광',
      github: 'https://github.com/hea0408never',
    },
    {
      devRole: 'Back-End',
      name: '조성호',
      github: 'https://github.com/toneofrain',
    },
  ];
  return (
    <div className="bg-slate-900 dark:bg-black px-10 pt-10 pb-32">
      <Banner />
      <div className="text-center">
        {teamMember.map((member, index) => {
          return <Member key={index} memberInfo={member} />;
        })}
      </div>
    </div>
  );
}
