const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatExpand = document.getElementById("chatExpand");
const chatClose = document.getElementById("chatClose");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");
const agentSelect = document.getElementById("agentSelect");
const modelLabel = document.getElementById("modelLabel");

chatToggle.onclick = () => {
    chatWindow.classList.toggle("active");
};

chatClose.onclick = () => {
    chatWindow.classList.remove("active");
};

chatForm.onsubmit = (e) => {
    e.preventDefault();
    const text = chatInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    chatInput.value = "";

    setTimeout(() => {
        addMessage("Vou dormir", "bot");
    }, 600);
};

chatExpand.onclick = () => {
    chatWindow.classList.toggle("fullscreen");

    const icon = chatExpand.querySelector("ion-icon");
    icon.name = chatWindow.classList.contains("fullscreen")
        ? "contract-outline"
        : "expand-outline";
};

const agents = {
    openai: {
        name: "OpenAI",
        model: "gpt-4o-mini",
    },
    gemini: {
        name: "Gemini",
        model: "gemini-3-flash-preview",
    },
};

function updateModel() {
    const agent = agents[agentSelect.value];
    modelLabel.textContent = agent.model;
}

agentSelect.onchange = updateModel;

updateModel();

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `chat-message ${type}`;
    msg.textContent = text;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
}
