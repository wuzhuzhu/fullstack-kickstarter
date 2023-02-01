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

export const transcript = `ng: Hi there, could you introduce yourself?

Candidate: Hi, my name is [Name], I'm a front-end developer with [X years of experience].

Wang: OK, [Name]. Can you tell me about a project you worked on that you're particularly proud of?

Candidate: Sure, I worked on a website for an e-commerce company that had high traffic and complex user interactions. I was responsible for optimizing the site's performance and improving the user experience.

Wang: Uh-huh, that's impressive. Can you go into the details of how you improve the performence?

Candidate: Yes, I implemented lazy loading for images, minified and combined CSS and JavaScript files, and used caching to speed up page loading times. I also utilized animations to enhance the u`;