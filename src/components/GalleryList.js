import { useDispatch, useSelector } from "react-redux";

import GalleryItem from "./GalleryItem";

function GalleryList(props) {
  const dispatch = useDispatch();
  const filterStore = useSelector((state) => state.lock);

  let lockArr = filterStore.gifs === null?[]:filterStore.gifs;

  function filterData(arr) {
    dispatch({
      type: "lock",
      payload: {
        gifs: [...arr],
      },
    });
  }

  function addId(el) {
    lockArr = [...lockArr, { id: el.id, url: el.src, index: el.getAttribute("index"), locked: true }];
    sessionStorage.setItem("lockedGifs", JSON.stringify(lockArr));
    filterData(lockArr);
  }

  function removeId(id) {
    const someArr = lockArr.filter((obj) => {
      return obj.id !== id;
    });

    lockArr = [...someArr];
    sessionStorage.setItem("lockedGifs", JSON.stringify(lockArr));
    filterData(lockArr);
  }

  const lockToggleHandler = (el) => {
    const isLocked = el.getAttribute("data-locked") === 'true';

    if (isLocked) {
      const imgEl = el.querySelector('img');
      el.setAttribute("data-locked", false);
      removeId(imgEl.id);
    }
    if (!isLocked) {
      const imgEl = el.querySelector('img');
      el.setAttribute("data-locked", true);
      addId(imgEl);
    }
  };
  
  return (
    <div className="gallery-list"> 
      {props.data.map((item, index) => (
        <GalleryItem onClick={lockToggleHandler} key={item.id} id={item.id} url={item.url} index={index} locked={item.locked}/>
      ))}
    </div>
  );
}

export default GalleryList;
