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
  const qnas = useStore((state) => state.qnas);
  const addQuestions = useStore((state) => state.addQuestions);
  const addBreakPoint = useStore((state) => state.addBreakPoint);

  /* // mock transcript
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
  }, []); */

  const transcript = `ng: Hi there, could you introduce yourself?

  Candidate: Hi, my name is [Name], I'm a front-end developer with [X years of experience].
  
  Wang: OK, [Name]. Can you tell me about a project you worked on that you're particularly proud of?
  
  Candidate: Sure, I worked on a website for an e-commerce company that had high traffic and complex user interactions. I was responsible for optimizing the site's performance and improving the user experience.
  
  Wang: Uh-huh, that's impressive. Can you go into the details of how you improve the performence?
  
  Candidate: Yes, I implemented lazy loading for images, minified and combined CSS and JavaScript files, and used caching to speed up page loading times. I also utilized animations to enhance the u`;

  const {
    // transcript,
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
      const lastBreakPointIndex = breakPoints[breakPoints.length - 1] || 0;
      console.log(currentLength, lastBreakPointIndex, breakPoints);
      if (
        currentLength > 0 &&
        currentLength > lastBreakPointIndex // has some new content
      ) {
        console.log("has some");
        // 2. get the piece of text of transcript between the last 2 breakpoints

        // bring a little bit more text to the AI, make the input more likely complete
        const textToSend = transcript.slice(
          lastBreakPointIndex - BREAK_POINTS_REDUNDANT > 0
            ? lastBreakPointIndex - BREAK_POINTS_REDUNDANT
            : lastBreakPointIndex,
          currentLength
        );
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
        addQuestions(questions);
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
          <button onClick={SpeechRecognition.startListening}>Start</button>
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
          <button onClick={() => addQuestions(["提问问题1"])}>测试按钮</button>
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
