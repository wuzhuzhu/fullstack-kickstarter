import { useState, useEffect, useCallback } from "react";
import useSWR from "swr";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Layout from "../../components/Layout";
import useStore from "../../lib/store/slices/conversations";
import Conversation from "./components/conversation";
import fetcher from "../../lib/fetcher";
import styles from "./index.module.scss";
import { BREAK_POINTS_REDUNDANT } from "../../lib/utils/config";
// import { transcript } from "../../lib/utils/mock-tools"; // todo: toggle from mock

export const InterviewPage = () => {
  const [isSupportedBrowser, setIsSupportedBrowser] = useState(true);
  const isAILoading = useStore((state) => state.isAILoading);
  // const [isAILoading, setIsAILoading] = useState(false);
  const setIsAILoading = useStore((state) => state.setIsAILoading);
  const breakPoints = useStore((state) => state.breakPoints);
  const addQuestions = useStore((state) => state.addQuestions);
  const addBreakPoint = useStore((state) => state.addBreakPoint);

  const {
    transcript, // todo: toggle from mock
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = useCallback(() => {
    SpeechRecognition.startListening({
      continuous: true,
      // language: "zh-CN", // todo: test mixed language support
    });
  }, []);

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
      const lastBreakPointIndex = breakPoints[breakPoints.length - 1] || 0;
      console.log(currentLength, lastBreakPointIndex, breakPoints);
      if (
        currentLength > 0 &&
        currentLength > lastBreakPointIndex // has some new content
      ) {
        // console.log("has some");
        // 2. get the piece of text of transcript between the last 2 breakpoints

        // bring a little bit more text to the AI, make the input more likely complete
        const sliceStartPoint = getSliceStartPoint(lastBreakPointIndex);

        const textToSend = transcript.slice(sliceStartPoint, currentLength);
        // console.log("textToSend", textToSend);
        // 3. send that piece of text to the AI
        const { questions } = await fetcher(
          "/api/interview/get-questions",
          "post",
          {
            text: textToSend,
          }
        );
        // todo: Atomize this operation in the store.
        addQuestions(questions, [sliceStartPoint, currentLength]);
        addBreakPoint(currentLength);
      } else {
        console.log("no new content"); // todo: toast it
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
          <button
            onClick={() =>
              SpeechRecognition.startListening({
                continuous: true,
                language: "zh-CN",
              })
            }
          >
            Start
          </button>
          <button onClick={SpeechRecognition.stopListening}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
          {breakPoints.length
            ? breakPoints.map((bp, i) => <p key={i}>{bp}</p>)
            : null}
          <hr />
          <button onClick={goGetQuestions} disabled={isAILoading}>
            Send to AI
          </button>
          <button onClick={() => addQuestions(["提问问题1"], [0, 0])}>
            测试按钮
          </button>
        </div>
        <div className={styles.right}>
          <Conversation />
        </div>
      </div>
    </Layout>
  ) : (
    <span>Browser doesn't support speech recognition.</span>
  );
};

// functions
function getSliceStartPoint(lastBreakPointIndex: number): number {
  return lastBreakPointIndex - BREAK_POINTS_REDUNDANT > 0
    ? lastBreakPointIndex - BREAK_POINTS_REDUNDANT
    : lastBreakPointIndex;
}

export default InterviewPage;
