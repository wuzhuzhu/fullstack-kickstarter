import { useEffect } from "react";
import useStore from "../../../lib/store/slices/conversations";
import Paragraph from "./paragraph";

const Conversation = () => {
  let data;
  const paragraphs = useStore((state) => state.paragraphs);
  useEffect(() => {
    console.log({ paragraphs });
  }, [paragraphs]);
  if (!paragraphs?.length)
    return <p>Start recording to identify the list of problems</p>;
  return (
    <div>
      <h2>Data List Below</h2>
      {paragraphs.map((paragraph, i) => (
        <Paragraph key={`paragraph-${i}`} paragraph={paragraph} />
      ))}
    </div>
  );
};

export default Conversation;
