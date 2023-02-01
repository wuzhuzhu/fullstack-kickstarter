export const randomChinese = () => {
    const charCodes = [];
    const start = 19968;
    const end = 40959;
    const numOfChars = Math.floor(Math.random() * (end - start)) + start;
    charCodes.push(numOfChars);
    return String.fromCharCode(...charCodes);
};

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

export const transcript = '123'