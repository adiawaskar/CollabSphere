import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import { format } from "date-fns";
import { FiSend, FiUser } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/TeamChat.css";

const TeamChat = ({ projectName }) => {
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Connect to socket server
    socketRef.current = io(import.meta.env.VITE_SOCKET_URL, {
      query: {
        userId: user?.id,
        username: user?.name,
        projectName
      }
    });

    // Listen for messages
    socketRef.current.on("message", (newMessage) => {
      setMessages(prev => [...prev, newMessage]);
    });

    // Listen for online users updates
    socketRef.current.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    // Load previous messages
    socketRef.current.emit("getMessages", projectName, (response) => {
      if (response.success) {
        setMessages(response.messages);
      }
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [projectName, user]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && user) {
      const newMessage = {
        text: message,
        sender: user.name,
        timestamp: new Date(),
        projectName
      };

      socketRef.current.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setIsJoined(true);
      // Connect to socket here
    }
  };

  if (!isJoined) {
    return (
      <div className="team-chat-container">
        <div className="join-chat-container">
          <form onSubmit={handleJoin} className="join-form">
            <h2>Join Team Chat</h2>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="join-form-input"
              required
            />
            <motion.button
              type="submit"
              className="join-button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Join Chat
            </motion.button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="team-chat-container">
      <div className="chat-interface">
        {/* Users Sidebar */}
        <div className="users-sidebar">
          <h3 className="sidebar-title">Online Users</h3>
          <div className="users-list">
            {onlineUsers.map((onlineUser) => (
              <motion.div
                key={onlineUser.userId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="user-item"
              >
                <div className="user-avatar">
                  <FiUser />
                  <span className="online-indicator"></span>
                </div>
                <span className="user-name">{onlineUser.username}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          <div className="messages-container">
            <AnimatePresence>
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`message ${msg.sender === user?.name ? 'sent' : 'received'}`}
                >
                  <div className="message-content">
                    <span className="sender-name">{msg.sender}</span>
                    <p className="message-text">{msg.text}</p>
                    <span className="message-time">
                      {format(new Date(msg.timestamp), 'HH:mm')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <form onSubmit={sendMessage} className="message-input-container">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="message-input"
            />
            <button type="submit" className="send-button" disabled={!message.trim()}>
              <FiSend />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TeamChat; 