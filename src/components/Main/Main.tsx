import { FC, useEffect, useState } from "react";
import { MainCurrencies } from "./MainCurrencies";
import "./Main.css";

export const Main: FC = () => {
  const [currencyState, setCurrencyState] = useState<any>();
  const [currencySingleState, setSingleCurrencyState] = useState<any>();
  const [todaysVal, setTodaysVal] = useState({
    usd: 0,
    eur: 0,
    gbp: 0,
    chf: 0,
  });

  const [singleCurrencyValue, setSingleCurrencyValue] = useState<number>(0);

  const [singleCurrency, setSingleCurrency] = useState("AMD");

  let myHeaders = new Headers();
  myHeaders.append("apikey", "hGqwYAC33SdP5rgFd8MYvsNmDROQJzP7");

  const requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  const fetchData = () => {
    let currDate = new Date().toISOString().split("T")[0];

    fetch(
      `https://api.apilayer.com/exchangerates_data/${currDate}?symbols=USD,EUR,GBP,CHF&base=AMD`,
      requestOptions as RequestInit
    )
      .then((response) => response.text())
      .then((result) => {
        const obj = JSON.parse(result);
        setCurrencyState(obj);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchSpecificCurrHandler = (currName: string) => {
    let currDate = new Date().toISOString().split("T")[0];

    fetch(
      `https://api.apilayer.com/exchangerates_data/${currDate}?symbols=AMD&base=${currName}`,
      requestOptions as RequestInit
    )
      .then((response) => response.text())
      .then((result) => {
        const obj = JSON.parse(result);
        setSingleCurrencyState(obj);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <div className="main">
        {singleCurrency === "AMD" ? (
          <>
            <MainCurrencies
              usd={todaysVal.usd}
              eur={todaysVal.eur}
              gbp={todaysVal.gbp}
              chf={todaysVal.chf}
            />
            <div className="inputOfCurrency">
              <input
                type="number"
                className="inputOfCurrencyInpt"
                aria-label="i get"
                onChange={(e) => {
                  const num = +e.target.value;
                  setTodaysVal({
                    usd: currencyState.rates.USD * num,
                    eur: currencyState.rates.EUR * num,
                    gbp: currencyState.rates.GBP * num,
                    chf: currencyState.rates.CHF * num,
                  });
                }}
              />
              <span>֏</span>
            </div>
          </>
        ) : (
          <div className="singleCurrency">
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1>What i get</h1>
              <p className="currencyName">
                {singleCurrency}:{" "}
                <span className="value">{singleCurrencyValue}֏</span>
              </p>
            </div>

            <div className="inputOfCurrency">
              <input
                type="number"
                className="inputOfCurrencyInpt"
                aria-label="i get"
                onChange={(e) => {
                  const num = +e.target.value;
                  setSingleCurrencyValue(currencySingleState?.rates.AMD * num);
                }}
              />
              <span>{singleCurrency}</span>
            </div>
          </div>
        )}
      </div>
      <div className="currencyButtons">
        <button
          onClick={() => {
            setSingleCurrency("AMD");
          }}
          className="currencyButton"
        >
          AMD
        </button>
        <button
          className="currencyButton"
          onClick={() => {
            fetchSpecificCurrHandler("EUR");
            setSingleCurrency("EUR");
          }}
        >
          EUR
        </button>
        <button
          className="currencyButton"
          onClick={() => {
            fetchSpecificCurrHandler("GBP");
            setSingleCurrency("GBP");
          }}
        >
          GBP
        </button>
        <button
          className="currencyButton"
          onClick={() => {
            fetchSpecificCurrHandler("CHF");
            setSingleCurrency("CHF");
          }}
        >
          CHF
        </button>
      </div>
    </div>
  );
};
