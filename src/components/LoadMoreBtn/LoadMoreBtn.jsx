import s from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ changeClick }) => {
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
