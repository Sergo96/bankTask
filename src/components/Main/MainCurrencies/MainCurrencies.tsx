import { FC } from "react";
import "./MainCurrencies.css";

interface IProps {
  usd: number;
  eur: number;
  gbp: number;
  chf: number;
}

export const MainCurrencies: FC<IProps> = ({ usd, eur, gbp, chf }) => {
  return (
    <>
      <div className="mainCurrencies">
        <p className="currencyName">I Get:</p>
        <p className="currencyName">
          USD: <span className="value">{usd}$</span>
        </p>
        <p className="currencyName">
          EUR: <span className="value">{eur}€</span>
        </p>
        <p className="currencyName">
          GBP: <span className="value">{gbp}£</span>
        </p>
        <p className="currencyName">
          CHF: <span className="value">{chf}₣</span>
        </p>
      </div>
    </>
  );
};
