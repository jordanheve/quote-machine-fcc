import { useEffect, useState } from "react";
import "./App.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";
function App() {
  useEffect(() => {
    getQuote();
    updateColor();
  }, []);

  const [quote, setQuote] = useState({});
  const [color, setColor] = useState("#000");
  document.documentElement.style.setProperty("--color", color);

  const updateColor = () => {
    const maxChannelValue = 180;
    const randomColor =
      "#" +
      (Math.floor(Math.random() * maxChannelValue)
        .toString(16)
        .padStart(2, "0") +
        Math.floor(Math.random() * maxChannelValue)
          .toString(16)
          .padStart(2, "0") +
        Math.floor(Math.random() * maxChannelValue)
          .toString(16)
          .padStart(2, "0"));
    setColor(randomColor);
  };
  const getQuote = () => {
    fetch("https://api.quotable.io/random")
      .then((response) => response.json())
      .then((data) => {
        setQuote({
          text: data.content,
          author: data.author,
        });
      });
  };

  const handleClick = () => {
    getQuote();
    updateColor();
  };
  return (
    <>
      <main id="quote-box">
        <p id="text">
          <i className="fa-solid fa-quote-left"></i>
          &nbsp;
          {quote.text}
        </p>
        <p id="author">{quote.author}</p>

        <div className="btns-container">
          <div className="share-btns">
            <abbr title="Post to twitter">
              <a
                href={
                  "https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=" +
                  '"' +
                  quote.text +
                  '" ' +
                  quote.author
                }
                target="_blank"
                id="tweet-quote"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </abbr>
            <abbr title="Post to twitter">
              <a
                href={
                  "https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=" +
                  '"' +
                  quote.text +
                  '" ' + "&content=" +
                  quote.author + "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button"
                }
                target="_blank"
                id="tumblr-quote"
              >
                <i className="fa-brands fa-tumblr"></i>
              </a>
            </abbr>
          </div>
          <button id="new-quote" onClick={handleClick}>
            New Quote
          </button>
        </div>
      </main>
      
    </>
  );
}

export default App;
