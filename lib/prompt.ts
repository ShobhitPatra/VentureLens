import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the client with API key from environment variable
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const analyzeStartup = async (content: string) => {
  try {
    // Validate inputs
    if (!content) {
      throw new Error("Content is too short for meaningful analysis");
    }

    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY environment variable is not set");
    }

    // Get the Gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.3,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
    });

    const prompt = `
You are an expert venture capital analyst with 15+ years of experience evaluating startups.
Your task is to analyze a startup's website content and provide a comprehensive evaluation across multiple critical dimensions.

## Analysis Framework

Evaluate the startup on the following 10 core metrics using a 1-10 scale where:
- **1-2**: Critical weaknesses, high risk
- **3-4**: Significant concerns, needs major improvement
- **5-6**: Average, meets basic standards but room for improvement
- **7-8**: Strong performance, above market standards
- **9-10**: Exceptional, best-in-class execution

## Core Evaluation Metrics

### 1. Problem-Solution Fit (Weight: 15%)
Analyze how clearly the startup identifies and articulates the problem they're solving:
- Is the problem clearly defined and significant?
- Is the solution directly addressing the core problem?
- Is there evidence of customer pain points?
- How compelling is the value proposition?

### 2. Market Opportunity (Weight: 15%)
Evaluate the market potential and sizing:
- Is the Total Addressable Market (TAM) substantial?
- Is the market growing or stable?
- Are there clear market trends supporting the opportunity?
- Is the timing right for this solution?

### 3. Business Model Viability (Weight: 12%)
Assess the revenue generation strategy:
- Is the monetization strategy clear and realistic?
- Are pricing models mentioned and reasonable?
- Is there evidence of recurring revenue potential?
- Are unit economics considerations addressed?

### 4. Competitive Positioning (Weight: 12%)
Analyze competitive landscape understanding:
- Is competitive differentiation clearly articulated?
- Are unique selling propositions (USPs) compelling?
- Is there evidence of sustainable competitive advantages?
- How does the startup position against alternatives?

### 5. Product-Market Readiness (Weight: 12%)
Evaluate product development stage and market readiness:
- Is the product clearly described with specific features?
- Is there evidence of product-market fit indicators?
- Are customer use cases and benefits well-defined?
- Is the product positioning clear and compelling?

### 6. Traction & Validation (Weight: 12%)
Look for signs of market traction and customer validation:
- Are there customer testimonials, case studies, or reviews?
- Is there evidence of user growth, revenue, or key metrics?
- Are partnerships, awards, or media mentions present?
- Is there proof of concept or pilot program success?

### 7. Team Credibility (Weight: 8%)
Assess founding team and leadership:
- Are founder backgrounds and expertise mentioned?
- Is there relevant industry experience?
- Are team qualifications aligned with the problem space?
- Is there evidence of execution capability?

### 8. Go-to-Market Strategy (Weight: 6%)
Evaluate customer acquisition and distribution approach:
- Is the target customer clearly defined?
- Are customer acquisition channels identified?
- Is there a clear path to market penetration?
- Are distribution strategies realistic and scalable?

### 9. Technology & Innovation (Weight: 4%)
Assess technological differentiation:
- Is there proprietary technology or innovation?
- Are technical capabilities clearly communicated?
- Is there evidence of R&D or IP development?
- How defensible is the technological moat?

### 10. Presentation & Communication (Weight: 4%)
Evaluate how well the startup communicates its story:
- Is the website professional and well-designed?
- Is messaging clear, concise, and compelling?
- Is information well-organized and easy to understand?
- Does the overall presentation inspire confidence?

## Analysis Instructions

1. **Read through the entire website content carefully**
2. **Score each metric from 1-10 based on evidence found**
3. **Provide 2-3 sentence explanations for each score**
4. **Calculate weighted overall score using the percentages above**
5. **Identify top 3 strengths and top 3 areas for improvement**
6. **Provide investment readiness assessment**
7. **Give actionable recommendations**

## Response Format

You MUST return ONLY a valid JSON object with this exact structure (no markdown formatting, no additional text):

{
  "overall_score": 7.2,
  "weighted_score": 7.35,
  "investment_readiness": "Series A Ready",
  "confidence_level": "High",
  "stage_assessment": "Growth Stage",
  "risk_level": "Medium",
  "core_metrics": [
    {
      "name": "Problem-Solution Fit",
      "category": "Foundation",
      "score": 8.5,
      "weight": 15,
      "weighted_contribution": 1.275,
      "percentile_rank": 85,
      "benchmark_comparison": "Above Average",
      "explanation": "Clear problem identification with compelling solution addressing real customer pain points.",
      "evidence_strength": "Strong",
      "evidence_found": ["customer testimonials", "problem statistics", "solution benefits"],
      "sub_metrics": {
        "problem_clarity": 9,
        "solution_relevance": 8,
        "value_proposition": 8
      }
    },
    {
      "name": "Market Opportunity",
      "category": "Market",
      "score": 7.0,
      "weight": 15,
      "weighted_contribution": 1.05,
      "percentile_rank": 70,
      "benchmark_comparison": "Average",
      "explanation": "Large addressable market with favorable trends, though market sizing could be more specific.",
      "evidence_strength": "Medium",
      "evidence_found": ["market trends", "industry statistics"],
      "sub_metrics": {
        "market_size": 7,
        "market_growth": 8,
        "timing": 6
      }
    },
    {
      "name": "Business Model",
      "category": "Business",
      "score": 6.0,
      "weight": 12,
      "weighted_contribution": 0.72,
      "percentile_rank": 60,
      "benchmark_comparison": "Below Average",
      "explanation": "Revenue model mentioned but lacks detailed pricing strategy and unit economics.",
      "evidence_strength": "Weak",
      "evidence_found": ["pricing page", "subscription model"],
      "sub_metrics": {
        "revenue_clarity": 6,
        "scalability": 7,
        "sustainability": 5
      }
    },
    {
      "name": "Competitive Position",
      "category": "Market",
      "score": 5.5,
      "weight": 12,
      "weighted_contribution": 0.66,
      "percentile_rank": 45,
      "benchmark_comparison": "Below Average",
      "explanation": "Some differentiation mentioned but competitive analysis is shallow.",
      "evidence_strength": "Weak",
      "evidence_found": ["feature comparisons", "unique benefits"],
      "sub_metrics": {
        "differentiation": 5,
        "competitive_moat": 4,
        "positioning": 7
      }
    },
    {
      "name": "Product Readiness",
      "category": "Product",
      "score": 8.0,
      "weight": 12,
      "weighted_contribution": 0.96,
      "percentile_rank": 80,
      "benchmark_comparison": "Above Average",
      "explanation": "Well-defined product with clear features and strong customer use cases.",
      "evidence_strength": "Strong",
      "evidence_found": ["product demo", "feature list", "customer stories"],
      "sub_metrics": {
        "feature_completeness": 8,
        "user_experience": 9,
        "product_market_fit": 7
      }
    },
    {
      "name": "Traction & Growth",
      "category": "Execution",
      "score": 7.5,
      "weight": 12,
      "weighted_contribution": 0.9,
      "percentile_rank": 75,
      "benchmark_comparison": "Above Average",
      "explanation": "Good customer testimonials and some growth metrics, but could use more specific numbers.",
      "evidence_strength": "Medium",
      "evidence_found": ["customer testimonials", "case studies", "growth metrics"],
      "sub_metrics": {
        "customer_acquisition": 7,
        "user_engagement": 8,
        "revenue_growth": 7
      }
    },
    {
      "name": "Team Quality",
      "category": "Team",
      "score": 6.5,
      "weight": 8,
      "weighted_contribution": 0.52,
      "percentile_rank": 65,
      "benchmark_comparison": "Average",
      "explanation": "Founder backgrounds mentioned but could provide more detailed expertise and track record.",
      "evidence_strength": "Medium",
      "evidence_found": ["founder bios", "team page", "advisory board"],
      "sub_metrics": {
        "founder_experience": 7,
        "team_completeness": 6,
        "advisory_strength": 6
      }
    },
    {
      "name": "Go-to-Market",
      "category": "Execution",
      "score": 5.0,
      "weight": 6,
      "weighted_contribution": 0.3,
      "percentile_rank": 50,
      "benchmark_comparison": "Below Average",
      "explanation": "Target customers identified but customer acquisition strategy needs more clarity.",
      "evidence_strength": "Weak",
      "evidence_found": ["target market description", "customer segments"],
      "sub_metrics": {
        "customer_targeting": 6,
        "acquisition_strategy": 4,
        "distribution_channels": 5
      }
    },
    {
      "name": "Technology Edge",
      "category": "Product",
      "score": 4.5,
      "weight": 4,
      "weighted_contribution": 0.18,
      "percentile_rank": 35,
      "benchmark_comparison": "Below Average",
      "explanation": "Limited evidence of proprietary technology or significant innovation differentiators.",
      "evidence_strength": "Weak",
      "evidence_found": ["technology mentions", "innovation claims"],
      "sub_metrics": {
        "technical_innovation": 4,
        "ip_protection": 3,
        "technical_moat": 6
      }
    },
    {
      "name": "Communication",
      "category": "Presentation",
      "score": 8.5,
      "weight": 4,
      "weighted_contribution": 0.34,
      "percentile_rank": 85,
      "benchmark_comparison": "Excellent",
      "explanation": "Professional website design with clear, compelling messaging and good user experience.",
      "evidence_strength": "Strong",
      "evidence_found": ["website design", "clear messaging", "user experience"],
      "sub_metrics": {
        "messaging_clarity": 9,
        "visual_presentation": 8,
        "information_organization": 8
      }
    }
  ],
  "category_scores": {
    "Foundation": 8.5,
    "Market": 6.25,
    "Business": 6.0,
    "Product": 6.25,
    "Execution": 6.25,
    "Team": 6.5,
    "Presentation": 8.5
  },
  "benchmark_data": {
    "industry_average": 6.2,
    "top_quartile_threshold": 7.5,
    "investment_ready_threshold": 7.0,
    "percentile_ranking": 72
  },
  "key_strengths": [
    "Strong product-market fit indicators with clear customer value proposition",
    "Compelling customer testimonials and evidence of early traction",
    "Professional presentation and clear communication of business model"
  ],
  "areas_for_improvement": [
    "Competitive differentiation needs stronger articulation",
    "Market sizing and go-to-market strategy require more specificity", 
    "Technology innovation and IP moat could be better highlighted"
  ],
  "investment_recommendation": {
    "summary": "Promising early-stage startup with solid fundamentals but needs refinement in competitive positioning and go-to-market execution.",
    "risk_level": "Medium",
    "funding_stage_fit": "Series A",
    "investment_score": 7.2,
    "potential_concerns": [
      "Competitive moat may not be sustainable",
      "Customer acquisition costs unclear",
      "Market timing assumptions need validation"
    ],
    "positive_indicators": [
      "Strong customer validation",
      "Clear value proposition",
      "Experienced founding team"
    ]
  },
  "actionable_recommendations": [
    "Conduct comprehensive competitive analysis and clearly articulate unique advantages",
    "Develop detailed go-to-market strategy with specific customer acquisition channels and costs",
    "Create more detailed financial projections and unit economics modeling",
    "Strengthen technology differentiation story and potential IP strategy"
  ],
  "missing_information": [
    "Financial projections and revenue model details",
    "Specific market size data and customer acquisition costs",
    "Detailed competitive landscape analysis",
    "Technology stack and IP portfolio information"
  ]
}

## Important Guidelines

- **Be objective and evidence-based** - only score based on what you can find in the content
- **Be constructive** - provide actionable feedback that helps improve the startup
- **Consider stage appropriateness** - early-stage startups may not have all information
- **Look for red flags** - unrealistic claims, poor presentation, unclear messaging
- **Identify standout elements** - exceptional execution in any area should be highlighted

---

**WEBSITE CONTENT TO ANALYZE:**

${content}`;

    // Generate content using Gemini
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const rawText = response.text();

    if (!rawText) {
      throw new Error("No content returned from Gemini API");
    }

    // Clean up the response and parse JSON
    let cleanedText = rawText.trim();

    // Remove any markdown code block formatting
    cleanedText = cleanedText.replace(/```json\n?/g, "").replace(/```\n?/g, "");

    // Remove any leading/trailing whitespace
    cleanedText = cleanedText.trim();

    // Validate that we have JSON-like content
    if (!cleanedText.startsWith("{") || !cleanedText.endsWith("}")) {
      throw new Error("Response is not in expected JSON format");
    }

    try {
      const parsedResult = JSON.parse(cleanedText);

      // Validate the response structure
      if (!parsedResult.overall_score || !parsedResult.core_metrics) {
        throw new Error("Response missing required fields");
      }

      // Add analysis metadata
      parsedResult.analysis_metadata = {
        analyzed_at: new Date().toISOString(),
        model_used: "gemini-1.5-flash",
        content_length: content.length,
      };

      return parsedResult;
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);
      console.error("Raw response:", rawText);
      throw new Error(`Failed to parse JSON response: ${parseError}`);
    }
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error);
  }
};
