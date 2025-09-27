export const parseResponse = (rawText: string) => {
  try {
    if (!rawText || typeof rawText !== "string") {
      throw new Error("Invalid input: rawText must be a non-empty string");
    }

    console.log("Raw response length:", rawText.length);
    console.log("Raw response preview:", rawText.substring(0, 200));
    console.log("Raw response ending:", rawText.slice(-100));

    // Start with the raw text
    let cleanedText = rawText.trim();

    // Remove markdown code block formatting more thoroughly
    cleanedText = cleanedText.replace(/```json\s*/gi, "");
    cleanedText = cleanedText.replace(/```\s*/g, "");
    cleanedText = cleanedText.replace(/^```|```$/g, "");
    cleanedText = cleanedText.trim();

    // Extract JSON from the text - be more aggressive
    let jsonText = cleanedText;

    // Find the start of JSON
    const jsonStart = cleanedText.indexOf("{");
    if (jsonStart !== -1) {
      jsonText = cleanedText.substring(jsonStart);
    }

    console.log("Extracted JSON length:", jsonText.length);
    console.log("Extracted JSON preview:", jsonText.substring(0, 300));

    // Count braces to detect truncation
    const openBraces = (jsonText.match(/\{/g) || []).length;
    const closeBraces = (jsonText.match(/\}/g) || []).length;

    console.log(`Brace count - Open: ${openBraces}, Close: ${closeBraces}`);

    // If truncated, try to salvage the JSON
    if (openBraces > closeBraces) {
      console.warn("JSON appears truncated, attempting to fix...");

      // Remove incomplete trailing content
      let fixedJson = jsonText;

      // Find the last complete property
      const lastCommaIndex = fixedJson.lastIndexOf(",");
      const lastColonIndex = fixedJson.lastIndexOf(":");
      const lastQuoteIndex = fixedJson.lastIndexOf('"');

      console.log(
        `Last indices - Comma: ${lastCommaIndex}, Colon: ${lastColonIndex}, Quote: ${lastQuoteIndex}`
      );

      // If we have an incomplete property (colon after last comma), remove it
      if (lastColonIndex > lastCommaIndex) {
        // Find the start of this incomplete property
        const propertyStart = fixedJson.lastIndexOf('"', lastColonIndex - 1);
        const beforePropertyStart = fixedJson.lastIndexOf(
          '"',
          propertyStart - 1
        );
        const commaBeforeProperty = fixedJson.lastIndexOf(",", propertyStart);

        if (commaBeforeProperty !== -1) {
          fixedJson = fixedJson.substring(0, commaBeforeProperty);
          console.log("Removed incomplete property after comma");
        } else {
          // This might be the first property, try to find opening brace
          const openBrace = fixedJson.lastIndexOf("{", propertyStart);
          if (openBrace !== -1) {
            fixedJson = fixedJson.substring(0, openBrace + 1);
            console.log("Removed incomplete first property");
          }
        }
      }

      // Clean up any trailing commas
      fixedJson = fixedJson.replace(/,\s*$/, "");

      // Add missing closing braces
      const remainingOpen = (fixedJson.match(/\{/g) || []).length;
      const remainingClose = (fixedJson.match(/\}/g) || []).length;
      const missingBraces = remainingOpen - remainingClose;

      if (missingBraces > 0) {
        fixedJson += "}".repeat(missingBraces);
        console.log(`Added ${missingBraces} closing braces`);
      }

      jsonText = fixedJson;
    }

    console.log("Final JSON to parse:", jsonText);

    // Try parsing
    let parsedResult;

    try {
      parsedResult = JSON.parse(jsonText);
      console.log("JSON parsing successful!");
    } catch (parseError: any) {
      console.error("Parse error details:", parseError.message);
      console.error(
        "Position of error:",
        parseError.message.match(/position (\d+)/)?.[1]
      );

      // Last resort: try to create a minimal valid response
      console.log("Attempting minimal recovery...");

      try {
        // Extract what we can and create a basic structure
        const scoreMatch = jsonText.match(/"overall_score":\s*([\d.]+)/);
        const investmentMatch = jsonText.match(
          /"investment_readiness":\s*"([^"]+)"/
        );
        const confidenceMatch = jsonText.match(
          /"confidence_level":\s*"([^"]+)"/
        );

        const recoveredData: any = {
          overall_score: scoreMatch ? parseFloat(scoreMatch[1]) : 0,
          investment_readiness: investmentMatch
            ? investmentMatch[1]
            : "Unknown",
          confidence_level: confidenceMatch ? confidenceMatch[1] : "Low",
          core_metrics: {
            market_size: 0,
            competition: 0,
            team_strength: 0,
            product_viability: 0,
          },
          parsing_note: "Response was truncated and partially recovered",
        };

        console.log("Recovered minimal data:", recoveredData);
        return recoveredData;
      } catch (recoveryError) {
        throw new Error(`Complete parsing failure: ${parseError.message}`);
      }
    }

    // Validate that we got an object
    if (
      typeof parsedResult !== "object" ||
      parsedResult === null ||
      Array.isArray(parsedResult)
    ) {
      throw new Error("Parsed result is not a valid object");
    }

    // Check for required fields
    const requiredFields = [
      "overall_score",
      "core_metrics",
      "investment_readiness",
    ];

    const missingFields = [];
    for (const field of requiredFields) {
      if (!(field in parsedResult)) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      console.warn(`Missing required fields: ${missingFields.join(", ")}`);
    }

    console.log("Successfully parsed complete response");
    return parsedResult;
  } catch (error: any) {
    console.error("Parse function error:", error);

    // Provide more context in the error message
    const errorMessage = error.message || "Unknown parsing error";
    const preview = rawText ? rawText.substring(0, 200) + "..." : "No content";

    throw new Error(
      `Failed to parse Gemini response: ${errorMessage}. Content preview: ${preview}`
    );
  }
};
