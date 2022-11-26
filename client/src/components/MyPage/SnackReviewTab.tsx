import { useEffect, useState } from 'react';

interface ReviewType {
  id: number;
  score: ScoreType;
  content: string;
  type: string;
  createdAt: string;
  modifiedAt: string;
  productId: number;
  productName: string;
}

interface ScoreType {
  costEfficiency: number;
  quality: number;
  satisfaction: number;
  design: number;
  performance: number;
  grade: number;
}

const SnackReviewTab = ({ reviewListData }: ReviewType | undefined | any) => {
  return (
    <>
      {!reviewListData ? (
        <div className="flex flex-col justify-center w-[850px] p-5 mt-20">
          <div className="mb-2 text-xl text-center">
            작성한 한줄 리뷰가 없습니다
          </div>
        </div>
      ) : (
        <>
          {reviewListData?.map((el: ReviewType, index: number) => {
            return (
              <>
                <div
                  className="flex flex-col justify-center w-[850px] p-5"
                  key={index}
                >
                  <div className="mb-2 overflow-hidden text-ellipsis line-clamp-2">
                    {el.content}
                  </div>
                  <div className="flex text-sm">
                    <div className="px-3 py-0.5 bg-slate-300 rounded-lg">
                      {el.type}
                    </div>
                    <div className="px-3 py-0.5">{el.productName}</div>
                    <div className="ml-auto text-slate-600">
                      {new Date(el.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: 'numeric',
                        minute: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default SnackReviewTab;
