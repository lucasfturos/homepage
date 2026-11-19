const API_URL = "https://atlas-ai-p1ca.onrender.com";

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const chatExpand = document.getElementById("chatExpand");
const chatClose = document.getElementById("chatClose");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatBody = document.getElementById("chatBody");
const agentSelect = document.getElementById("agentSelect");
const modelInfo = document.getElementById("modelInfo");
const chatSend = document.getElementById("chatSend");

let availableProviders = {};
let conversationHistory = [];
let isLoading = false;

chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("active");
});

chatClose.addEventListener("click", () => {
    chatWindow.classList.remove("active");
});

chatExpand.addEventListener("click", () => {
    chatWindow.classList.toggle("fullscreen");

    const icon = chatExpand.querySelector("ion-icon");

    icon.name = chatWindow.classList.contains("fullscreen")
        ? "contract-outline"
        : "expand-outline";
});

document.addEventListener("keydown", (event) => {
    if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        adminLogin();
    }
});

async function adminLogin() {
    const password = window.prompt("Digite a senha administrativa:");

    if (password === null || !password.trim()) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ password }),
        });

        const data = await response.json();

        if (!response.ok || typeof data.token !== "string") {
            alert("Senha inválida ou erro na autenticação.");
            return;
        }

        sessionStorage.setItem("atlas_admin_token", data.token);

        alert("Autenticação realizada com sucesso!");
    } catch {
        alert("Não foi possível conectar ao servidor.");
    }
}

function addMessage(text, type) {
    const message = document.createElement("div");

    message.className = `chat-message ${type}`;
    message.textContent = text;

    chatBody.appendChild(message);
    chatBody.scrollTop = chatBody.scrollHeight;

    return message;
}

function getSelectedModel() {
    const modelSelect = document.getElementById("modelSelect");

    if (modelSelect) {
        return modelSelect.value;
    }

    const modelLabel = document.getElementById("modelLabel");

    return modelLabel?.textContent || "";
}

function updateModel() {
    const provider = agentSelect.value;
    const agent = availableProviders[provider];

    modelInfo.innerHTML = "Modelo: ";

    if (!agent) {
        const label = document.createElement("strong");

        label.textContent = "Indisponível";
        label.id = "modelLabel";

        modelInfo.appendChild(label);
        return;
    }

    const models = Array.isArray(agent.models) ? agent.models : [];
    const defaultModel = agent.default;

    if (models.length > 1) {
        const select = document.createElement("select");

        select.id = "modelSelect";
        select.setAttribute("aria-label", "Selecionar modelo");

        for (const model of models) {
            const option = document.createElement("option");

            option.value = model;
            option.textContent = model;

            select.appendChild(option);
        }

        select.value = defaultModel;

        if (select.selectedIndex === -1) {
            select.selectedIndex = 0;
        }

        select.disabled = isLoading;

        modelInfo.appendChild(select);
    } else {
        const label = document.createElement("strong");

        label.id = "modelLabel";
        label.textContent = models[0] || defaultModel || "Indisponível";

        modelInfo.appendChild(label);
    }
}

async function loadProviders() {
    try {
        const response = await fetch(`${API_URL}/v1/chat/models`);

        if (!response.ok) {
            throw new Error("Não foi possível carregar os agentes.");
        }

        const data = await response.json();

        if (!Array.isArray(data.providers)) {
            throw new Error("Formato de resposta inválido.");
        }

        availableProviders = Object.fromEntries(
            data.providers.map((agent) => [agent.provider, agent]),
        );

        agentSelect.innerHTML = "";

        for (const agent of data.providers) {
            const option = document.createElement("option");

            option.value = agent.provider;
            option.textContent = agent.provider;

            agentSelect.appendChild(option);
        }

        const preferredProvider = availableProviders.gemini
            ? "gemini"
            : data.providers[0]?.provider;

        if (preferredProvider) {
            agentSelect.value = preferredProvider;
        }

        updateModel();
    } catch (error) {
        modelInfo.textContent = "Modelo: Erro ao carregar";

        addMessage(
            error instanceof Error
                ? error.message
                : "Erro ao conectar com o servidor.",
            "bot",
        );
    }
}

agentSelect.addEventListener("change", updateModel);

async function sendMessage(text) {
    if (isLoading) return;

    const provider = agentSelect.value;
    const agent = availableProviders[provider];
    const model = getSelectedModel();

    if (!agent) {
        addMessage("Agente indisponível.", "bot");
        return;
    }

    if (!model) {
        addMessage("Modelo indisponível.", "bot");
        return;
    }

    isLoading = true;
    chatSend.disabled = true;
    chatInput.disabled = true;
    agentSelect.disabled = true;

    const modelSelect = document.getElementById("modelSelect");

    if (modelSelect) {
        modelSelect.disabled = true;
    }

    addMessage(text, "user");

    const loadingMessage = addMessage("Pensando...", "bot");

    const messages = [
        ...conversationHistory,
        {
            role: "user",
            content: text,
        },
    ].slice(-12);

    try {
        const token = sessionStorage.getItem("atlas_admin_token");

        const headers = {
            "Content-Type": "application/json",
        };

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(`${API_URL}/v1/chat`, {
            method: "POST",
            headers,
            body: JSON.stringify({
                provider,
                model,
                messages,
            }),
        });

        const data = await response.json();

        loadingMessage.remove();

        if (!response.ok) {
            const errorMessage =
                data.error || "Não foi possível obter uma resposta.";

            addMessage(
                response.status === 429
                    ? `Limite de utilização atingido: ${errorMessage}`
                    : errorMessage,
                "bot",
            );

            return;
        }

        const output = data.message?.content;

        if (typeof output !== "string" || !output.trim()) {
            throw new Error("A API retornou uma resposta vazia.");
        }

        addMessage(output, "bot");

        conversationHistory = [
            ...messages,
            {
                role: "assistant",
                content: output,
            },
        ].slice(-12);
    } catch (error) {
        loadingMessage.remove();

        addMessage(
            error instanceof Error
                ? error.message
                : "Erro de comunicação com o Atlas AI.",
            "bot",
        );
    } finally {
        isLoading = false;
        chatSend.disabled = false;
        chatInput.disabled = false;
        agentSelect.disabled = false;

        updateModel();

        chatInput.focus();
    }
}

chatForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const text = chatInput.value.trim();

    if (!text || isLoading) return;

    chatInput.value = "";

    await sendMessage(text);
});

loadProviders();
