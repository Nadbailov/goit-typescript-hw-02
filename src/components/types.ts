export interface Image {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
}

export interface FetchImage {
  results: Image[];
  total: number;
}

export interface ImageCardProps {
  image: Image;
  onClick: () => void;
}

export interface ImageGalleryProps {
  images: Image[];
  onClick: (image: Image) => void;
}

export interface ImageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  image?: Image | null;
}

export interface LoadMoreBtnProps {
  changeClick: () => void;
}

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}