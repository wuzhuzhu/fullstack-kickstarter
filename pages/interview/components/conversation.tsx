import { IQnA } from "../../../lib/types/basic";

const Conversation = ({ conversation }: { conversation: IQnA }) => {
  return (
    <div>
      <h2>Conversation card</h2>
      <p>{conversation?.question}</p>
    </div>
  );
};

export default Conversation;
