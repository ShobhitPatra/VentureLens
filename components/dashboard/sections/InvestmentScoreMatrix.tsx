"use client";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const InvestmentScoreMatrix = ({ report }) => {
  // Transform core metrics for radar chart
  const radarData = report.core_metrics.map((metric) => ({
    metric: metric.name.replace(" & ", " &\n"),
    score: metric.score,
    weight: metric.weight,
    benchmark: 6.0, // industry average
    percentile: metric.percentile_rank,
    category: metric.category,
  }));

  // Category performance data
  const categoryData = Object.entries(report.category_scores).map(
    ([category, score]) => ({
      category: category,
      score: score,
      benchmark: 6.0,
      target: 8.0,
      weight: radarData
        .filter((item) => item.category === category)
        .reduce((sum, item) => sum + item.weight, 0),
    })
  );

  // Color mapping for categories
  const categoryColors = {
    Foundation: "#10B981", // emerald
    Market: "#3B82F6", // blue
    Business: "#8B5CF6", // violet
    Product: "#F59E0B", // amber
    Execution: "#EF4444", // red
    Team: "#06B6D4", // cyan
    Presentation: "#84CC16", // lime
  };

  const getScoreColor = (score) => {
    if (score >= 8) return "#10B981";
    if (score >= 6.5) return "#F59E0B";
    return "#EF4444";
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{label}</p>
          <div className="mt-2 space-y-1">
            <p className="text-sm">
              <span className="text-blue-600">Score:</span> {data.score}/10
            </p>
            <p className="text-sm">
              <span className="text-gray-600">Weight:</span> {data.weight}%
            </p>
            <p className="text-sm">
              <span className="text-purple-600">Percentile:</span>{" "}
              {data.percentile}th
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  const WeightedScoreBar = ({ data }) => (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-3">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            backgroundColor: categoryColors[data.category] || "#6B7280",
          }}
        />
        <span className="font-medium text-gray-900 text-sm">{data.metric}</span>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-sm text-gray-500">Weight: {data.weight}%</div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-24 bg-gray-200 rounded-full h-2">
            <div
              className="h-2 rounded-full"
              style={{
                width: `${(data.score / 10) * 100}%`,
                backgroundColor: getScoreColor(data.score),
              }}
            />
          </div>
          <span className="font-bold text-gray-900 w-12 text-right">
            {data.score}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Investment Score Matrix
          </h3>
          <p className="text-gray-600 mt-2">
            Comprehensive weighted analysis across {report.core_metrics.length}{" "}
            investment dimensions
          </p>
        </div>
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-xl border border-blue-200">
          <div className="text-center">
            <div className="text-sm font-medium text-blue-600 uppercase tracking-wider">
              Composite Score
            </div>
            <div className="text-3xl font-bold text-blue-900">
              {report.weighted_score}
            </div>
            <div className="text-xs text-blue-600">
              vs {report.benchmark_data.industry_average} industry avg
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Radar Chart */}
        <div className="col-span-2">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
            <h4 className="text-lg font-bold text-slate-900 mb-4">
              Multi-Dimensional Performance Radar
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <RadarChart data={radarData}>
                <PolarGrid gridType="polygon" />
                <PolarAngleAxis
                  dataKey="metric"
                  tick={{ fontSize: 11, fontWeight: 500 }}
                  className="text-gray-600"
                />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 10]}
                  tick={{ fontSize: 10 }}
                  tickCount={6}
                />
                <Radar
                  name="Company Score"
                  dataKey="score"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.3}
                  strokeWidth={3}
                />
                <Radar
                  name="Industry Benchmark"
                  dataKey="benchmark"
                  stroke="#9CA3AF"
                  fill="transparent"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Scores */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h4 className="text-lg font-bold text-gray-900 mb-4">
              Category Performance
            </h4>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={categoryData}
                layout="horizontal"
                margin={{ left: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 10]} />
                <YAxis dataKey="category" type="category" width={75} />
                <Tooltip
                  formatter={(value, name) => [value.toFixed(1), name]}
                  labelFormatter={(label) => `Category: ${label}`}
                />
                <Bar dataKey="score" fill="#3B82F6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Metrics Breakdown */}
      <div className="mt-8">
        <h4 className="text-lg font-bold text-gray-900 mb-6">
          Weighted Scoring Breakdown
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {radarData.map((metric, index) => (
            <WeightedScoreBar key={index} data={metric} />
          ))}
        </div>
      </div>

      {/* Performance Indicators */}
      <div className="mt-8 grid grid-cols-4 gap-4">
        <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">
              {radarData.filter((m) => m.score >= 7).length}
            </div>
            <div className="text-sm text-emerald-700">Strong Metrics</div>
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">
              {radarData.filter((m) => m.score >= 5 && m.score < 7).length}
            </div>
            <div className="text-sm text-amber-700">Average Metrics</div>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">
              {radarData.filter((m) => m.score < 5).length}
            </div>
            <div className="text-sm text-red-700">Weak Metrics</div>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {report.benchmark_data.percentile_ranking}th
            </div>
            <div className="text-sm text-blue-700">Percentile Rank</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentScoreMatrix;
