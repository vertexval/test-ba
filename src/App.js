import { useDispatch, useSelector } from "react-redux";
import Gallery from "./components/Gallery";

function App() {
  const dispatch = useDispatch();

  if (localStorage.lockedGifs) {
    const storedGifs = JSON.parse(localStorage.lockedGifs);

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
