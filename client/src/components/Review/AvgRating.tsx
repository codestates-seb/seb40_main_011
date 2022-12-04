// Review List fetching & boxing comp
import { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating';
import { SnackReviewAvg } from '../../types/mainPageTypes';
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
    <div>
      <div className="flex justify-center items-center text-2xl h-10 mb-8 md:mb-0 mt-2">
        <AiFillStar className="inline-block text-3xl pt-0.5 mr-1" />
        <span className="text-black/80 font-bold">{totalAverage}</span>
        <span className="mx-1 text-black/50">·</span>
        <span className="font-bold text-black-80 mr-0.5">{reviewTotal}</span>
        <span className="text-black/70 tracking-tight">개</span>
      </div>
      <div className="text-black/50 mt-2">
        <span>
          가성비
          <span className="ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgCe)}
          </span>
        </span>
        <span className="mx-1">·</span>
        <span>
          품질
          <span className="ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgQlt)}
          </span>
        </span>
        <span className="mx-1">·</span>
        <span>
          만족감
          <span className="ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgStf)}
          </span>
        </span>
        <span className="mx-1">·</span>
        <span>
          성능
          <span className="ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgPerf)}
          </span>
        </span>
        <span className="mx-1">·</span>
        <span>
          디자인
          <span className="ml-1 font-medium text-black/60">
            {getDecial(snackReviewStats.avgDsn)}
          </span>
        </span>
      </div>
    </div>
  );
};
export default AvgRating;
