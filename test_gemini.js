
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyCPnq3j6yZ_rOmz2FWEK2-u1129uamoEZ4";
const genAI = new GoogleGenerativeAI(apiKey);

async function testGeminiPro() {
    try {
        console.log(`Testing model: gemini-pro...`);
        // Note: sending systemInstruction to gemini-pro might fail or be ignored in some versions, 
        // but here we just test generation.
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent("Hello");
        const response = await result.response;
        console.log(`SUCCESS: gemini-pro works. Response:`, response.text());
    } catch (error) {
        console.log(`FAILED: gemini-pro. Error: ${error.message}`);
    }
}

testGeminiPro();
