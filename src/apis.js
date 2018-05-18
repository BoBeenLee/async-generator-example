import axios from "axios";

const API_KEY = "142fedf848c3f6a6e3bcadafdc1608ed";

const flickrSearchByTag = async (tag, page) => {
  const apiKey = API_KEY;

  const response = await axios.get(
    "https://api.flickr.com/services/rest/" +
      "?method=flickr.photos.search" +
      "&api_key=" +
      apiKey +
      "&page=" +
      page +
      "&tags=" +
      tag +
      "&format=json" +
      "&nojsoncallback=1"
  );
  return response.data;
};

export { flickrSearchByTag };
