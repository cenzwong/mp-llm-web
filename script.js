// script.js

// Import the MediaPipe Tasks-GenAI modules via CDN (no build tool required)
import {
  FilesetResolver,
  LlmInference
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@latest";

// Reference to the LLM
let llm = null;

/**
 * Initialize the LLM model.
 */
async function initModel() {
  // Load the WASM files for GenAI tasks
  const genai = await FilesetResolver.forGenAiTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@latest/wasm"
  );

  // Create the LLM inference object with desired options
  llm = await LlmInference.createFromOptions(genai, {
    baseOptions: {
      modelAssetPath: "./assets/your_model_file.litertlm"  // **<– update this path**
    },
    maxTokens: 1000,
    topK: 40,
    temperature: 0.8,
    randomSeed: 101
  });
}

/**
 * Run inference with the given prompt.
 * @param {string} prompt
 * @returns {Promise<string>} Generated response text.
 */
async function runInference(prompt) {
  if (!llm) {
    await initModel();
  }
  // Use the API to generate a response.
  const result = await llm.generateResponse(prompt);
  return result;  // the API returns a simple string for web
}

// Set up event listener for button click
document.getElementById("sendBtn").addEventListener("click", async () => {
  const userInputEl = document.getElementById("userInput");
  const outputEl = document.getElementById("output");
  const prompt = userInputEl.value.trim();
  if (!prompt) {
    outputEl.textContent = "Please enter a prompt.";
    return;
  }
  outputEl.textContent = "Thinking…";

  try {
    const reply = await runInference(prompt);
    outputEl.textContent = reply;
  } catch (err) {
    console.error("LLM inference error:", err);
    outputEl.textContent = "Error running model. See console for details.";
  }
});
