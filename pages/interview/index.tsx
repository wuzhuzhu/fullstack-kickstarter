import { useState, useEffect } from "react";
import useSWR from "swr";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Layout from "../../components/Layout";
import useStore from "../../lib/store";
import Conversations from "./components/conversations";
import fetcher from "../../lib/fetcher";
import styles from "./index.module.scss";
import { BREAK_POINTS_REDUNDANT } from "../../lib/utils/config";

// todo: rm this
const randomChinese = () => {
  const charCodes = [];
  const start = 19968;
  const end = 40959;
  const numOfChars = Math.floor(Math.random() * (end - start)) + start;
  charCodes.push(numOfChars);
  return String.fromCharCode(...charCodes);
};

export const InterviewPage = () => {
  const [isSupportedBrowser, setIsSupportedBrowser] = useState(true);
  const [isAILoading, setIsAILoading] = useState(false);
  const breakPoints = useStore((state) => state.breakPoints);
  const addBreakPoint = useStore((state) => state.addBreakPoint);

  // todo: rm mock transcript
  const [transcript, setTranscript] = useState("");
  const [intervalId, setIntervalId] = useState(null);
  useEffect(() => {
    const id = setInterval(() => {
      setTranscript((prevTranscript) => prevTranscript + randomChinese());
    }, 500);
    setIntervalId(id);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const {
    // transcript, // todo: change it back from mock
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setIsSupportedBrowser(false);
    }
  }, [browserSupportsSpeechRecognition]);

  const goGetQuestions = async () => {
    if (isAILoading) return;
    setIsAILoading(true);
    try {
      // 1. get current transcript length as a new break point, add to brewkPoints array
      const currentLength = transcript.length;
      if (
        currentLength > 0 &&
        currentLength > breakPoints[breakPoints.length - 1] // has some new content
      ) {
        console.log("has some");
        // 2. get the piece of text of transcript between the last 2 breakpoints
        const lastBreakPointIndex = breakPoints[breakPoints.length - 1];
        // bring a little bit more text to the AI, make the input more likely complete
        const textToSend = transcript.slice(
          lastBreakPointIndex - BREAK_POINTS_REDUNDANT > 0
            ? lastBreakPointIndex - BREAK_POINTS_REDUNDANT
            : lastBreakPointIndex,
          currentLength
        );
        console.log("textToSend", textToSend);
        // 3. send that piece of text to the AI
        const res = await fetcher("/api/interview/get-questions", "post", {
          text: textToSend,
          tada: "go",
        });
        // console.log("goGetQuestions", res);
        return res;
        addBreakPoint(currentLength);
      } else {
        console.log("no new content");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAILoading(false);
    }
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
          {breakPoints.length
            ? breakPoints.map((bp, i) => <p key={i}>{bp}</p>)
            : null}
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
