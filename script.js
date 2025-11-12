import { LlmInference } from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-genai@latest';

let llm;

async function initModel() {
  // Initialize LLM inference
  llm = await LlmInference.create({
    baseOptions: {
      modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/genai/llm_inference/float32/1/llm_inference.tflite'
    }
  });
}

async function runInference(prompt) {
  if (!llm) {
    await initModel();
  }
  const result = await llm.generate({ text: prompt });
  return result.output_text;
}

document.getElementById('sendBtn').addEventListener('click', async () => {
  const userInput = document.getElementById('userInput').value;
  const output = document.getElementById('output');
  output.textContent = 'Thinking...';
  
  try {
    const reply = await runInference(userInput);
    output.textContent = reply;
  } catch (err) {
    console.error(err);
    output.textContent = 'Error running model. See console.';
  }
});
