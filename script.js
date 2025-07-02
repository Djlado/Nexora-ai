const form = document.querySelector("#chat-form");
const input = document.querySelector("#user-input");
const chatContainer = document.querySelector("#chat-container");

// The live URL for your Render backend, with the /chat endpoint.
const API_URL = "https://nexora-ai-backend-1.onrender.com/chat";

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender === "user" ? "message-user" : "message-bot");
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage(text) {
  // Display the user's message immediately
  addMessage("user", text);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // The backend expects the key to be "message"
      body: JSON.stringify({ message: text }),
    });

    if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // The backend sends the key "response"
    const reply = data.response; 
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
  if (text) {
    sendMessage(text);
    input.value = "";
  }
});
