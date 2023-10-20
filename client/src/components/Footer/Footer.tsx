import Member from './Member';
export interface team {
  devRole: string;
  name: string;
  github: string;
}

function Banner() {
  return (
    <a
      className="flex flex-col mx-auto mb-8 w-fit"
      href="https://github.com/codestates-seb/seb40_main_011"
      target="_blank"
      rel="noreferrer"
    >
      <span className="text-center text-emerald-400">Team GitHub</span>
      <span className="text-xl text-center text-slate-500 break-keep">
        Codestates Front-End & Back-End Bootcamp 40th
      </span>
      <div className="flex flex-col mt-2 text-center md:flex-row">
        <span className="text-2xl leading-8 text-center text-gray-300">
          Main-Project
        </span>
        <span className="mx-4 text-xs border-l border-solid border-l-gray-500"></span>
        <span className="text-2xl leading-8 text-center text-gray-300">
          seb40_main_011
        </span>
        <span className="mx-4 text-xs border-l border-solid border-l-gray-500"></span>
        <span className="text-2xl leading-8 text-center text-gray-300">
          Core i7
        </span>
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
      github: 'https://github.com/laterre39',
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
    <div className="px-6 pt-10 pb-10 bg-slate-900">
      <Banner />
      <div className="text-center">
        {teamMember.map((member, index) => {
          return <Member key={index} memberInfo={member} />;
        })}
      </div>

      <div className="py-8 text-center text-white/50">
        Copyright 2022. codeTech inc. all rights reserved.
      </div>
    </div>
  );
}
