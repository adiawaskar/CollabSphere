import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // Replace with your backend URL

const TeamChat = () => {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("userList", (userList) => {
      setUsers(userList);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const joinChat = () => {
    if (username.trim()) {
      socket.emit("join", { username });
      setIsJoined(true);
    }
  };

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = { user: username, text: message };
      socket.emit("sendMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessage("");
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%" }}>
      {!isJoined ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              width: "300px",
            }}
          />
          <button
            onClick={joinChat}
            style={{
              padding: "10px 20px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Join Chat
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            height: "80%",
            width: "80%",
            border: "1px solid #ccc",
            borderRadius: "10px",
            overflow: "hidden",
          }}
        >
          <div style={{ width: "20%", backgroundColor: "#f4f4f4", padding: "10px", borderRight: "1px solid #ccc" }}>
            <h4>Online Users</h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {users.map((user) => (
                <li key={user.id} style={{ padding: "5px", borderBottom: "1px solid #ddd" }}>
                  {user.username}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div
              style={{
                flexGrow: 1,
                padding: "10px",
                overflowY: "auto",
                backgroundColor: "#f9f9f9",
              }}
            >
              {messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    textAlign: msg.user === username ? "right" : "left",
                    color: msg.user === username ? "blue" : "black",
                    marginBottom: "10px",
                  }}
                >
                  <strong>{msg.user}:</strong> {msg.text}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                padding: "10px",
                borderTop: "1px solid #ccc",
              }}
            >
              <input
                type="text"
                placeholder="Type a message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                style={{
                  flexGrow: 1,
                  padding: "10px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                }}
              />
              <button
                onClick={sendMessage}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamChat;
