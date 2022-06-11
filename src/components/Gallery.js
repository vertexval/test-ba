import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Header from "../ui/Header";
import GalleryList from "./GalleryList";
import axios from "axios";

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
    let transformedData = [];
    let feedData = new Array(galleryLn).fill(0);
    let filteredData = [];
    const lockedGifs = filterStore.gifs;

    // sorting by import date (descending)
    data.sort((a, b) => {
      let dateA = new Date(a.import_datetime).getTime();
      let dateB = new Date(b.import_datetime).getTime();
      return parseFloat(dateA) < parseFloat(dateB) ? 1 : -1;
    });

    // transform feed
    data.forEach((dataItem) => {
      let item = {
        id: dataItem.id,
        url: dataItem.images["downsized_medium"].url,
      };

      transformedData.push(item);
    });

    // check IF there are locked gifs
    // IF not return standard feed
    if (lockedGifs) {
      // filter duplicate gifs
      filteredData = transformedData.filter((gif) => {
        let isDuplicate = false;

        for (let i = 0; lockedGifs.length > i; i++) {
          if (gif.id === lockedGifs[i].id) {
            isDuplicate = true;
            break;
          }
        }

        return !isDuplicate;
      });

      // assign locked gifs to their indexes
      lockedGifs.forEach((gif) => {
        feedData[gif.index] = gif;
      });

      // assign new gifs to empty indexes
      filteredData.forEach((item) => {
        feedData.some(function (val, index) {
          let isEmpty = val === 0;

          if (isEmpty) {
            feedData[index] = item;
          }

          return isEmpty;
        });
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
