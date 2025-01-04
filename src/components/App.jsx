import toast, { Toaster } from "react-hot-toast";
import SearchBar from "./SearchBar/SearchBar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { fetchImages } from "../api";
import { useState, useEffect } from "react";
import "./App.module.css";
import Loader from "./Loader/Loader";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";

import ImageModal from "./ImageModal/ImageModal";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [chooseImage, setChooseImage] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleSearchSubmit = (query) => {
    if (!query.trim()) {
      toast.error("Необхідно ввести текст для пошуку");
      return;
    }
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setChooseImage(null);
  };

  const handleChangePage = () => {
    setPage((prev) => prev + 1);
  };

  const handleImageClick = (image) => {
    setChooseImage(image);
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (!query) return;

    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const { results, totalPages } = await fetchImages(query, page);

        setImages((prevImages) => (page === 1 ? results : [...prevImages, ...results]));
        setTotalPages(totalPages);
      } catch (error) {
        toast.error("Sorry, no search results. Try again!");
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [page, query]);

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {images.length > 0 && (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />
          {page < totalPages && !isLoading && <LoadMoreBtn changeClick={handleChangePage} />}
        </>
      )}
      {isLoading && <Loader />}
      {isError && <h2>An unexpected error occurred. Please try again.</h2>}
      {chooseImage && (
        <ImageModal modalIsOpen={modalIsOpen} onRequestClose={closeModal} onClose={closeModal} image={chooseImage} />
      )}
    </div>
  );
};

export default App;
