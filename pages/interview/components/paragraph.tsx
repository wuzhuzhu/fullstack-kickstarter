import { useMemo } from "react";
import { IParagraph } from "../../../lib/types/basic";

type ParagraphParams = {
  paragraph: IParagraph;
  retryGetQuestions: () => void;
};

const Paragraph = ({ paragraph }: { paragraph: IParagraph }) => {
  const hasSome = useMemo(() => {
    return (paragraph?.qnas?.length || 0) > 0;
  }, [paragraph]);
  const retryGetQuestions = () => {
    console.log("retryGetQuestions");
  };
  if (!hasSome)
    return (
      <div>
        <h2>
          "no question recognized"{" "}
          <button onClick={retryGetQuestions} disabled>
            retry
          </button>
        </h2>
      </div>
    );
  return (
    <div>
      <h2>Paragraph card with {length} questions</h2>
      {paragraph.qnas.map((qna, i) => (
        <div key={`qna-${i}`}>
          <p>{qna.question}</p>
          <p>{qna.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default Paragraph;
