import lockIcon from "../img/lock-solid.svg";
import unlockIcon from "../img/unlock-solid.svg";

function GalleryItem(props) {
  function lockHandler(e) {
    const el = e.target;
    props.onClick(el);
  }

  function imageLoadHandler(e) {
    const el = e.target;
    el.parentElement.style.opacity = 1;
  }

  return (
    <div className="gallery-item" onClick={lockHandler} data-locked={props.locked ? true : false}>
      <img src={props.url} id={props.id} alt="" index={props.index} onLoad={imageLoadHandler} />
      <div className="image-lock">
        <div className="label-lock">
          <img src={lockIcon} className="lock-icon" alt="" />
          <span> Click to lock</span>
        </div>
        <div className="label-unlock">
          <img src={unlockIcon} className="lock-icon" alt="" />
          <span> Click to unlock</span>
        </div>
      </div>
    </div>
  );
}

export default GalleryItem;
