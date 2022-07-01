import { useEffect, useState } from "react";
//import SelecBox from "./SelecBox";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState(0);
  const [calVal, setCalVal] = useState(0);
  const [cPrice, setCprice] = useState(0);
  const [cName, setCname] = useState("");

  function onSubmit(event) {
    event.preventDefault();
    setCalVal(myMoney / cPrice);
    let selIdx = event.target.selectBox.selectedIndex;
    setCname(event.target.selectBox.options[selIdx].dataset.name);
  }

  function onChange(event) {
    setMyMoney(event.target.value);
  }
  function changeCoin(event) {
    console.log(event.target.value);
    setCprice(event.target.value);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setCprice(json[0].quotes.USD.price);
        setCname(json[0].name);
      });
  }, []);

  return (
    <div>
      <h1>The Coins {loading ? "" : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select onChange={changeCoin} name="selectBox" value={cPrice}>
            {coins.map((coin, index) => (
              <option
                key={index}
                value={coin.quotes.USD.price}
                data-name={coin.symbol}
              >
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
        <h1>How many coins you can buy</h1>
        <input
          id="myMoney"
          onChange={onChange}
          value={myMoney}
          placeholder="put your money.."
        />
        <label htmlFor="myMoney">USD</label>
        <button>Calculating!!!!!</button>
        {calVal === 0 ? (
          <h3>you can get nothing</h3>
        ) : (
          <h3>
            you can get {calVal}&nbsp;&nbsp;&nbsp;
            {cName}
          </h3>
        )}
      </form>
    </div>
  );
}

// 내가가진 USD -> 몇개살수있는지 만들기
export default App;
