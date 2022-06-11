import { useDispatch, useSelector } from "react-redux";
import Gallery from "./components/Gallery";

function App() {
  const dispatch = useDispatch();

  if (sessionStorage.lockedGifs) {
    let storedGifs = JSON.parse(sessionStorage.lockedGifs);

    if(storedGifs !== 'undefined'){
      dispatch({
        type: "lock",
        payload: {
          ...this,
          gifs: [...storedGifs],
        },
      });
    }
  }

  return (
    <Gallery />
  );
}

export default App;
