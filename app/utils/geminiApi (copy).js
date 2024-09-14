// app/utils/geminiApi.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function identifyPlant(imageFile) {
  try {
    // Update the model to gemini-1.5-flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const imageParts = [
      {
        inlineData: {
          data: await fileToGenerativePart(imageFile),
          mimeType: imageFile.type,
        },
      },
    ];

    const prompt = "Identify this plant and provide its name, scientific name, and a brief description. Format the response as follows:\nName: [plant name]\nScientific Name: [scientific name]\nDescription: [brief description]";

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    // Parse the response text to extract plant information
    const lines = text.split('\n');
    const plantInfo = {
      name: lines.find(line => line.startsWith('Name:'))?.replace('Name:', '').trim() || 'Unknown',
      scientificName: lines.find(line => line.startsWith('Scientific Name:'))?.replace('Scientific Name:', '').trim() || 'Unknown',
      description: lines.find(line => line.startsWith('Description:'))?.replace('Description:', '').trim() || 'No description available',
    };

    return plantInfo;
  } catch (error) {
    console.error("Error in plant identification:", error);
    throw error;
  }
}

async function fileToGenerativePart(file) {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });
  return base64EncodedDataPromise;
}

// The rest of the app code remains the same