import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb, faMoon } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

export default function Header({ darkMode, toggleTheme }) {
  return (
    <div
      className="banner"
      style={{
        borderBottom: `1px solid ${darkMode ? "#ffffff" : "#d3d3d3"}`,
      }}
    >
      <div className="banner-texts">
        <h1 className="banner-title" key={nanoid()}>
          Spacebook
        </h1>
        <p className="banner-description" key={nanoid()}>
          powered by NASA's image API
        </p>
      </div>
      <div className="theme" onClick={toggleTheme} key={nanoid()}>
        <FontAwesomeIcon
          icon={darkMode ? faMoon : faLightbulb}
          size="2x"
          id="lightswitch"
        />
      </div>
    </div>
  );
}
