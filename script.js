const form = document.querySelector("form");
const chatContainer = document.querySelector("#chat-container");

function addMessage(sender, text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", `message-${sender}`);
  messageDiv.textContent = text;
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function sendMessage(text) {
  addMessage("user", text);

  try {
    const response = await fetch("https://nexora-ai-backend-1.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: text })
    });

    const data = await response.json();
    const reply = data.reply || "Sorry, I couldn’t understand.";
    addMessage("bot", reply);
  } catch (error) {
    addMessage("bot", "❌ Error contacting Nexora AI backend.");
    console.error(error);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = form.querySelector("input");
  const text = input.value.trim();
  if (text !== "") {
    sendMessage(text);
    input.value = "";
  }
});
