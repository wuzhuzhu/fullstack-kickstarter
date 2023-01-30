import Conversation from "./conversation";

const Conversations = () => {
  let data;
  /* const {
    data: { conversation },
    error,
    loading,
  } = useQuery(CONVERSATIONS_QUERY); */
  //   if (loading) return <Loading />;
  //   if (error) return <Error error={error} />;
  return (
    <div>
      <h2>Data List Blow</h2>
      {/* {data.conversations.map((conversation) => (
        <Conversation key={conversation.id} conversation={conversation} />
      ))} */}
    </div>
  );
};

export default Conversations;
