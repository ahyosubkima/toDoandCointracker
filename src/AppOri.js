import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState(0);
  const [calVal, setCalVal] = useState(0);
  const [selectedcoin, setSelectedCoin] = useState(0);
  const [selectedCoinName, setSelectedCoinName] = useState("");

  function onSubmit(event) {
    event.preventDefault();

    // console.log(selectedcoin);
    console.log(myMoney / selectedcoin);
    setCalVal(myMoney / selectedcoin);
  }

  function onChange(event) {
    setMyMoney(event.target.value);
  }
  function choiceDifferentCoin(event) {
    console.log(event.target);
    console.log(event.target.value);
    setSelectedCoin(event.target.value);
    setSelectedCoinName(event.target.innerText);
    let selcIdx = event.target.options.selectedIndex;
    console.log(event.target.options[selcIdx].text);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setCoins(json);
        setLoading(false);
        setSelectedCoin(json[0].quotes.USD.price);
        setSelectedCoinName(json[0].name);
      });
  }, []);
  // useEffect(() => {
  //   console.log("rerenderd");
  //   console.log(selectedcoin / myMoney);
  //   if (isNaN(selectedcoin / myMoney)) {
  //     console.log("nan");
  //   } else {
  //     setCalVal(selectedcoin / myMoney);
  //     console.log(calVal);
  //   }
  // }, [selectedcoin]);
  console.log("rendering always");
  console.log(selectedcoin);
  console.log(calVal);

  return (
    <div>
      <h1>The Coins {loading ? "" : `(${coins.length})`}</h1>
      <form onSubmit={onSubmit}>
        {loading ? (
          <strong>Loading...</strong>
        ) : (
          <select onChange={choiceDifferentCoin}>
            {coins.map((coin, index) => (
              <option key={index} value={coin.quotes.USD.price}>
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
      </form>
      {calVal === 0 ? (
        <h3>you can get nothing</h3>
      ) : (
        <h3> you can get {calVal} </h3>
      )}
    </div>
  );
}

// 내가가진 USD -> 몇개살수있는지 만들기
export default App;
