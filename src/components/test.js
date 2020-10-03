import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
export default function Test() {
  const { transcript, resetTranscript } = useSpeechRecognition();

  //   if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
  //     return null;
  //   }

  return (
    <div>
      <h1 sylte={{ color: "#fff" }}>hello hello</h1>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
  );
}
