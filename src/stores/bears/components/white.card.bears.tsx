import { WhiteCard } from "../../../components";
import type { FC } from "react";

interface WhiteCardProps {
  titleWhiteCard: string;
  numberOfBears: number;
  changeBears: (by: number) => void;
}

export const WhiteCardBears: FC<WhiteCardProps> = ({
  titleWhiteCard,
  numberOfBears,
  changeBears,
}) => {
  return (
    <WhiteCard centered>
      <h2>{titleWhiteCard}</h2>
      <div className="flex flex-col md:flex-row items-center">
        <button onClick={() => changeBears(1)}> +1</button>
        <span className="text-3xl mx-2 lg:mx-10">{numberOfBears}</span>
        <button onClick={() => changeBears(-1)}>-1</button>
      </div>
    </WhiteCard>
  );
};

{
  /* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <WhiteCard centered>
          <h2>Osos Negros</h2>

          <div className="flex flex-col md:flex-row">
            <button onClick={() => increaseBlackBears(+1)}> +1</button>
            <span className="text-3xl mx-2 lg:mx-10"> {blackBears} </span>
            <button onClick={() => increaseBlackBears(-1)}>-1</button>
          </div>
        </WhiteCard> */
}
