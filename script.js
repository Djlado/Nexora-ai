// script.js

const form = document.querySelector("#chat-form"); // Use ID for consistency
const input = document.querySelector("#user-input"); // Use ID for consistency
const chatContainer = document.querySelector("#chat-container");

// The correct, full URL to your backend's chat endpoint
const API_URL = "https://nexora-backend.onrender.com/chat";

// This function adds a message to the chat interface
function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender === "user" ? "message-user" : "message-bot");
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

// This function sends the user's message to the backend
async function sendMessage(text) {
  addMessage("user", text);

  try {
    const response = await fetch(API_URL, { // CHANGED: Using the correct full URL
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }), // CHANGED: Sending "message" instead of "prompt"
    });

    const data = await response.json();
    
    // CHANGED: Reading "response" from data, not "reply"
    const reply = data.response || "Sorry, something went wrong on the server."; 
    addMessage("bot", reply);

  } catch (error) {
    console.error("Error connecting to the backend:", error);
    addMessage("bot", "An error occurred while connecting to Nexora AI.");
  }
}

// Event listener for the form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    sendMessage(text);
    input.value = "";
  }
});
