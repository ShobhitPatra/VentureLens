"use client";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Users,
  Target,
  BarChart3,
} from "lucide-react";

const ExecutiveSummary = ({ report }) => {
  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-emerald-600";
    if (score >= 6.5) return "text-amber-600";
    return "text-red-600";
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 8) return "bg-emerald-50 border-emerald-200";
    if (score >= 6.5) return "bg-amber-50 border-amber-200";
    return "bg-red-50 border-red-200";
  };

  const getRiskIcon = (level: string) => {
    switch (level.toLowerCase()) {
      case "low":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case "medium":
        return <AlertTriangle className="w-5 h-5 text-amber-600" />;
      case "high":
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            Investment Thesis Overview
          </h2>
          <p className="text-slate-600 text-lg">
            {report.industry_sector} • {report.company_stage} •{" "}
            {report.analysis_date}
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-sm font-medium text-slate-500 uppercase tracking-wider">
              Confidence Level
            </div>
            <div className="text-2xl font-bold text-slate-900">
              {report.confidence_level}
            </div>
          </div>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div
          className={`p-6 rounded-xl border-2 ${getScoreBgColor(
            report.overall_score
          )}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Investment Score
              </div>
              <div
                className={`text-3xl font-bold mt-1 ${getScoreColor(
                  report.overall_score
                )}`}
              >
                {report.overall_score}/10
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {report.benchmark_data.percentile_ranking}th percentile
              </div>
            </div>
            <BarChart3 className="w-8 h-8 text-slate-400" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border-2 border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Funding Stage
              </div>
              <div className="text-xl font-bold text-blue-600 mt-1">
                {report.investment_readiness}
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {report.funding_estimate}
              </div>
            </div>
            <Target className="w-8 h-8 text-blue-400" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border-2 border-purple-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Market Cap Potential
              </div>
              <div className="text-xl font-bold text-purple-600 mt-1">
                ${report.financial_projections.valuation_estimate}M
              </div>
              <div className="text-xs text-slate-500 mt-1">
                {report.financial_projections.revenue_multiple}x multiple
              </div>
            </div>
            <DollarSign className="w-8 h-8 text-purple-400" />
          </div>
        </div>

        <div className="p-6 bg-white rounded-xl border-2 border-orange-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-semibold text-slate-600 uppercase tracking-wider">
                Risk Assessment
              </div>
              <div className="text-xl font-bold text-orange-600 mt-1 flex items-center">
                {getRiskIcon(report.risk_level)}
                <span className="ml-2">{report.risk_level}</span>
              </div>
              <div className="text-xs text-slate-500 mt-1">
                Score: {report.risk_assessment.overall_risk_score}/10
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Investment Recommendation */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-4">
            Investment Committee Recommendation
          </h3>
          <div className="flex items-start space-x-4">
            <div
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                report.investment_recommendation.recommendation.includes(
                  "Proceed"
                )
                  ? "bg-emerald-100 text-emerald-800"
                  : "bg-amber-100 text-amber-800"
              }`}
            >
              {report.investment_recommendation.recommendation}
            </div>
            <div className="flex-1">
              <p className="text-slate-700 text-sm leading-relaxed">
                {report.investment_recommendation.summary}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-slate-600">Timeline:</span>
                  <span className="text-slate-800 ml-2">
                    {report.investment_recommendation.timeline_to_investment}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-slate-600">
                    DD Priority:
                  </span>
                  <span className="text-slate-800 ml-2">
                    {report.investment_recommendation.due_diligence_priority}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
          <h3 className="text-lg font-bold text-indigo-900 mb-4">
            Key Performance Indicators
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-indigo-700">Market Readiness</span>
              <span className="font-semibold text-indigo-900">
                {report.funding_stage_analysis.readiness_score}/10
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-indigo-700">Runway (months)</span>
              <span className="font-semibold text-indigo-900">
                {report.financial_projections.runway_months}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-indigo-700">Burn Rate</span>
              <span className="font-semibold text-indigo-900">
                ${Math.abs(report.financial_projections.burn_rate)}M/mo
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-indigo-700">Next Funding</span>
              <span className="font-semibold text-indigo-900">
                ${report.financial_projections.next_funding_need}M
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
          <h4 className="font-bold text-emerald-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Strategic Advantages
          </h4>
          <ul className="space-y-2">
            {report.key_strengths.map((strength, index) => (
              <li
                key={index}
                className="text-sm text-emerald-800 flex items-start"
              >
                <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-emerald-600 flex-shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
          <h4 className="font-bold text-red-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Critical Risk Factors
          </h4>
          <ul className="space-y-2">
            {report.areas_for_improvement.slice(0, 3).map((area, index) => (
              <li key={index} className="text-sm text-red-800 flex items-start">
                <AlertTriangle className="w-4 h-4 mr-2 mt-0.5 text-red-600 flex-shrink-0" />
                {area}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;
