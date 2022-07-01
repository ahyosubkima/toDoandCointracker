import { useState } from "react";

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const onChange = (event) => {
    setToDo(event.target.value);
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return false;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");

    //state를 set할 때 2가지옵션 첫번쨰는 직접값주기
    //두번쨰는 함수return으로 전달
  }; //...는 array에서 내용물다뺴주는거

  //setState는 이벤트핸들러내부에서 비동기식
  //이벤트끝날떄까지 렌더링을안하고 기다리기때문에
  //setToDos setToDo가있지만 한번만렌더링하는것

  return (
    <div>
      <h1>My To Dos ({toDos.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          onChange={onChange}
          value={toDo}
          type="text"
          placeholder="Write your to do.."
        ></input>
        <button>Add to Do</button>
      </form>
      <hr />
      <ul>
        {toDos.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
        {/* 간단하게 li배열이 retrun되므로 ul에 담음 */}
      </ul>
      {/* map은 하나의 array에 있는 아이템을 무엇이든
       내가원하는 것으로 바꿔주고 그 바뀐 array를 리턴 */}
      {/* map함수는 첫번째 argument로 현재아이템을
       가져올수 있다 그리고 그 아이템들을 다시 리턴하는것도가능 */}
      {/* 배열반환하지만 그과정에서 for문처럼  */}
    </div>
  );
}

export default App;
