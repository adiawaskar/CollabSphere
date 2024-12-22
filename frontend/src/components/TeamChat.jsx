import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { io } from "socket.io-client";
import { format } from "date-fns";
import { FiSend, FiUser, FiMessageCircle } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 py-8 px-4">
      <div className="max-w-7xl mx-auto bg-white/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        {!isJoined ? (
          <div className="flex items-center justify-center min-h-[600px] bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-100 p-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/70 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-md w-full border border-purple-100"
            >
              <div className="text-center mb-8">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                  <FiMessageCircle className="text-4xl" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  Welcome to Team Chat
                </h2>
                <p className="text-gray-600 text-lg">Connect with your team members in real-time</p>
              </div>
              
              <form onSubmit={handleJoin} className="space-y-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-purple-700 mb-2 ml-1">
                    Your Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all bg-white/50 backdrop-blur-sm"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-purple-200"
                    whileHover={{ scale: 1.02, boxShadow: '0 8px 16px rgba(129, 140, 248, 0.2)' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join Chat
                  </motion.button>

                  <p className="text-center text-sm text-purple-600">
                    Start collaborating with your team instantly
                  </p>
                </div>
              </form>

              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-30 -z-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-indigo-200 to-purple-200 rounded-full blur-3xl opacity-30 -z-10"></div>
            </motion.div>
          </div>
        ) : (
          <div className="flex h-[800px]">
            {/* Users Sidebar */}
            <div className="w-80 bg-gradient-to-b from-purple-600 to-indigo-600 text-white p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <FiUser className="text-2xl" />
                Online Members
              </h3>
              <div className="space-y-3">
                {onlineUsers.map((onlineUser) => (
                  <motion.div
                    key={onlineUser.userId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <div className="relative">
                      <div className="w-10 h-10 bg-purple-300 rounded-full flex items-center justify-center">
                        <span className="text-purple-700 font-semibold">
                          {onlineUser.username[0].toUpperCase()}
                        </span>
                      </div>
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                    </div>
                    <span className="font-medium">{onlineUser.username}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-gray-50">
              {/* Chat Header */}
              <div className="bg-white border-b border-gray-200 p-4">
                <h2 className="text-xl font-semibold text-gray-800">Team Chat</h2>
                <p className="text-sm text-gray-600">Project: {projectName}</p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence>
                  {messages.map((msg, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className={`flex ${msg.sender === user?.name ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      <div className={`max-w-[70%] ${msg.sender === user?.name ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white' : 'bg-white'} rounded-2xl px-6 py-3 shadow-md`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-semibold ${msg.sender === user?.name ? 'text-purple-100' : 'text-purple-600'}`}>
                            {msg.sender}
                          </span>
                          <span className={`text-xs ${msg.sender === user?.name ? 'text-purple-200' : 'text-gray-500'}`}>
                            {format(new Date(msg.timestamp), 'HH:mm')}
                          </span>
                        </div>
                        <p className={msg.sender === user?.name ? 'text-white' : 'text-gray-700'}>
                          {msg.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <form onSubmit={sendMessage} className="bg-white border-t border-gray-200 p-4">
                <div className="flex gap-4">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
                  />
                  <motion.button
                    type="submit"
                    className="px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg flex items-center gap-2 font-semibold disabled:opacity-50"
                    disabled={!message.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FiSend className="text-xl" />
                    Send
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamChat; 