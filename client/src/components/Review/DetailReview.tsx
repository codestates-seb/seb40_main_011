// [GET]
import { useEffect, useState } from 'react';
import { DetailReviewProps } from '../../types/mainPageTypes';

const DetailReview = ({ productId }: DetailReviewProps) => {
  return (
    <div className="flex mb-3">
      <img src="" alt="" className="w-[300px] h-[250px] mr-3" />
      <div className="flex flex-col overflow-hidden text-left w-[760px]">
        <div className="mb-1 text-2xl">리뷰제목</div>
        <div className="pb-1 overflow-hidden text-xl text-justify whitespace-normal h-36 text-ellipsis line-clamp-5">
          At vero eos et accusamus et iusto odio dignissimos ducimus qui
          blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
          et quas molestias excepturi sint occaecati cupiditate non provident,
          similique sunt in culpa qui officia deserunt mollitia animi, id est
          laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita
          distinctio. Nam libero tempore, cum soluta nobis est eligendi optio
          cumque nihil impedit quo minus id quod maxime placeat facere possimus,
          omnis voluptas assumenda est, omnis dolor repellendus. Temporibus
          autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe
          eveniet ut et voluptates repudiandae sint et molestiae non recusandae.
          Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis
          voluptatibus maiores alias consequatur aut perferendis doloribus
          asperiores repellat
        </div>

        <div className="flex flex-row items-center  mt-2.5 w-full">
          <div>Likes</div>
          <div>Comment</div>
          <div className="flex flex-row items-center ml-auto">
            <div>username</div>
            <div>date</div>
            <img
              src=""
              alt=""
              className="w-16 h-16 rounded-full bg-slate-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailReview;
