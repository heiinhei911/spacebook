import "./post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as farThumbsUp } from "@fortawesome/free-regular-svg-icons";
import icon from "../../img/nasa-logo.png";

export default function Post(props) {
  return (
    <div className="post">
      <div className="post-top-section">
        <img className="post-icon" src={icon} alt="NASA icon" />
        <div className="post-info">
          <div className="post-author">{props.author}</div>
          <div className="post-details">
            <time dateTime={props.date} className="post-date">
              {props.date}
            </time>
            <span className="post-dot">&#8226;</span>
            <span className="post-location">{props.location}</span>
          </div>
        </div>
      </div>
      <img className="post-img" src={props.url} alt={props.title} />
      <div className="post-like" onClick={props.likePost}>
        <FontAwesomeIcon
          icon={props.isLiked ? faThumbsUp : farThumbsUp}
          size="lg"
          style={props.isLiked && { color: "#0000ff" }}
        />
        {!props.isLiked && <span className="post-liked-text">Like</span>}
        {props.isLiked && <span className="post-liked-text">Liked</span>}
      </div>

      <p className="post-description">
        <span className="post-author">{props.author}</span>
        {props.title}. {props.description}
      </p>
    </div>
  );
}
