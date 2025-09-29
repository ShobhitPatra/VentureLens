"use client";
import { useState, useEffect } from "react";
import { Mic, MicOff, Volume2, Loader2, MessageCircle, X } from "lucide-react";

// TypeScript interfaces
interface ConversationMessage {
  type: "user" | "assistant";
  text: string;
  timestamp: Date;
}

const VoiceQAAssistant = ({ report }) => {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [vapiClient, setVapiClient] = useState<any>(null); // Vapi type
  const [error, setError] = useState<string | null>(null);

  // Initialize VAPI
  useEffect(() => {
    const initVapi = async () => {
      try {
        setIsInitializing(true);
        const { default: Vapi } = await import("@vapi-ai/web");
        const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY!);

        // Call started
        vapi.on("call-start", () => {
          console.log("Voice call started");
          setIsListening(true);
          setIsConnecting(false); // Stop loading
          setError(null);
        });

        // Call ended
        vapi.on("call-end", () => {
          console.log("Voice call ended");
          setIsListening(false);
          setIsSpeaking(false);
          setIsConnecting(false); // Stop loading if somehow still true
        });

        // AI started speaking
        vapi.on("speech-start", () => {
          setIsSpeaking(true);
        });

        // AI stopped speaking
        vapi.on("speech-end", () => {
          setIsSpeaking(false);
        });

        // Transcript received (what user said)
        vapi.on("message", (message) => {
          console.log("Message:", message);

          // User's speech transcribed
          if (
            message.type === "transcript" &&
            message.transcriptType === "final"
          ) {
            const userText = message.transcript;
            setCurrentQuestion(userText);

            setConversation((prev) => [
              ...prev,
              {
                type: "user",
                text: userText,
                timestamp: new Date(),
              },
            ]);
          }

          // Assistant's response
          if (message.type === "transcript" && message.role === "assistant") {
            const aiText = message.transcript;
            setCurrentAnswer(aiText);

            setConversation((prev) => [
              ...prev,
              {
                type: "assistant",
                text: aiText,
                timestamp: new Date(),
              },
            ]);
          }
        });

        vapi.on("error", (error) => {
          console.error("VAPI error:", error);
          setError("Voice assistant error. Please try again.");
          setIsListening(false);
          setIsConnecting(false); // Stop loading on error
        });

        setVapiClient(vapi);
        setIsInitializing(false);
      } catch (err) {
        console.error("Failed to initialize VAPI:", err);
        setError("Failed to load voice assistant. Check API key.");
        setIsInitializing(false);
      }
    };

    initVapi();

    return () => {
      if (vapiClient) {
        vapiClient.stop();
      }
    };
  }, []);

  // Start voice conversation
  const startVoiceChat = async () => {
    if (!vapiClient || !report) return;

    try {
      setIsConnecting(true); // Start loading
      setError(null);

      // VAPI handles EVERYTHING - no backend needed!
      await vapiClient.start({
        // Assistant configuration
        transcriber: {
          provider: "deepgram",
          model: "nova-2",
          language: "en-US",
        },
        model: {
          provider: "openai",
          model: "gpt-4-turbo",
          messages: [
            {
              role: "system",
              content: `You are an expert investment analyst AI for VentureLens. 
You help investors understand startup analysis reports through natural voice conversation.

YOUR ROLE:
- Answer questions about the startup report data provided below
- Be conversational and concise (20-30 seconds max per response)
- Reference specific numbers and data points
- Use professional VC terminology naturally
- Explain WHY scores are what they are
- Provide actionable insights

CONVERSATION STYLE:
- Natural voice (not formal writing)
- Direct answers (no "Based on the report...")
- Specific and data-driven
- Helpful and insightful

COMPLETE STARTUP REPORT DATA:
${JSON.stringify(report, null, 2)}

QUICK REFERENCE (most commonly asked):
- Overall Score: ${report.overall_score}/10
- Investment Readiness: ${report.investment_readiness}
- Risk Level: ${report.risk_level}
- Recommendation: ${report.investment_recommendation.recommendation}
- Top Strength: ${report.key_strengths[0]}
- Top Risk: ${report.areas_for_improvement[0]}
- Funding Estimate: ${report.funding_estimate}
- Runway: ${report.financial_projections.runway_months} months

EXAMPLE Q&A PATTERNS:

Q: "Why is the score ${report.overall_score}?"
A: "The ${report.overall_score} reflects ${
                report.overall_score >= 7
                  ? "strong potential with some gaps"
                  : report.overall_score >= 6
                  ? "solid fundamentals needing key improvements"
                  : "significant challenges to address"
              }. The strongest metrics are ${
                report.core_metrics
                  .filter((m) => m.score >= 7)
                  .slice(0, 2)
                  .map((m) => m.name)
                  .join(" and ") || "product and presentation"
              } scoring above 7. However, ${
                report.core_metrics
                  .filter((m) => m.score < 5)
                  .slice(0, 1)
                  .map((m) => m.name)[0] || "competitive positioning"
              } needs significant work."

Q: "Should I invest?"
A: "With ${report.risk_level.toLowerCase()} risk and a ${
                report.overall_score
              } score, my recommendation is: ${
                report.investment_recommendation.summary
              } The decision comes down to whether you're comfortable with ${report.areas_for_improvement[0].toLowerCase()}."

Q: "What are the biggest risks?"
A: "The top three risks are: ${report.areas_for_improvement
                .slice(0, 3)
                .join(", ")}. The overall risk score is ${
                report.risk_assessment.overall_risk_score
              } out of 10, which is ${
                report.risk_assessment.overall_risk_score >= 7
                  ? "high"
                  : report.risk_assessment.overall_risk_score >= 5
                  ? "moderate"
                  : "manageable"
              }."

Q: "How's the market?"
A: "The total addressable market is ${(
                report.market_analysis.tam_size / 1000000000
              ).toFixed(1)} billion dollars, growing at ${
                report.market_analysis.market_growth_rate
              }% annually. The market is ${report.market_analysis.market_maturity.toLowerCase()}, which ${
                report.market_analysis.market_maturity === "Emerging"
                  ? "means early mover advantage but higher uncertainty"
                  : "provides stability but more competition"
              }."

Q: "Tell me about financials"
A: "Currently at ${
                report.financial_projections.current_revenue
              } million in revenue, projected to reach ${
                report.financial_projections.projected_revenue_y5
              } million by year 5. They have ${
                report.financial_projections.runway_months
              } months of runway with a ${Math.abs(
                report.financial_projections.burn_rate
              )} million per month burn rate. Valuation estimate is ${
                report.financial_projections.valuation_estimate
              } million."

Now answer user questions naturally using the full report data above!`,
            },
          ],
        },
        voice: {
          provider: "11labs",
          voiceId: "21m00Tcm4TlvDq8ikWAM", // Professional voice
        },
        // First message when call starts
        firstMessage:
          "Hi! I've analyzed this startup. Ask me anything - why the score is what it is, what the risks are, or whether you should invest.",
      });
    } catch (err) {
      console.error("Failed to start:", err);
      setError("Couldn't start voice assistant. Try again.");
      setIsConnecting(false); // Stop loading on error
    }
  };

  // Stop voice conversation
  const stopVoiceChat = () => {
    if (vapiClient) {
      vapiClient.stop();
    }
  };

  if (!report) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 flex items-center">
            Ask AI Analyst About This Startup
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Voice-powered Q&A - Click mic to start talking
          </p>
        </div>
      </div>

      {/* Main Voice Interface */}
      <div className="flex flex-col items-center space-y-6">
        {/* Big Voice Button */}
        <div className="relative">
          <button
            onClick={isListening ? stopVoiceChat : startVoiceChat}
            disabled={isInitializing || !vapiClient || isConnecting}
            className={`relative w-34 h-34 rounded-full flex items-center justify-center transition-all transform hover:scale-105 ${
              isConnecting
                ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-2xl shadow-amber-300"
                : isListening
                ? "bg-gradient-to-br from-red-500 to-red-600 shadow-2xl shadow-red-300"
                : "bg-gradient-to-br from-red-500 to-orange-400 shadow-xl shadow-purple-300"
            } ${
              isInitializing || !vapiClient || isConnecting ? "cursor-wait" : ""
            }`}
          >
            {isInitializing ? (
              <Loader2 className="w-12 h-12 text-white animate-spin" />
            ) : isConnecting ? (
              <>
                <Loader2 className="w-12 h-12 text-white animate-spin" />
              </>
            ) : isListening ? (
              <MicOff className="w-12 h-12 text-white" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}

            {/* Animated pulse when listening */}
            {isListening && !isConnecting && (
              <>
                <span className="absolute inset-0 rounded-full bg-red-400 animate-ping opacity-75" />
                <span className="absolute -inset-3 rounded-full bg-red-300 animate-pulse opacity-50" />
              </>
            )}

            {/* Animated pulse when connecting */}
            {isConnecting && (
              <>
                <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-75" />
                <span className="absolute -inset-3 rounded-full bg-amber-300 animate-pulse opacity-50" />
              </>
            )}
          </button>

          {/* Connecting indicator */}
          {isConnecting && (
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-amber-100 px-4 py-2 rounded-full">
              <Loader2 className="w-4 h-4 text-amber-600 animate-spin" />
              <span className="text-xs font-medium text-amber-800">
                Getting ready...
              </span>
            </div>
          )}

          {/* Speaking indicator */}
          {isSpeaking && !isConnecting && (
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full">
              <Volume2 className="w-4 h-4 text-purple-600 animate-pulse" />
              <div className="flex space-x-1">
                <div
                  className="w-1 h-4 bg-purple-600 rounded animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <div
                  className="w-1 h-4 bg-purple-600 rounded animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <div
                  className="w-1 h-4 bg-purple-600 rounded animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Status Text */}
        <div className="text-center">
          <p className="text-lg font-semibold text-gray-900">
            {isInitializing
              ? "Loading voice assistant..."
              : isConnecting
              ? "Connecting to AI analyst..."
              : isListening
              ? isSpeaking
                ? "Venture Expert is answering..."
                : "I'm listening... speak now!"
              : "Click microphone to start"}
          </p>
          {isConnecting && (
            <p className="text-sm text-amber-600 mt-2">
              Analyzing report context... this takes a few seconds
            </p>
          )}
          {error && (
            <p className="text-sm text-red-600 mt-2 flex items-center justify-center">
              <X className="w-4 h-4 mr-1" />
              {error}
            </p>
          )}
        </div>

        {/* Example Questions */}
        <div className="w-full bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-100">
          <p className="text-sm font-semibold text-purple-900 mb-4 text-center">
            Try asking these questions:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              `"Why is the score ${report.overall_score}?"`,
              `"What are the biggest risks?"`,
              `"Should I invest in this?"`,
              `"How's the market opportunity?"`,
              `"What's the competitive advantage?"`,
              `"Tell me about the financials"`,
            ].map((question, idx) => (
              <div
                key={idx}
                className="bg-white p-3 rounded-lg border border-purple-100 text-sm text-gray-700 hover:border-purple-300 transition-colors"
              >
                {question}
              </div>
            ))}
          </div>
        </div>

        {/* Live Transcript */}
        {currentQuestion && (
          <div className="w-full bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-xs font-semibold text-blue-600 mb-1">
              You asked:
            </p>
            <p className="text-sm text-blue-900">{currentQuestion}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnecting
                  ? "bg-amber-500 animate-pulse"
                  : isListening
                  ? "bg-red-500 animate-pulse"
                  : "bg-green-500"
              }`}
            />
            <span>
              {isConnecting
                ? "Connecting..."
                : isListening
                ? "Active"
                : "Ready"}
            </span>
          </div>
          <span>Powered by VAPI + GPT-4</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceQAAssistant;
