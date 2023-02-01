import useBearStore from "../lib/store/slices/bear";

export default function () {
  const bears = useBearStore((state) => state.bears);
  return (
    <>
      {bears?.length
        ? bears.map((bear, i) => <p key={i}>{bear.name}</p>)
        : null}
    </>
  );
}
