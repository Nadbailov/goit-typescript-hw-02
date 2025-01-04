import s from "./LoadMoreBtn.module.css";
import { LoadMoreBtnProps } from "../types";

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ changeClick }) => {
  function handleClick() {
    changeClick();
  }

  return (
    <div>
      <button className={s.loadMoreButton} type="button" onClick={handleClick}>
        Load More
      </button>
    </div>
  );
};

export default LoadMoreBtn;
