import "./App.css";
import Header from "./components/header/header";
import Post from "./components/post/post";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

function App() {
  // Set up states
  const [darkMode, setDarkMode] = useState(initalize("themeStorage", false));
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const [feedStorage, setFeedStorage] = useState(
    JSON.parse(window.localStorage.getItem("feedStorage"))
  );

  console.log(feed);

  // Initial set up of the app, fetch data from API, and
  // get saved data from Localstorage (if exists)
  useEffect(() => {
    // Set the state "loading" to TRUE
    setLoading(true);

    // Create an array of a specific length consisting of random number
    // arranged in a random order
    const randomArray = function createRandomArray(length, num) {
      const array = [];
      for (let i = 0; i < num; i++) {
        let r = Math.floor(Math.random() * length);
        while (array.includes(r)) {
          r = Math.floor(Math.random() * length);
        }
        array.push(r);
      }
      return array;
    };

    // When the app is first loaded OR when new posts has been requested
    if (feedStorage === null && feed.length === 0) {
      // Fetch data from NASA API
      fetch(
        "https://images-api.nasa.gov/search?q=apollo%2011&description=moon%20landing&media_type=image"
      )
        .then((response) => response.json())
        .then((data) => {
          // Once data has been fetched successfully, set the state "loading" to FALSE
          setLoading(false);
          // Pick a post at a random index from the fetched data to get five randomized posts
          return randomArray(data.collection.items.length, 5).map((num) => {
            const picture = data.collection.items[num];

            // Load data into the state "Feed"
            return setFeed((prevFeed) => [
              ...prevFeed,
              {
                id: picture.data[0].nasa_id,
                date: picture.data[0].date_created.slice(0, 10),
                title: picture.data[0].title,
                description: picture.data[0].description,
                author: picture.data[0].photographer.slice(5),
                location: picture.data[0].location,
                url: picture.links[0].href.replace("thumb", "large"),
                isLiked: false,
              },
            ]);
          });
        })
        // If there is any error from fetching error from API, console log it
        .catch((error) => console.log("Caught error while fetching: ", error));
    } else {
      // If Localstorage exists, set the state "feed" into the data stored in Localstorage
      if (feed.length === 0) {
        setFeed(feedStorage);
      }
      // Once the state "Feed" has been loaded with data from Localstorage,
      // set the state "loading" to FALSE
      setLoading(false);
    }
  }, [feedStorage, feed]);

  // Once the state "feed" has been loaded up with five posts, keep track of
  // any changes that happen to it (e.g., when a user likes/unlikes a post)
  useEffect(() => {
    if (feed.length >= 5) {
      window.localStorage.setItem("feedStorage", JSON.stringify(feed));
      console.log("saved");
    }
  }, [feed]);

  // Initalize state by checking if there is already storage in Localstorage
  // If not, set up the state storage and save it in Localstorage
  function initalize(storage, inital_value) {
    const getStorage = JSON.parse(window.localStorage.getItem(storage));

    if (!getStorage) {
      window.localStorage.setItem(storage, JSON.stringify(inital_value));
      return inital_value;
    }
    return getStorage;
  }

  // Toggle between light and dark mode
  function toggleTheme() {
    setDarkMode((prevMode) => !prevMode);
    window.localStorage.setItem("themeStorage", JSON.stringify(!darkMode));
  }

  // Iterate through the state "feed" and find the post a user liked
  // When found, update its "isLiked" property to "like" or "unlike" a post
  function likePost(id) {
    setFeed((prevFeed) =>
      prevFeed.map((post) =>
        post.id === id ? { ...post, isLiked: !post.isLiked } : post
      )
    );
  }

  // Loading into new posts by reseting the storage of the state "feed"
  // in Localstorage and empty any previous posts
  function removeStorage() {
    window.localStorage.removeItem("feedStorage");
    setFeedStorage(null);
    setFeed([]);
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: darkMode ? "#000000" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
      }}
    >
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      {/* When loading (i.e., when the state "loading" is TRUE, render the loading icon) */}
      {loading && (
        <FontAwesomeIcon icon={faSync} size="2x" className="fa-spin loading" />
      )}
      {/* When not loading (i.e., when the state "loading" is FALSE, render posts) */}
      {!loading && [
        <div className="posts" key={nanoid()}>
          {feed.map((post) => (
            <Post
              key={post.id}
              {...post}
              likePost={() => likePost(post.id)}
              isLiked={post.isLiked}
            />
          ))}
        </div>,
        <div
          className="newPosts"
          onClick={removeStorage}
          key={nanoid()}
          style={{
            border: `2px solid ${darkMode ? "#ffffff" : "#000000"}`,
          }}
        >
          Click to view new posts!
        </div>,
        <p
          className="credit"
          style={{
            borderTop: `1px solid ${darkMode ? "#ffffff" : "#d3d3d3"}`,
          }}
        >
          created by Steve Sam
        </p>,
      ]}
    </div>
  );
}

export default App;
