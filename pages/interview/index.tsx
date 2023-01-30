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

export const InterviewPage = () => {
  const [isSupportedBrowser, setIsSupportedBrowser] = useState(true);
  const [isAILoading, setIsAILoading] = useState(false);
  const breakPoints = useStore((state) => state.breakPoints);
  const addBreakPoint = useStore((state) => state.addBreakPoint);

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

  const goGetQuestions = async () => {
    setIsAILoading(true);
    if (isAILoading) return;
    try {
      // 1. get current transcript length as a new break point, add to brewkPoints array
      const currentLength = transcript.length;
      if (
        currentLength > 0 &&
        currentLength > breakPoints[breakPoints.length - 1] // has some new content
      ) {
        // 2. get the piece of text of transcript between the last 2 breakpoints
        const lastBreakPointIndex = breakPoints[breakPoints.length - 1];
        // bring a little bit more text to the AI, make the input more likely complete
        const textToSend = transcript.slice(
          lastBreakPointIndex - BREAK_POINTS_REDUNDANT > 0
            ? lastBreakPointIndex - BREAK_POINTS_REDUNDANT
            : lastBreakPointIndex,
          currentLength
        );
        // 3. send that piece of text to the AI
        const res = await fetcher("/api/interview/get-questions", "post", {
          text: textToSend,
        });
        // console.log("goGetQuestions", res);
        return res;
        addBreakPoint(currentLength);
      }
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
          <button onClick={() => addBreakPoint(1)}>Send to AI</button>
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
