import { useBearStore } from "../../stores";

import { WhiteCardBears } from "../../stores";

export const BearPage = () => {
  const blackBears = useBearStore((state) => state.blackBears);
  const polarBears = useBearStore((state) => state.polarBears);
  const pandaBears = useBearStore((state) => state.pandaBears);

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
        
      </div>
    </>
  );
};
