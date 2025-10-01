# **VentureLens**

From Startup URL to Investment Decision in 30 Seconds

## **Problem**

- **Manual due diligence is killing deal flow** – VCs and angel investors spend 10–15 hours per startup on initial screening, manually researching websites, analyzing market positioning, and evaluating team credentials. This bottleneck means promising startups get overlooked and investors miss opportunities.
- **Inconsistent evaluation frameworks** – Investment decisions rely on subjective gut feelings rather than systematic analysis, leading to missed red flags and inconsistent portfolio decisions.
- **Information overload** – Startup websites contain valuable signals, but extracting and synthesizing this data into actionable investment intelligence requires extensive manual work.

## **How the app works**

- **URL input** triggers automated AI-powered startup analysis pipeline
- **Intelligent data orchestration**:
  - Crawls and extracts complete startup website content using Firecrawl with markdown conversion
  - Analyzes 10+ critical investment dimensions using Gemini AI with structured evaluation frameworks
  - Applies professional VC methodology with weighted scoring across problem-solution fit, market opportunity, competitive positioning, and financial viability
  - Generates comprehensive investment reports with risk assessment, financial projections, and strategic recommendations
- **Interactive voice-powered Q&A** – Ask questions about the report using natural language and receive instant AI analyst responses
- **Real-time dashboard** – Professional McKinsey-style visualizations with radar charts, financial projections, and competitive intelligence matrices
- **Report history & persistence** – All analyses saved to database with user authentication and report management

## **Notable features**

- **Voice-powered AI analyst** – VAPI integration enables natural voice conversations about startup reports – ask _"Why is the score 6.8?"_ or _"Should I invest?"_ and receive instant spoken analysis
- **Professional VC framework** – Evaluates 10 weighted dimensions:
  - Problem-solution fit (15%)
  - Market opportunity (15%)
  - Business model (12%)
  - Competitive positioning (12%)
  - Product readiness (12%)
  - Traction (12%)
  - Team credibility (8%)
  - Go-to-market (6%)
  - Technology (4%)
  - Presentation (4%)
- **Comprehensive risk assessment** – Probability vs impact matrix with mitigation strategies across market, execution, financial, technology, and regulatory risks
- **5-year financial modeling** – Revenue projections, burn rate analysis, cash runway calculations, and valuation scenarios with multiple outcome modeling
- **Competitive intelligence** – Market positioning analysis, TAM/SAM/SOM breakdown, and competitive landscape mapping
- **Strategic action plan** – Prioritized recommendations with impact vs effort analysis and 90-day execution roadmap
- **Authentication & data persistence** – Better Auth integration with Convex database for secure user management and report history
- **Real-time analysis tracking** – Live progress indicators showing crawling, analysis, and report generation stages

## **Why did you build this**

- **Democratize VC intelligence** – Make professional-grade startup analysis accessible to angel investors, venture scouts, and founders preparing for fundraising
- **Speed without sacrificing depth** – Reduce initial screening from hours to seconds while maintaining analytical rigor
- **Data-driven decision making** – Replace gut feelings with systematic, repeatable evaluation frameworks that surface hidden risks and opportunities
- **Voice-first future** – Natural language interfaces make investment intelligence more accessible and intuitive than traditional dashboards

## **Modern Stack cohost(s) included**

- **Convex** – Real-time database with serverless functions for user management, report storage, and data persistence with instant synchronization
- **Better Auth** – Modern authentication with GitHub and Google OAuth for seamless user onboarding
- **VAPI** – Voice AI platform enabling natural spoken conversations with GPT-4 about investment reports
- **Firecrawl** – Intelligent web scraping with markdown extraction for comprehensive startup website analysis

## **Tech stack list**

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- **Backend**: Convex (serverless functions, real-time database, authentication)
- **AI/ML**: Google Gemini AI (startup analysis), OpenAI GPT-4 (voice Q&A), structured output with JSON schemas
- **Voice AI**: VAPI (speech-to-text via Deepgram, text-to-speech via 11Labs, conversational AI)
- **Data Sources**: Firecrawl web scraping with markdown conversion
- **Charts & Visualizations**: Recharts (radar charts, financial projections, risk matrices, competitive positioning)
- **Authentication**: Better Auth with OAuth providers (GitHub, Google)
- **UI Components**: Lucide React icons, custom gradient designs, animated loading states
- **Deployment**: Vercel (frontend), Convex cloud (backend + database)

## **Key differentiators**

- **Only investment analysis tool with voice AI** – Natural spoken conversations about reports set it apart from static dashboards
- **Real-time collaborative intelligence** – Convex enables instant report updates and sharing across investment teams
- **Comprehensive yet instant** – Full VC-grade analysis in 30 seconds vs hours of manual research
- **Founder-friendly** – Startups can use it to understand how investors will evaluate them and strengthen pitch decks

## **Demo highlights**

1. **Paste any startup URL** – e.g., *https://example.com*
2. **Watch AI analyze in real-time** – Progress indicators show crawling → analysis → report generation
3. **Explore interactive dashboard** – Radar charts, financial projections, risk matrices
4. **Ask questions with voice** – Click mic, ask _"Should I invest?"_, hear AI analyst respond
5. **View saved reports** – Full history with timestamps and comparative analysis

## **Impact & use cases**

- **Angel investors** – Screen 10x more deals with consistent evaluation criteria
- **Venture scouts** – Provide portfolio companies with instant preliminary analysis
- **Startup founders** – Understand investor perspective before fundraising and identify weaknesses
- **Corporate VCs** – Standardize initial screening process across innovation teams
- **Accelerator programs** – Evaluate hundreds of applicants systematically

## **What's next**

- **Comparative analysis** – Side-by-side startup comparison with differential scoring
- **Portfolio tracking** – Monitor multiple startups with automated score updates when websites change
- **API access** – Enable integration with CRM tools like Affinity and Attio
- **Team collaboration** – Shared reports with commenting and decision tracking
- **Custom evaluation frameworks** – Allow investors to adjust scoring weights based on thesis
