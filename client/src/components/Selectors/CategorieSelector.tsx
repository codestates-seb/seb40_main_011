//대분류 셀렉터
//리뷰 작성 페이지에서 사용
//안지은 작성
import '../common.css';

// interface SelectProps<
//   Option = string,
//   IsMulti extends blooean = false,
//   Group extends GroupBase<Option> = GroupBase<Option>
// > {}

// interface GroupBase<Option> {
//   readonly options: readonly Option[];
//   readonly label?: string;
// }

const CategorieSelector = () => {
  return (
    <div className="select">
      <span className="relative z-10 block p-3 border rounded-md bg-slate-400">
        대분류 선택
      </span>
      <ul>
        <li>All</li>
        <li>Monitor</li>
        <li>Mouse</li>
        <li>Keyboard</li>
        <li>Laptop</li>
        <li>Tablet</li>
        <li>Phone</li>
        <li>etc</li>
      </ul>
    </div>
  );
};

export default CategorieSelector;
