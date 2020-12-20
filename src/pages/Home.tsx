import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

type homeProps = {
  isLogin: boolean;
};

const Home = ({ isLogin }: homeProps) => {
  const [toDoInput, setToDoInput] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [toDoArray, setToDoArray] = useState<any>([]);

  // 로컬에서 데이터 가져옴(비로그인)
  const loadFromLocal = () => {
    const getToDo = localStorage.getItem("toDoList");
    if (getToDo !== null) {
      const parsedToDo = JSON.parse(getToDo);
      setToDoArray(parsedToDo);
      setIsLoaded(true);
    }
  };

  //DB에서 데이터 가져옴(로그인)
  //   const loadFromDB = () => {};

  const clearState = () => {
    setToDoInput("");
    setIsLoaded(false);
    setToDoArray([]);
  };

  // 페이지 접속하자 마자 데이터 가져오는 함수 실행
  useEffect(() => {
    if (isLogin === true) {
      //   loadFromDB();
    } else {
      loadFromLocal();
    }

    // 해당 페이지에서 나갈 경우 State 초기화(컴포넌트 unmount 버그 방지)
    return () => clearState();
  }, [isLogin]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const toDoObj = {
      id: uuid(),
      value: toDoInput,
    };
    toDoArray.push(toDoObj);
    localStorage.setItem("toDoList", JSON.stringify(toDoArray));
    setToDoInput("");
  };

  const onChange = (event: any) => {
    const { name, value } = event.target;
    if (name === "toDoInput") {
      setToDoInput(value);
    }
  };

  const onDelete = (event: any) => {
    const { value } = event.target;
    toDoArray.splice(value, 1);
    localStorage.setItem("toDoList", JSON.stringify(toDoArray));
    loadFromLocal();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          maxLength={120}
          onChange={onChange}
          name="toDoInput"
          value={toDoInput}
        ></input>
        <input type="submit"></input>
      </form>
      {isLoaded ? (
        toDoArray.map((todo: any, idx: any) => {
          return (
            <div key={todo.id}>
              {todo.value}
              <button value={idx} onClick={onDelete}>
                삭제
              </button>
            </div>
          );
        })
      ) : (
        <div>isLoading...</div>
      )}
    </>
  );
};

Home.defaultProps = {
  isLogin: false,
};

export default Home;
