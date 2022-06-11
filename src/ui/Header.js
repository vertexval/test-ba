import { useDispatch } from "react-redux";

import Button from "../components/Button";
import "./Header.css";

function Header() {
  const dispatch = useDispatch();

  document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
      counterHandler();
    }
  };

  function counterHandler() {
    dispatch({
      type: "iteration",
    });
  }

  return (
    <header>
      <div className="header-logo">
        <span>TESTHY</span>
      </div>
      <div className="header-content">
        <div className="header-info">
          <div className="icon-container">
            <div className="icon-i">
              <span>i</span>
            </div>
          </div>
          <div className="header-label">
            Press <span className="header-highlight">spacebar</span> to shuffle or
          </div>
        </div>
        <Button class="button" onClick={counterHandler} label="Click here" />
      </div>
    </header>
  );
}

export default Header;
