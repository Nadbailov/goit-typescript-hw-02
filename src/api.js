import axios from "axios";

const ACCESS_KEY = 'rXS4NzBAEN_uoT80x4_pXKxpWfshbmOWYC7p4bHc0jk'; 
const BASE_URL = 'https://api.unsplash.com';


export const fetchImages = async (query, page) => {
  
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
            query,
            page,  
            per_page: 12, 
            client_id: ACCESS_KEY,
      },
    }
    );

   return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
  };