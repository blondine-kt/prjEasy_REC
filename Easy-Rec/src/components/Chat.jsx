import React, { useContext, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import Api from "../context/Apicontext";
import { useAuth } from "../context/userAuth";
import { data } from "react-router-dom";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", isBot: true },
  ]);
  const { SOURCE } = useContext(Api);
  const { user } = useAuth();
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([...messages, { text: input, isBot: false }]);
    setInput("");
    let msg ={
        id: String(201),
        text:input
    }
    try {
      const response = await fetch(`${SOURCE}/chatbot`, {
        method: "POST",

        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(msg),
      });
      const data = await response.json();
      console.log("reponse:", data);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            text: data.response,
            isBot: true,
          },
        ]);
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const styles = {
    container: {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      zIndex: 9999,
    },
    chatWindow: {
      position: "fixed",
      bottom: "100px", // Increased distance from bottom
      right: "20px",
      width: "350px", // Increased width
      height: "500px", // Increased height
      backgroundColor: "#fff",
      borderRadius: "16px",
      boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      border: "1px solid rgba(0, 0, 0, 0.1)",
    },
    header: {
      padding: "20px",
      backgroundColor: "#2563eb",
      color: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontSize: "16px",
      fontWeight: 500,
    },
    closeButton: {
      background: "none",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      padding: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      transition: "background-color 0.2s",
      ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
      },
    },
    messageContainer: {
      flex: 1,
      padding: "20px",
      overflowY: "auto",
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      backgroundColor: "#f8fafc",
    },
    messageWrapper: {
      display: "flex",
      justifyContent: "flex-start",
      width: "100%",
      marginBottom: "8px",
    },
    userMessageWrapper: {
      justifyContent: "flex-end",
    },
    message: {
      maxWidth: "85%",
      padding: "12px 16px",
      borderRadius: "12px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      fontSize: "14px",
      lineHeight: "1.5",
    },
    userMessage: {
      backgroundColor: "#2563eb",
      color: "#fff",
      boxShadow: "0 2px 4px rgba(37, 99, 235, 0.2)",
    },
    inputForm: {
      padding: "16px 20px",
      borderTop: "1px solid #e2e8f0",
      display: "flex",
      gap: "12px",
      backgroundColor: "#fff",
    },
    input: {
      flex: 1,
      padding: "12px 16px",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      outline: "none",
      fontSize: "14px",
      transition: "border-color 0.2s",
      ":focus": {
        borderColor: "#2563eb",
      },
    },
    sendButton: {
      padding: "12px",
      backgroundColor: "#2563eb",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "background-color 0.2s",
      ":hover": {
        backgroundColor: "#1d4ed8",
      },
    },
    fab: {
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      backgroundColor: "#3725ca",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 4px 12px rgba(37, 99, 235, 0.4)",
      transition: "transform 0.2s, background-color 0.2s",
      ":hover": {
        transform: "scale(1.05)",
        backgroundColor: "#1d4ed8",
      },
    },
  };

  return (
    <div style={styles.container}>
      {isOpen && (
        <div style={styles.chatWindow}>
          <div style={styles.header}>
            <span>Chat Support</span>
            <button onClick={() => setIsOpen(false)} style={styles.closeButton}>
              <X size={20} />
            </button>
          </div>

          <div style={styles.messageContainer}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.messageWrapper,
                  ...(msg.isBot ? {} : styles.userMessageWrapper),
                }}
              >
                <div
                  style={{
                    ...styles.message,
                    ...(msg.isBot ? {} : styles.userMessage),
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={styles.inputForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              style={styles.input}
            />
            <button type="submit" style={styles.sendButton}>
              <Send size={20} />
            </button>
          </form>
        </div>
      )}

      <button onClick={() => setIsOpen(!isOpen)} style={styles.fab}>
        <MessageCircle size={28} />
      </button>
    </div>
  );
};

export default FloatingChatbot;
