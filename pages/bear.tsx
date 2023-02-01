import useBearStore from "../lib/store/slices/bear";
import BearList from "./bear-list";

const BearPage = () => {
  const { bears, addBears, removeBear } = useBearStore((state) => ({
    bears: state.bears,
    addBears: state.addBears,
    removeBear: state.removeBear,
  }));

  return (
    <div>
      <h2>Bear page</h2>
      <button onClick={() => removeBear("Bear 1")}>remove bear1</button>
      <button
        onClick={() =>
          addBears([
            {
              name: "Bear 1",
            },
            { name: "Bear 2", gender: "male" },
          ])
        }
      >
        add bears
      </button>
      <BearList />
    </div>
  );
};

export default BearPage;
