import s from "./ImageCard.module.css";
import { ImageCardProps } from "../types";

const ImageCard: React.FC<ImageCardProps> = ({ image, onClick }) => {
  return (
    <div className={s.card}>
      <img
        className={s.img}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={onClick}
      />
    </div>
  );
};

export default ImageCard;
