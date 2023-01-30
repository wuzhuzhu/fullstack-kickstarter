const Conversation = ({ conversation }) => {
  return (
    <div>
      <h2>Conversation card</h2>
      <p>{conversation?.id}</p>
      <p>{conversation?.text}</p>
    </div>
  );
};

export default Conversation;
