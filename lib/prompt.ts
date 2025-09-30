// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { generatePrompt } from "./default";
// import { parseResponse } from "./parseLlmResponse";
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// export const analyzeStartup = async (content: string) => {
//   try {
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//       generationConfig: {
//         temperature: 0.3,
//         topK: 40,
//         topP: 0.95,
//         maxOutputTokens: 8192,
//       },
//     });

//     const prompt = `${generatePrompt(content)}

// CRITICAL INSTRUCTIONS:
// 1. Your response MUST be valid, complete JSON
// 2. Do NOT include any text before or after the JSON
// 3. Ensure all strings are properly quoted
// 4. Ensure all objects are properly closed with '}'
// 5. Do not truncate your response - complete all fields
// 6. If you approach token limits, prioritize completing the JSON structure over additional details

// Example expected format:
// {
//   "overall_score": 7.2,
//   "core_metrics": {...},
//   "investment_readiness": {...}
// }`;

//     console.log("Making request to Gemini...");
//     try {
//       const result = await model.generateContentStream(prompt);
//       let fullResponse = "";

//       for await (const chunk of result.stream) {
//         const chunkText = chunk.text();
//         fullResponse += chunkText;
//         console.log("Received chunk of length:", chunkText.length);
//       }

//       console.log("Full streaming response length:", fullResponse.length);
//       console.log("Full streaming response ending:", fullResponse.slice(-100));

//       if (!fullResponse.trim()) {
//         throw new Error("Empty response from streaming");
//       }

//       return parseResponse(fullResponse);
//     } catch (streamError) {
//       console.warn("Streaming failed, trying regular generation:", streamError);

//       // Fallback to regular generation
//       const result = await model.generateContent(prompt);
//       const response = await result.response;
//       const rawText = response.text();

//       console.log("Regular response length:", rawText.length);
//       console.log(
//         "Finish reason:",
//         result.response.candidates?.[0]?.finishReason
//       );

//       if (!rawText) {
//         throw new Error("No content returned from Gemini API");
//       }

//       // Check if response was truncated
//       if (result.response.candidates?.[0]?.finishReason === "MAX_TOKENS") {
//         console.warn("Response was truncated due to max tokens limit");
//       }

//       return parseResponse(rawText);
//     }
//   } catch (error) {
//     console.error("Gemini API Error:", error);
//     throw new Error("Gemini API Error:");
//   }
// };

import { GoogleGenerativeAI } from "@google/generative-ai";
import { generatePrompt } from "./default";
import { parseResponse } from "./parseLlmResponse";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const analyzeStartup = async (content: string) => {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-exp", // Updated model
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 8192,
        responseMimeType: "application/json", // CRITICAL: Force JSON response
      },
    });

    const prompt = `${generatePrompt(content)}

CRITICAL INSTRUCTIONS:
1. Your response MUST be valid, complete JSON
2. Do NOT include any text before or after the JSON
3. Ensure all strings are properly quoted
4. Ensure all objects are properly closed with '}'
5. Do not truncate your response - complete all fields
6. If you approach token limits, prioritize completing the JSON structure over additional details

Example expected format:
{
  "overall_score": 7.2,
  "core_metrics": {...},
  "investment_readiness": {...}
}`;

    console.log("Making request to Gemini...");

    // Use regular generateContent instead of streaming
    // Streaming can have unpredictable truncation issues
    const result = await model.generateContent(prompt);
    const response = result.response;

    // Check finish reason FIRST
    const finishReason = response.candidates?.[0]?.finishReason;
    console.log("Finish reason:", finishReason);

    if (finishReason === "MAX_TOKENS") {
      console.error("Response was truncated due to MAX_TOKENS");
      throw new Error(
        "Response truncated: Increase maxOutputTokens or simplify prompt"
      );
    }

    if (finishReason === "SAFETY") {
      console.error("Response blocked by safety filters");
      throw new Error("Response blocked by safety filters");
    }

    if (finishReason !== "STOP" && finishReason !== undefined) {
      console.warn(`Unexpected finish reason: ${finishReason}`);
    }

    const rawText = response.text();
    console.log("Response length:", rawText.length);
    console.log("Response preview:", rawText.substring(0, 200));
    console.log("Response ending:", rawText.slice(-100));

    if (!rawText || rawText.trim().length === 0) {
      throw new Error("Empty response from Gemini API");
    }

    // Parse the response
    const parsedResult = parseResponse(rawText);

    if (parsedResult === null) {
      throw new Error(
        "Failed to parse Gemini response - JSON was invalid or incomplete"
      );
    }

    console.log("Successfully parsed response");
    return parsedResult;
  } catch (error) {
    console.error("Gemini API Error:", error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("truncated")) {
        throw new Error(
          "API response was truncated. Please try again or simplify your input."
        );
      }
      if (error.message.includes("safety")) {
        throw new Error(
          "Content was blocked by safety filters. Please modify your input."
        );
      }
      throw error;
    }

    throw new Error("Failed to analyze startup. Please try again.");
  }
};
