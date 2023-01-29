const Conversation = ({ conversation }) => {
  return (
    <div>
      <p>{conversation.id}</p>
      <p>{conversation.text}</p>
    </div>
  );
};

export default Conversation;
