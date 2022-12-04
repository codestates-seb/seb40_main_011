import Member from './Member';
export interface team {
  devRole: string;
  name: string;
  github: string;
}

function Banner() {
  return (
    <a
      className="flex flex-col m-4 mx-auto mb-8 w-fit"
      href="https://github.com/codestates-seb/seb40_main_011"
      target="_blank"
      rel="noreferrer"
    >
      <span className="text-center text-emerald-400">Team GitHub</span>
      <span className="text-xl text-center text-slate-500">
        Codestates Front-End & Back-End Bootcamp 40th
      </span>
      <div className="text-center max-sm:hidden">
        <span className="text-2xl text-center text-gray-300">Main-Project</span>
        <span className="mx-4 text-xs border-l border-solid border-l-gray-500"></span>
        <span className="text-2xl text-center text-gray-300">
          seb40_main_011
        </span>
        <span className="mx-4 text-xs border-l border-solid border-l-gray-500"></span>
        <span className="text-2xl text-center text-gray-300">Core i7</span>
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
    <div className="px-10 pt-10 pb-32 bg-slate-900 dark:bg-black">
      <Banner />
      <div className="text-center">
        {teamMember.map((member, index) => {
          return <Member key={index} memberInfo={member} />;
        })}
      </div>

      <div className="pt-20 text-right text-slate-200">
        Copyright 2022. codeTech inc. all rights reserved.
      </div>
    </div>
  );
}
