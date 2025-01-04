
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImg } from "../api";
import { useState, useEffect } from "react";
import "./App.module.css";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import { Image } from "./types";

import ImageModal from "./ImageModal/ImageModal";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [selectImage, setSelectImage] = useState<Image | null>(null);
  const [totalImg, setTotalImg] = useState<number>(0);

  useEffect(() => {
    if (!query) {
      return;
    }

    const getImage = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchImg(page, query);
        setImages((prev) => [...prev, ...data.results]);
        setTotalImg(data.total);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getImage();
  }, [page, query]);

  const handleChangePage = (): void => {
    setPage((prev) => prev + 1);
  };

  const handleImgSearch = (searchValue: string): void => {
    setQuery(searchValue);
    setImages([]);
    setPage(1);
    setTotalImg(0);
  };

  const handleImageClick = (image: Image): void => {
      setSelectImage(image);
      setOpenModal(true);
  };

  const closeModal = (): void => {
    setOpenModal(false);
    setSelectImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleImgSearch} />
      <div>
        {error}
        {!loading && images.length === 0 && query && (
          <p>An unexpected error occurred. Please try again.</p>
        )}
        {images.length > 0 && (
          <ImageGallery onClick={handleImageClick} images={images} />
        )}
        {loading && <Loader />}
        {images.length > 0 && images.length < totalImg && !loading && (
          <LoadMoreBtn changeClick={handleChangePage} />
        )}
        {openModal && selectImage && (
          <ImageModal
            isOpen={openModal}
            image={selectImage}
            onRequestClose={closeModal}
          />
        )}
      </div>
    </div>
  );
}

export default App;
