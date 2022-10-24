import { io } from "socket.io-client";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:8000");
const userName = nanoid(4);

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });
  });

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-blue-500 text-3xl">Chat App</h1>
      {chat.map((payload, index) => {
        return (
          <span className="flex">
            <p>{payload.userName} -</p>
            <p className="bg-blue-500 p-1 rounded mb-1 " key={index}>
              {payload.message}
            </p>
          </span>
        );
      })}
      <form onSubmit={sendChat}>
        <input
          className="border-blue-500 border-2 mr-2 pl-2 "
          type="text"
          name="chat"
          value={message}
          placeholder="send text"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button className="bg-blue-500 p-1 rounded text-white" type="submit">
          Send
        </button>
      </form>
    </div>
  );
}

export default App;
