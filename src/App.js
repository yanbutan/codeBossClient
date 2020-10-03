import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import cookie from "react-cookies";
import SpeechToText from "./components/speechToText";
import Test from "./components/test";
import ImgToText from "./components/imgToText";
import { googleTranslate } from "./utils/googleTranslate";

function App() {
  const [languageCodes, setLanguageCodes] = useState(null);
  const [language, setLanguage] = useState(null);
  const [question, setQuestion] = useState("Life is beautiful");

  useEffect(() => {
    // load all of the language options from Google Translate to your app state

    googleTranslate.getSupportedLanguages("en", function (err, languageCodes) {
      getLanguageCodes(languageCodes); // use a callback function to setState
    });

    const getLanguageCodes = (languageCodes) => {
      console.log(languageCodes);
      setLanguageCodes(languageCodes);
    };
  }, []);

  const handleLanguageChange = (language) => {
    let cookieLanguage = cookie.load("language");
    let transQuestion = "";

    const translating = (transQuestion) => {
      if (question !== transQuestion) {
        setQuestion(transQuestion);
        //not too sure what this part is doing
        cookie.save("question", transQuestion, { path: "/" });
      }
    };

    // translate the question when selecting a different language
    if (language !== cookieLanguage) {
      googleTranslate.translate(question, language, function (
        err,
        translation
      ) {
        console.log(translation);
        transQuestion = translation.translatedText;
        translating(transQuestion);
      });
    }

    setLanguage(language);
    cookie.save("language", language, { path: "/" });
  };

  if (languageCodes) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{question}</p>

          {/* iterate through language options to create a select box */}
          <select
            className="select-language"
            value={language}
            onChange={(e) => handleLanguageChange(e.target.value)}
          >
            {languageCodes.map((lang) => (
              <option key={lang.language} value={lang.language}>
                {lang.name}
              </option>
            ))}
          </select>
          <SpeechToText />
          <ImgToText />
        </header>
      </div>
    );
  } else return <div>loading</div>;
}

export default App;
