import { IParagraph } from "../../../lib/types/basic";

const Paragraph = ({ paragraph }: { paragraph: IParagraph }) => {
  const length = paragraph?.qnas?.length || 0;
  const hasSome = length > 0;
  if (!hasSome) return <h2>"no question recognized"</h2>;
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
