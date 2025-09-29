"use client";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ScatterChart,
  Scatter,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  Target,
  Globe,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const MarketIntelligence = ({ report }) => {
  // Market size visualization data
  const marketSizeData = [
    {
      market: "TAM",
      size: report.market_analysis.tam_size / 1000000,
      description: "Total Addressable Market",
      color: "#3B82F6",
    },
    {
      market: "SAM",
      size: report.market_analysis.sam_size / 1000000,
      description: "Serviceable Addressable Market",
      color: "#8B5CF6",
    },
    {
      market: "SOM",
      size: report.market_analysis.som_size / 1000000,
      description: "Serviceable Obtainable Market",
      color: "#10B981",
    },
  ];

  // Revenue projection data
  const revenueProjectionData = [
    {
      year: "Current",
      revenue: report.financial_projections.current_revenue,
      market_size: report.market_analysis.som_size / 1000000,
    },
    {
      year: "Y1",
      revenue: report.financial_projections.projected_revenue_y1,
      market_size: report.market_analysis.som_size / 1000000,
    },
    {
      year: "Y2",
      revenue: report.financial_projections.projected_revenue_y2,
      market_size: report.market_analysis.som_size / 1000000,
    },
    {
      year: "Y3",
      revenue: report.financial_projections.projected_revenue_y3,
      market_size: report.market_analysis.som_size / 1000000,
    },
    {
      year: "Y5",
      revenue: report.financial_projections.projected_revenue_y5,
      market_size: report.market_analysis.som_size / 1000000,
    },
  ];

  // Competitive positioning data
  const competitorData = report.benchmark_data.peer_companies
    .map((comp) => ({
      name: comp.name,
      score: comp.score,
      funding: comp.funding,
      stage: comp.stage,
      market_share: Math.random() * 15 + 5, // Simulated market share
    }))
    .concat([
      {
        name: "Target Company",
        score: report.overall_score,
        funding: report.financial_projections.next_funding_need,
        stage: report.company_stage,
        market_share: 2.5,
      },
    ]);

  // Market maturity indicators
  const marketMaturityData = [
    { factor: "Market Penetration", value: 35, benchmark: 45 },
    { factor: "Technology Adoption", value: 60, benchmark: 50 },
    { factor: "Customer Sophistication", value: 45, benchmark: 55 },
    { factor: "Competitive Density", value: 40, benchmark: 60 },
    { factor: "Regulatory Clarity", value: 70, benchmark: 65 },
  ];

  const getMaturityColor = (maturity) => {
    switch (maturity.toLowerCase()) {
      case "emerging":
        return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "growth":
        return "text-blue-600 bg-blue-50 border-blue-200";
      case "mature":
        return "text-purple-600 bg-purple-50 border-purple-200";
      default:
        return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getIntensityColor = (intensity) => {
    switch (intensity.toLowerCase()) {
      case "low":
        return "text-emerald-600";
      case "medium":
        return "text-amber-600";
      case "high":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}:{" "}
              {typeof entry.value === "number"
                ? entry.value > 1000
                  ? `$${(entry.value / 1000).toFixed(1)}B`
                  : `$${entry.value.toFixed(1)}M`
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Market Intelligence & Competitive Analysis
          </h3>
          <p className="text-gray-600 mt-2">
            Strategic market positioning and competitive landscape assessment
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${getMaturityColor(
              report.market_analysis.market_maturity
            )}`}
          >
            {report.market_analysis.market_maturity} Market
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-gray-500">Growth Rate</div>
            <div className="text-xl font-bold text-emerald-600">
              {report.market_analysis.market_growth_rate}%
            </div>
          </div>
        </div>
      </div>

      {/* Market Size Analysis */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Market Size & Opportunity Funnel
            </h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={marketSizeData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="market" />
                <YAxis tickFormatter={(value) => `$${value}M`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="size" radius={[4, 4, 0, 0]}>
                  {marketSizeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-3 gap-4 mt-4">
              {marketSizeData.map((item, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center">
                    <div
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {item.market}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {item.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Market Dynamics
            </h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Competitive Intensity
                  </span>
                  <span
                    className={`font-semibold ${getIntensityColor(
                      report.market_analysis.competitive_intensity
                    )}`}
                  >
                    {report.market_analysis.competitive_intensity}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      report.market_analysis.competitive_intensity === "High"
                        ? "bg-red-500"
                        : report.market_analysis.competitive_intensity ===
                          "Medium"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{
                      width: `${
                        report.market_analysis.competitive_intensity === "High"
                          ? "85"
                          : report.market_analysis.competitive_intensity ===
                            "Medium"
                          ? "60"
                          : "35"
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Market Growth</span>
                  <span className="font-semibold text-emerald-600">
                    {report.market_analysis.market_growth_rate}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{
                      width: `${Math.min(
                        report.market_analysis.market_growth_rate * 3,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">
                    Market Penetration
                  </span>
                  <span className="font-semibold text-blue-600">12%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: "12%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-200">
            <h4 className="text-lg font-bold text-purple-900 mb-4">
              Revenue Opportunity
            </h4>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">
                ${(report.market_analysis.som_size / 1000000).toFixed(0)}M
              </div>
              <div className="text-sm text-purple-700">Serviceable Market</div>
              <div className="text-xs text-purple-600 mt-2">
                Est. 5-year capture: $
                {report.financial_projections.projected_revenue_y5}M
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue Trajectory */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-xl border border-emerald-200">
          <h4 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Revenue Growth Trajectory
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueProjectionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis tickFormatter={(value) => `${value}M`} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                fill="#10B981"
                fillOpacity={0.3}
                strokeWidth={3}
              />
              <ReferenceLine
                y={report.market_analysis.som_size / 1000000}
                stroke="#8B5CF6"
                strokeDasharray="8 8"
                label="SOM Ceiling"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
          <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Competitive Positioning Matrix
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart data={competitorData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="score"
                domain={[4, 9]}
                name="Investment Score"
                axisLine={false}
              />
              <YAxis
                dataKey="funding"
                domain={[0, 6]}
                name="Funding ($M)"
                axisLine={false}
              />
              <Tooltip
                formatter={(value, name) => [
                  name === "score" ? `${value}/10` : `${value}M`,
                  name === "score" ? "Investment Score" : "Funding",
                ]}
                labelFormatter={(label, payload) =>
                  payload && payload[0] ? payload[0].payload.name : ""
                }
              />
              <Scatter name="Companies" dataKey="funding" fill="#3B82F6">
                {competitorData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.name === "Target Company" ? "#EF4444" : "#3B82F6"
                    }
                    stroke={
                      entry.name === "Target Company" ? "#DC2626" : "#2563EB"
                    }
                    strokeWidth={entry.name === "Target Company" ? 3 : 1}
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Market Trends & Risks */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-xl border border-blue-200">
          <h4 className="font-bold text-blue-900 mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Market Tailwinds
          </h4>
          <ul className="space-y-3">
            {report.market_analysis.market_trends.map((trend, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-blue-600 flex-shrink-0" />
                <span className="text-sm text-blue-800">{trend}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-red-50 p-6 rounded-xl border border-orange-200">
          <h4 className="font-bold text-orange-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Market Headwinds
          </h4>
          <ul className="space-y-3">
            {report.market_analysis.market_risks.map((risk, index) => (
              <li key={index} className="flex items-start">
                <AlertTriangle className="w-4 h-4 mr-3 mt-0.5 text-orange-600 flex-shrink-0" />
                <span className="text-sm text-orange-800">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Market Maturity Assessment */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
        <h4 className="text-lg font-bold text-indigo-900 mb-6">
          Market Maturity Assessment Framework
        </h4>
        <div className="grid grid-cols-5 gap-6">
          {marketMaturityData.map((factor, index) => (
            <div key={index} className="text-center">
              <div className="text-sm font-medium text-indigo-700 mb-2">
                {factor.factor}
              </div>
              <div className="relative">
                <div className="w-16 h-16 mx-auto rounded-full border-4 border-indigo-200 flex items-center justify-center">
                  <span className="text-lg font-bold text-indigo-600">
                    {factor.value}%
                  </span>
                </div>
                <div className="mt-2 text-xs text-indigo-500">
                  vs {factor.benchmark}% benchmark
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketIntelligence;
