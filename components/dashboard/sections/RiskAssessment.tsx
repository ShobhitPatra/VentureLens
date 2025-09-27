"use client";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ComposedChart,
  Area,
  ReferenceLine,
} from "recharts";
import {
  AlertTriangle,
  Shield,
  TrendingDown,
  Eye,
  Lock,
  DollarSign,
  Users,
  Zap,
  FileText,
  Clock,
} from "lucide-react";

const RiskAssessment = ({ report }) => {
  // Risk matrix data for probability vs impact visualization
  const riskMatrixData = report.risk_assessment.risk_factors.map((risk) => ({
    ...risk,
    risk_score: (risk.probability * risk.impact) / 100,
    mitigation_effectiveness: risk.mitigation_score / 10,
  }));

  // Time-based risk evolution derived from actual risk factors and company stage
  const generateRiskEvolution = () => {
    const baseRisks = {};
    report.risk_assessment.risk_factors.forEach((risk) => {
      const category = risk.category.replace(" Risk", "").toLowerCase();
      baseRisks[`${category}_risk`] = (risk.probability * risk.impact) / 100;
    });

    // Create evolution based on company stage and runway
    const stageMultipliers = {
      "Pre-Seed": {
        market: 1.2,
        execution: 1.3,
        financial: 1.1,
        technology: 0.9,
        regulatory: 0.8,
      },
      Seed: {
        market: 1.0,
        execution: 1.0,
        financial: 1.0,
        technology: 1.0,
        regulatory: 1.0,
      },
      "Series A": {
        market: 0.8,
        execution: 0.7,
        financial: 0.9,
        technology: 1.1,
        regulatory: 1.2,
      },
    };

    const multiplier =
      stageMultipliers[report.company_stage] || stageMultipliers["Seed"];
    const runwayFactor = Math.max(
      0.5,
      report.financial_projections.runway_months / 24
    );

    return [
      {
        timeline: "Current",
        market_risk: (baseRisks.market_risk || 5) * multiplier.market,
        execution_risk:
          (baseRisks.execution_risk || 4.5) * multiplier.execution,
        financial_risk:
          (baseRisks.financial_risk || 6) *
          multiplier.financial *
          (2 - runwayFactor),
        technology_risk:
          (baseRisks.technology_risk || 3) * multiplier.technology,
        regulatory_risk:
          (baseRisks.regulatory_risk || 2.5) * multiplier.regulatory,
      },
      {
        timeline: "6M",
        market_risk: (baseRisks.market_risk || 5) * multiplier.market * 0.95,
        execution_risk:
          (baseRisks.execution_risk || 4.5) * multiplier.execution * 0.9,
        financial_risk:
          (baseRisks.financial_risk || 6) *
          multiplier.financial *
          (2.2 - runwayFactor),
        technology_risk:
          (baseRisks.technology_risk || 3) * multiplier.technology * 1.05,
        regulatory_risk:
          (baseRisks.regulatory_risk || 2.5) * multiplier.regulatory * 1.1,
      },
      {
        timeline: "12M",
        market_risk: (baseRisks.market_risk || 5) * multiplier.market * 0.9,
        execution_risk:
          (baseRisks.execution_risk || 4.5) * multiplier.execution * 0.8,
        financial_risk: Math.max(
          2,
          (baseRisks.financial_risk || 6) *
            multiplier.financial *
            (1.8 - runwayFactor)
        ),
        technology_risk:
          (baseRisks.technology_risk || 3) * multiplier.technology * 1.1,
        regulatory_risk:
          (baseRisks.regulatory_risk || 2.5) * multiplier.regulatory * 1.2,
      },
      {
        timeline: "18M",
        market_risk: (baseRisks.market_risk || 5) * multiplier.market * 0.85,
        execution_risk:
          (baseRisks.execution_risk || 4.5) * multiplier.execution * 0.7,
        financial_risk: Math.max(
          1.5,
          (baseRisks.financial_risk || 6) *
            multiplier.financial *
            (1.5 - runwayFactor)
        ),
        technology_risk:
          (baseRisks.technology_risk || 3) * multiplier.technology * 1.15,
        regulatory_risk:
          (baseRisks.regulatory_risk || 2.5) * multiplier.regulatory * 1.3,
      },
      {
        timeline: "24M",
        market_risk: (baseRisks.market_risk || 5) * multiplier.market * 0.8,
        execution_risk:
          (baseRisks.execution_risk || 4.5) * multiplier.execution * 0.6,
        financial_risk: Math.max(
          1,
          (baseRisks.financial_risk || 6) *
            multiplier.financial *
            (1.2 - runwayFactor)
        ),
        technology_risk:
          (baseRisks.technology_risk || 3) * multiplier.technology * 1.2,
        regulatory_risk:
          (baseRisks.regulatory_risk || 2.5) * multiplier.regulatory * 1.4,
      },
    ];
  };

  const riskEvolutionData = generateRiskEvolution();

  // Due diligence items derived from report analysis
  const generateDueDiligenceItems = () => {
    const evidenceStrength = {
      Strong: 85,
      Medium: 65,
      Weak: 35,
    };

    const categoryMapping = {
      Financial: {
        metrics: ["Business Model Viability", "Traction & Validation"],
        items: [
          "Business Model Analysis",
          "Revenue Projections",
          "Unit Economics",
          "Cash Flow Analysis",
        ],
      },
      Legal: {
        metrics: ["Technology & Innovation"],
        items: [
          "IP Portfolio Review",
          "Regulatory Compliance",
          "Data Privacy",
          "Employment Contracts",
        ],
      },
      Technical: {
        metrics: ["Technology & Innovation", "Product-Market Readiness"],
        items: [
          "Architecture Review",
          "Security Assessment",
          "Scalability Analysis",
          "Technical Due Diligence",
        ],
      },
      Commercial: {
        metrics: [
          "Market Opportunity",
          "Competitive Positioning",
          "Go-to-Market Strategy",
        ],
        items: [
          "Market Research",
          "Competitive Analysis",
          "Customer Validation",
          "GTM Strategy",
        ],
      },
      Operational: {
        metrics: ["Team Credibility", "Presentation & Communication"],
        items: [
          "Team Assessment",
          "Operational Processes",
          "Quality Systems",
          "Vendor Management",
        ],
      },
    };

    return Object.entries(categoryMapping).map(([category, config]) => {
      const relevantMetrics = report.core_metrics.filter((metric) =>
        config.metrics.includes(metric.name)
      );

      const avgScore =
        relevantMetrics.length > 0
          ? relevantMetrics.reduce((sum, metric) => sum + metric.score, 0) /
            relevantMetrics.length
          : 6;

      const avgEvidence =
        relevantMetrics.length > 0
          ? relevantMetrics.reduce(
              (sum, metric) =>
                sum + (evidenceStrength[metric.evidence_strength] || 50),
              0
            ) / relevantMetrics.length
          : 50;

      return {
        category,
        completed: Math.round(avgEvidence),
        critical: relevantMetrics.length + 2,
        items: config.items,
      };
    });
  };

  const dueDiligenceItems = generateDueDiligenceItems();

  const getRiskColor = (score) => {
    if (score >= 7) return "#EF4444"; // red
    if (score >= 5) return "#F59E0B"; // amber
    if (score >= 3) return "#3B82F6"; // blue
    return "#10B981"; // emerald
  };

  const getRiskLevel = (score) => {
    if (score >= 7) return "High";
    if (score >= 5) return "Medium";
    if (score >= 3) return "Low";
    return "Minimal";
  };

  const getMitigationIcon = (score) => {
    if (score >= 7) return <Shield className="w-4 h-4 text-emerald-600" />;
    if (score >= 5) return <Eye className="w-4 h-4 text-amber-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  const CustomRiskTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 min-w-64">
          <p className="font-semibold text-gray-900 mb-2">{data.category}</p>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-600">Probability:</span>{" "}
              {data.probability}%
            </p>
            <p>
              <span className="text-gray-600">Impact:</span> {data.impact}/10
            </p>
            <p>
              <span className="text-gray-600">Risk Score:</span>{" "}
              {data.risk_score.toFixed(1)}
            </p>
            <p>
              <span className="text-gray-600">Mitigation:</span>{" "}
              {data.mitigation_score}/10
            </p>
          </div>
          <div className="mt-2 text-xs text-gray-500">{data.description}</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Risk Assessment & Due Diligence Framework
          </h3>
          <p className="text-gray-600 mt-2">
            Comprehensive risk analysis and investment protection protocols
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              report.risk_level === "High"
                ? "bg-red-50 text-red-800 border-red-200"
                : report.risk_level === "Medium"
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-emerald-50 text-emerald-800 border-emerald-200"
            }`}
          >
            {report.risk_level} Risk
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-500">
              Overall Risk Score
            </div>
            <div
              className={`text-2xl font-bold ${
                report.risk_assessment.overall_risk_score >= 7
                  ? "text-red-600"
                  : report.risk_assessment.overall_risk_score >= 5
                  ? "text-amber-600"
                  : "text-emerald-600"
              }`}
            >
              {report.risk_assessment.overall_risk_score}/10
            </div>
          </div>
        </div>
      </div>

      {/* Risk Matrix Visualization */}
      <div className="grid grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
            <h4 className="text-lg font-bold text-red-900 mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Risk Impact vs Probability Matrix
            </h4>
            <ResponsiveContainer width="100%" height={350}>
              <ScatterChart data={riskMatrixData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="probability"
                  domain={[0, 100]}
                  name="Probability (%)"
                  label={{
                    value: "Probability of Occurrence (%)",
                    position: "insideBottom",
                    offset: -5,
                  }}
                />
                <YAxis
                  dataKey="impact"
                  domain={[0, 10]}
                  name="Impact Severity"
                  label={{
                    value: "Impact Severity",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                <Tooltip content={<CustomRiskTooltip />} />
                <Scatter name="Risk Factors" dataKey="impact" fill="#EF4444">
                  {riskMatrixData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getRiskColor(entry.risk_score)}
                      r={6 + entry.mitigation_score}
                    />
                  ))}
                </Scatter>
                {/* Risk zones */}
                <ReferenceLine x={30} stroke="#10B981" strokeDasharray="5 5" />
                <ReferenceLine x={60} stroke="#F59E0B" strokeDasharray="5 5" />
                <ReferenceLine y={5} stroke="#F59E0B" strokeDasharray="5 5" />
                <ReferenceLine y={7.5} stroke="#EF4444" strokeDasharray="5 5" />
              </ScatterChart>
            </ResponsiveContainer>

            <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
              <div className="bg-emerald-100 p-2 rounded text-center">
                <div className="font-semibold text-emerald-800">
                  Low Risk Zone
                </div>
                <div className="text-emerald-600">Acceptable</div>
              </div>
              <div className="bg-amber-100 p-2 rounded text-center">
                <div className="font-semibold text-amber-800">
                  Medium Risk Zone
                </div>
                <div className="text-amber-600">Monitor Closely</div>
              </div>
              <div className="bg-red-100 p-2 rounded text-center">
                <div className="font-semibold text-red-800">High Risk Zone</div>
                <div className="text-red-600">Mitigation Required</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Risk Factor Breakdown
            </h4>
            <div className="space-y-4">
              {riskMatrixData.map((risk, index) => (
                <div
                  key={index}
                  className="border-l-4 pl-4"
                  style={{ borderColor: getRiskColor(risk.risk_score) }}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900 text-sm">
                      {risk.category}
                    </span>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded ${
                        getRiskLevel(risk.risk_score) === "High"
                          ? "bg-red-100 text-red-800"
                          : getRiskLevel(risk.risk_score) === "Medium"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-emerald-100 text-emerald-800"
                      }`}
                    >
                      {getRiskLevel(risk.risk_score)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Impact: {risk.impact}/10</span>
                    <div className="flex items-center">
                      {getMitigationIcon(risk.mitigation_score)}
                      <span className="ml-1">
                        Mitigation: {risk.mitigation_score}/10
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Risk Evolution Timeline */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
          <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
            <TrendingDown className="w-5 h-5 mr-2" />
            Risk Evolution Forecast
          </h4>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={riskEvolutionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timeline" />
              <YAxis domain={[0, 8]} />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="financial_risk"
                stackId="1"
                stroke="#EF4444"
                fill="#EF4444"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="market_risk"
                stackId="1"
                stroke="#F59E0B"
                fill="#F59E0B"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="execution_risk"
                stackId="1"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="technology_risk"
                stackId="1"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.6}
              />
              <Area
                type="monotone"
                dataKey="regulatory_risk"
                stackId="1"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.6}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Due Diligence Progress
          </h4>
          <div className="space-y-4">
            {dueDiligenceItems.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-200 pb-3 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">
                      {item.completed}%
                    </span>
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          item.completed >= 80
                            ? "bg-emerald-500"
                            : item.completed >= 60
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${item.completed}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {item.critical} critical items •{" "}
                  {item.items.slice(0, 2).join(", ")}...
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-center">
              <div className="text-sm font-medium text-blue-700">
                Overall DD Progress
              </div>
              <div className="text-2xl font-bold text-blue-600 mt-1">63%</div>
              <div className="text-xs text-blue-600 mt-1">
                Est. completion: 4-6 weeks
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Mitigation Strategies */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
        <h4 className="text-lg font-bold text-emerald-900 mb-6 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Risk Mitigation Strategy Framework
        </h4>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h5 className="font-semibold text-emerald-800 mb-4">
              Immediate Actions (0-3 months)
            </h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Clock className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-emerald-800">
                  Establish monthly financial reporting cadence
                </span>
              </li>
              <li className="flex items-start">
                <Users className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-emerald-800">
                  Implement key hire protection mechanisms
                </span>
              </li>
              <li className="flex items-start">
                <Lock className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-emerald-800">
                  Secure IP portfolio and competitive moats
                </span>
              </li>
              <li className="flex items-start">
                <DollarSign className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-emerald-800">
                  Establish bridge funding contingencies
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-emerald-800 mb-4">
              Strategic Initiatives (3-12 months)
            </h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Zap className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-emerald-800">
                  Accelerate product-market fit validation
                </span>
              </li>
              <li className="flex items-start">
                <Eye className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-emerald-800">
                  Deploy competitive intelligence systems
                </span>
              </li>
              <li className="flex items-start">
                <Shield className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-emerald-800">
                  Build regulatory compliance framework
                </span>
              </li>
              <li className="flex items-start">
                <FileText className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                <span className="text-emerald-800">
                  Establish governance and oversight protocols
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskAssessment;
