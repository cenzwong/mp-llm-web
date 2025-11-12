import {
  FilesetResolver,
  LlmInference
} from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.13";

let llm;

async function initModel() {
  const genai = await FilesetResolver.forGenAiTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@0.10.13/wasm"
  );

  llm = await LlmInference.createFromOptions(genai, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/genai/llm_inference/text-bison@001/float32/latest/llm_inference.tflite"
    }
  });
}

async function runInference(prompt) {
  if (!llm) {
    await initModel();
  }
  const result = await llm.generate({ text: prompt });
  return result.text;
}

document.getElementById("sendBtn").addEventListener("click", async () => {
  const userInput = document.getElementById("userInput").value;
  const output = document.getElementById("output");
  output.textContent = "Thinking...";

  try {
    const reply = await runInference(userInput);
    output.textContent = reply;
  } catch (err) {
    console.error(err);
    output.textContent = "Error running model. Check console for details.";
  }
});
