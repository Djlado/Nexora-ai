const form = document.querySelector("#chat-form");
const input = document.querySelector("#user-input");
const chatContainer = document.querySelector("#chat-container");

// This is the only URL that will work.
const API_URL = "https://nexora-ai-backend-1.onrender.com/chat";

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender === "user" ? "message-user" : "message-bot");
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage(text) {
  addMessage("user", text);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: text }),
    });

    if (!response.ok) {
        throw new Error(`Server responded with an error: ${response.status}`);
    }

    const data = await response.json();
    
    const reply = data.response; 
    addMessage("bot", reply);

  } catch (error) {
    console.error("The fetch request failed:", error);
    addMessage("bot", "An error occurred while connecting to Nexora AI.");
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    sendMessage(text);
    input.value = "";
  }
});
