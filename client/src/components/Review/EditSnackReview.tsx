import { useEffect } from 'react';

const EditSnackReview = ({ review, editedReview, setEditedReview }: any) => {
  useEffect(() => {
    setEditedReview(review.content);
  }, []);

  const handleContentChange = (e: any) => {
    setEditedReview(e.target.value);
  };

  return (
    <input
      autoFocus
      value={editedReview}
      onChange={handleContentChange}
      className="text-justify h-[110px] border-t-2 pt-2 w-full"
    ></input>
  );
};

export default EditSnackReview;
