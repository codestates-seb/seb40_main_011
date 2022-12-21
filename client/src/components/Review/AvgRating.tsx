import { useEffect, useState, useCallback } from 'react';
import { getSnackStats } from '../../util/apiCollection';
import { AiFillStar } from '../../icons';

const AvgRating = ({ productId }: any) => {
  const [snackReviewStats, setSnackReviewStats] = useState<any>([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [totalAverage, setTotalAverage] = useState<number | undefined>(0);

  const getAverage = useCallback(() => {
    if (snackReviewStats.length === 0) return;
    else {
      const { avgCe, avgDsn, avgPerf, avgQlt, avgStf } = snackReviewStats;
      const result = (avgCe + avgDsn + avgPerf + avgQlt + avgStf) / 5;
      return result;
    }
  }, [snackReviewStats]);

  const getDecial = useCallback((num: number | undefined) => {
    if (num !== undefined) {
      const result = Math.round((num + Number.EPSILON) * 10) / 10;
      return result;
    }
  }, []);

  useEffect(() => {
    const getSnackData = async () => {
      const stats = await getSnackStats(productId);
      await setSnackReviewStats(stats.data);
      await setReviewTotal(stats.data.total);
      await setTotalAverage(getDecial(getAverage()));
    };
    getSnackData();
  }, [getDecial, getAverage]);

  return (
    <div className="flex flex-col md:mt-2 md:flex-row dark:text-gray-300">
      <div className="flex items-center justify-center mt-2 text-2xl">
        <div>
          <AiFillStar className="inline-block h-8 pb-1 mr-2 text-2xl text-yellow-500" />
          <span className="font-bold text-black/80 dark:text-gray-300">
            {totalAverage}
          </span>
        </div>
        <span className="pb-1 mx-2 text-xl font-semibold text-black/30 dark:text-gray-300 ">
          /
        </span>
        <span className="font-bold text-black-80 mr-0.5 pb-1">
          {reviewTotal}
        </span>
        <span className="pb-1 tracking-tight text-black/70 dark:text-gray-300">
          개
        </span>
      </div>
      <div className="flex items-center px-4 pt-2 pb-3 mx-3 mt-2 bg-white text-black/50 rounded-xl dark:bg-DMSubColor dark:text-gray-300">
        <div className="flex flex-col justify-center md:flex-row w-14 md:w-fit">
          <span className="order-2 text-sm md:order-1 md:text-base">
            가성비
          </span>
          <span className="order-1 font-medium md:order-2 md:ml-1 text-black/ dark:text-gray-300">
            {getDecial(snackReviewStats.avgCe)}
          </span>
        </div>
        <span className="hidden mx-1 md:flex">·</span>
        <div className="flex flex-col justify-center md:flex-row w-14 md:w-fit">
          <span className="order-2 text-sm md:order-1 md:text-base">품질</span>
          <span className="order-1 font-medium md:order-2 md:ml-1 text-black/ dark:text-gray-300">
            {getDecial(snackReviewStats.avgQlt)}
          </span>
        </div>
        <span className="hidden mx-1 md:flex">·</span>
        <div className="flex flex-col justify-center md:flex-row w-14 md:w-fit">
          <span className="order-2 text-sm md:order-1 md:text-base">
            만족감
          </span>
          <span className="order-1 font-medium md:order-2 md:ml-1 text-black/ dark:text-gray-300">
            {getDecial(snackReviewStats.avgStf)}
          </span>
        </div>
        <span className="hidden mx-1 md:flex">·</span>
        <div className="flex flex-col justify-center md:flex-row w-14 md:w-fit">
          <span className="order-2 text-sm md:order-1 md:text-base">성능</span>
          <span className="order-1 font-medium md:order-2 md:ml-1 text-black/ dark:text-gray-300">
            {getDecial(snackReviewStats.avgPerf)}
          </span>
        </div>
        <span className="hidden mx-1 md:flex">·</span>
        <div className="flex flex-col justify-center md:flex-row w-14 md:w-fit">
          <span className="order-2 text-sm md:order-1 md:text-base">
            디자인
          </span>
          <span className="order-1 font-medium md:order-2 md:ml-1 text-black/ dark:text-gray-300">
            {getDecial(snackReviewStats.avgDsn)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default AvgRating;
