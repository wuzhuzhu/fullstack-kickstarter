export default function Error({ error }) {
  return (
    <div>
      <h1>Oops!</h1>
      <p>Error: {error.message}</p>
    </div>
  );
}
