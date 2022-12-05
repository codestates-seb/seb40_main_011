// Review List fetching & boxing comp
import { useEffect, useState } from 'react';
import { getSnackStats } from '../../util/apiCollection';
import { AiFillStar } from '../../icons';

const AvgRating = ({ productId }: any) => {
  const [snackReviewStats, setSnackReviewStats] = useState<any>([]);
  const [reviewTotal, setReviewTotal] = useState(0);
  const [totalAverage, setTotalAverage] = useState<number | undefined>(0);

  useEffect(() => {
    const getSnackData = async () => {
      const stats = await getSnackStats(productId);
      await setSnackReviewStats(stats.data);
      await setReviewTotal(stats.data.total);
      await setTotalAverage(getDecial(getAverage()));
    };
    getSnackData();
  }, [totalAverage]);

  const getAverage = () => {
    if (snackReviewStats.length === 0) return;
    else {
      const { avgCe, avgDsn, avgPerf, avgQlt, avgStf } = snackReviewStats;
      const result = (avgCe + avgDsn + avgPerf + avgQlt + avgStf) / 5;
      return result;
    }
  };

  const getDecial = (num: number | undefined) => {
    if (num !== undefined) {
      const result = Math.round((num + Number.EPSILON) * 10) / 10;
      return result;
    }
  };

  return (
    <div className="flex flex-col md:flex-row mt-1">
      <div className="flex justify-center items-center text-2xl mt-2">
        <div>
          <AiFillStar className="inline-block text-2xl pb-1 h-8 mr-2 text-yellow-500" />
          <span className="text-black/80 font-bold">{totalAverage}</span>
        </div>
        <span className="mx-2 text-black/30 pb-1 text-xl">/</span>
        <span className="font-bold text-black-80 mr-0.5 pb-1">
          {reviewTotal}
        </span>
        <span className="text-black/70 tracking-tight pb-1">개</span>
      </div>
      <div className="text-black/50 mx-3 bg-white flex items-center px-4 rounded-xl pt-2 pb-3 mt-2">
        <div className="flex flex-col md:flex-row justify-center">
          <span className="order-2 md:order-1">가성비</span>
          <span className="order-1 md:order-2 md:ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgCe)}
          </span>
        </div>
        <span className="mx-1">·</span>
        <div className="flex flex-col md:flex-row justify-center mx-2 md:mx-0">
          <span className="order-2 md:order-1 text-sm md:text-base">품질</span>
          <span className="order-1 md:order-2 md:ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgQlt)}
          </span>
        </div>
        <span className="mx-1">·</span>
        <div className="flex flex-col md:flex-row justify-center mx-2 md:mx-0">
          <span className="order-2 md:order-1 text-sm md:text-base">
            만족감
          </span>
          <span className="order-1 md:order-2 md:ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgStf)}
          </span>
        </div>
        <span className="mx-1">·</span>
        <div className="flex flex-col md:flex-row justify-center mx-2 md:mx-0">
          <span className="order-2 md:order-1 text-sm md:text-base">성능</span>
          <span className="order-1 md:order-2 md:ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgPerf)}
          </span>
        </div>
        <span className="mx-1">·</span>
        <div className="flex flex-col md:flex-row justify-center mx-2 md:mx-0">
          <span className="order-2 md:order-1 text-sm md:text-base">
            디자인
          </span>
          <span className="order-1 md:order-2 md:ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgDsn)}
          </span>
        </div>
      </div>
    </div>
  );
};
export default AvgRating;
