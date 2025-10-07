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
      <div className="flex flex-col md:flex-row items-center gap-2">
        <button
          className="px-3 py-1 rounded-md text-white"
          onClick={() => changeBears(1)}
        >
          +
        </button>
        <span className="text-3xl mx-2 lg:mx-10">{numberOfBears}</span>
        <button
          className={
            `px-3 py-1 rounded-md transition-colors duration-150 ` +
            (numberOfBears <= 0
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "text-white")
          }
          disabled={numberOfBears <= 0}
          aria-label={`Disminuir ${titleWhiteCard}`}
          onClick={() => {
            if (numberOfBears > 0) changeBears(-1);
          }}
        >
          -
        </button>
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
