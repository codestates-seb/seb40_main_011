//[POST] btn
//props(zustand store)를 받아서 onClcik시 해당 데이터 POST 요청
//Review, SnkReview, Discount 에서 재사용 가능 (어쩌면 코맨트 까지도?)

type ButtonProps = {
  children: React.ReactNode;
};

const AddPost = (props: ButtonProps) => {
  return (
    <button className="mt-5 mb-12 so-button-nomal">{props.children}</button>
  );
};

export default AddPost;
