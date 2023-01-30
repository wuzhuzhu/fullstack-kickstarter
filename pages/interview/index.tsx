import { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Layout from "../../components/Layout";
import Conversations from "./components/conversations";

import styles from "./index.module.scss";

export const InterviewPage = () => {
  const [isSupportedBrowser, setIsSupportedBrowser] = useState(true);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setIsSupportedBrowser(false);
    }
  }, [browserSupportsSpeechRecognition]);

  const goGetQuestions = () => {
    console.log("goGetQuestions");
    // send current transcript to openai api
    // add the response into Qna array, then reset transcript
  };

  return isSupportedBrowser ? (
    <Layout>
      <div className={styles.container}>
        <div className={styles.left}>
          <p>Microphone: {listening ? "on" : "off"}</p>
          <button onClick={SpeechRecognition.startListening}>Start</button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
          <hr />
          <button onClick={goGetQuestions}>Send to AI</button>
        </div>
        <div className={styles.right}>
          <Conversations></Conversations>
        </div>
      </div>
    </Layout>
  ) : (
    <span>Browser doesn't support speech recognition.</span>
  );
};

export default InterviewPage;
