import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Header from "../ui/Header";
import GalleryList from "./GalleryList";
import axios from "axios";

const giphyUrl = "https://api.giphy.com/v1/gifs/trending";
const giphyKey = "ccX6r8CCLeGlyB8VamX40o2XgRIWeSFP";
const galleryLn = 12;

function Gallery() {
  const [feed, setFeed] = useState(null);
  const dispatch = useDispatch();
  const filterStore = useSelector((state) => state.lock);

  useEffect(() => {
    //const gifs = filterStore.gifs;
    //const gifsLn = gifs !== null ? filterStore.gifs.length : 0;

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

    data.forEach((dataItem) => {
      let item = {
        id: dataItem.id,
        url: dataItem.images["downsized_medium"].url,
      };

      transformedData.push(item);
    });

    if (lockedGifs) {
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

      if (lockedGifs !== null) {
        lockedGifs.forEach((gif) => {
          feedData[gif.index] = gif;
        });
      }

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
