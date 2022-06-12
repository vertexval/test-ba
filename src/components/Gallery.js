import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "../ui/Header";
import GalleryList from "./GalleryList";
import axios from "axios";
import isMobile from "is-mobile";

const giphyUrl = process.env.REACT_APP_GIPHYURL;
const giphyKey = process.env.REACT_APP_APIKEY;
const galleryLn = parseInt(process.env.REACT_APP_GALLERYLN);

function Gallery() {
  const [feed, setFeed] = useState(null);
  const filterStore = useSelector((state) => state.lock);

  useEffect(() => {
    axios(giphyUrl, {
      params: {
        api_key: giphyKey,
        limit: galleryLn,
        offset: galleryLn * filterStore.counter,
      },
    }).then((response) => {
      const data = response.data.data;
      const newFeed = transformFeed(data);
      setFeed(newFeed);
    });
  }, [filterStore.counter]);

  function transformFeed(data) {
    const lockedGifs = filterStore.gifs;
    let feedData = new Array(galleryLn).fill(0);
    let transformedData = [];
    let filteredData = [];
 
    // sorting (descending)
    data.sort((a, b) => {
      const dateA = new Date(a.import_datetime).getTime();
      const dateB = new Date(b.import_datetime).getTime();
      return parseFloat(dateA) < parseFloat(dateB) ? 1 : -1;
    });

    transformedData = data.map((dataItem) => {
      const gifUrl = isMobile() ? dataItem.images["downsized"].url : dataItem.images["downsized_medium"].url;
      const item = {
        id: dataItem.id,
        url: gifUrl,
      };

      return item;
    });

    if (lockedGifs) {
      lockedGifs.forEach((gif) => {
        feedData[gif.index] = gif;
      });

      filteredData = transformedData.filter((gif) => {
        return !lockedGifs.some(item => item.id === gif.id);
      });

      feedData.forEach(function (val, index) {
        if (val === 0) {
          feedData[index] = filteredData.shift();
        }
      });

      return feedData;
    } else {
      return transformedData;
    }
  }

  return (
    <>
      {feed && (
        <div id="gallery">
          <Header />
          <div className="gallery-container">
            <GalleryList data={feed} />
          </div>
        </div>
      )}
    </>
  );
}

export default Gallery;
