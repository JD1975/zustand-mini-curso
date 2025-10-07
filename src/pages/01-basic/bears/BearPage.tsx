import { WhiteCard } from "../../../components";
import { useBearStore } from "../../../stores";

import { WhiteCardBears } from "../../../stores";

export const BearPage = () => {
  const blackBears = useBearStore((state) => state.blackBears);
  const polarBears = useBearStore((state) => state.polarBears);
  const pandaBears = useBearStore((state) => state.pandaBears);

  const bears = useBearStore((state) => state.bearsList);
  const doNothing = useBearStore((state) => state.doNothing);
  const addBear = useBearStore((state) => state.addBear);
  const clearBears = useBearStore((state) => state.clearBears);

  const increaseBlackBears = useBearStore((state) => state.increaseBlackBears);
  const increasePolarBears = useBearStore((state) => state.increasePolarBears);
  const increasePandaBears = useBearStore((state) => state.increasePandaBears);

  return (
    <>
      <h1>Contador de Osos</h1>
      <p>Manejo de estado simple de Zustand</p>
      <hr />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <WhiteCardBears
          titleWhiteCard="Osos negros"
          numberOfBears={blackBears}
          changeBears={increaseBlackBears}
        />

        <WhiteCardBears
          titleWhiteCard="Osos polares"
          numberOfBears={polarBears}
          changeBears={increasePolarBears}
        />

        <WhiteCardBears
          titleWhiteCard="Osos panda"
          numberOfBears={pandaBears}
          changeBears={increasePandaBears}
        />

        <WhiteCard>
          <button
            className="bg-blue-500 px-3 py-1 rounded-md text-white"
            onClick={doNothing}
          >
            Do Nothing
          </button>

          <button
            className="bg-green-500 px-3 py-1 rounded-md text-white mx-2 mt-2"
            onClick={addBear}
          >
            Add Bear
          </button>

          <button
            className="bg-red-500 px-3 py-1 rounded-md text-white mt-2"
            onClick={clearBears}
          >
            Clear Bears
          </button>

          <pre>{JSON.stringify(bears, null, 2)}</pre>
        </WhiteCard>
      </div>
    </>
  );
};
