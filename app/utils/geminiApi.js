// app/utils/geminiApi.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function identifyPlant(imageFile) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageParts = [
      {
        inlineData: {
          data: await fileToGenerativePart(imageFile),
          mimeType: imageFile.type,
        },
      },
    ];

    const prompt = `
      Identify this plant and provide the following information:
      - Name
      - Scientific Name
      - Description
      - Origin
      - Growing Conditions
      - Uses
      - Interesting Facts

      Format the response as a JSON object with these keys.
    `;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    // Extract JSON from the formatted string
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
    if (jsonMatch && jsonMatch[1]) {
      const jsonString = jsonMatch[1];
      const plantInfo = JSON.parse(jsonString);
      return plantInfo;
    } else {
      // If JSON parsing fails, return a structured object based on the text
      return parseUnstructuredText(text);
    }
  } catch (error) {
    console.error("Error in plant identification:", error);
    throw error;
  }
}

function parseUnstructuredText(text) {
  const lines = text.split('\n');
  const plantInfo = {};
  let currentKey = '';

  for (const line of lines) {
    if (line.includes(':')) {
      const [key, value] = line.split(':');
      currentKey = key.trim();
      plantInfo[currentKey] = value.trim();
    } else if (currentKey && line.trim()) {
      plantInfo[currentKey] += ' ' + line.trim();
    }
  }

  return plantInfo;
}

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return base64EncodedDataPromise;
}