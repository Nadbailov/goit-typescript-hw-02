import s from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { ImageGalleryProps } from "../types";

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onClick }) => {
  return (
    <ul className={s.gallery}>
      {images.map((item) => (
        <li className={s.item} key={item.id}>
          <ImageCard image={item} onClick={() => onClick(item)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
