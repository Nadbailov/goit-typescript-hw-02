import axios from "axios";
import { FetchImage } from "./components/types";

export const fetchImg = async (
  page = 1,
  query: string
): Promise<FetchImage> => {
  const { data } = await axios.get("https://api.unsplash.com/search/photos", {
    params: {
      client_id: 'rXS4NzBAEN_uoT80x4_pXKxpWfshbmOWYC7p4bHc0jk',
      query: query,
      per_page: 12,
      page: page,
    },
  });
  return data;
};