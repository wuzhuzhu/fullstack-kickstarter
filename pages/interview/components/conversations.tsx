import { useEffect } from "react";
import useStore from "../../../lib/store";
import Conversation from "./conversation";

const Conversations = () => {
  let data;
  const qnas = useStore((state) => state.qnas);
  useEffect(() => {
    console.log({ qnas });
  }, [qnas]);
  return (
    <div>
      <h2>Data List Blow</h2>
      {qnas?.length ? (
        qnas.map((qna, i) => (
          <Conversation key={`qna-${i}`} conversation={qna} />
        ))
      ) : (
        <p>Start recording to identify the list of problems</p>
      )}
    </div>
  );
};

export default Conversations;
