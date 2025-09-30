"use client";
import {
  ComposedChart,
  Area,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  BarChart,
  Cell,
  ReferenceLine,
} from "recharts";
import {
  TrendingUp,
  DollarSign,
  Target,
  Clock,
  AlertCircle,
  Calculator,
  Briefcase,
} from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FinancialProjections = ({ report }: { report: any }) => {
  // Revenue and profitability projections
  const financialProjectionData = [
    {
      year: "Current",
      revenue: report.financial_projections.current_revenue,
      burn_rate: Math.abs(report.financial_projections.burn_rate),
      gross_margin: 0,
    },
    {
      year: "Y1",
      revenue: report.financial_projections.projected_revenue_y1,
      burn_rate: Math.abs(report.financial_projections.burn_rate) * 1.2,
      gross_margin: report.financial_projections.projected_revenue_y1 * 0.75,
    },
    {
      year: "Y2",
      revenue: report.financial_projections.projected_revenue_y2,
      burn_rate: Math.abs(report.financial_projections.burn_rate) * 1.5,
      gross_margin: report.financial_projections.projected_revenue_y2 * 0.78,
    },
    {
      year: "Y3",
      revenue: report.financial_projections.projected_revenue_y3,
      burn_rate: Math.abs(report.financial_projections.burn_rate) * 1.8,
      gross_margin: report.financial_projections.projected_revenue_y3 * 0.82,
    },
    {
      year: "Y5",
      revenue: report.financial_projections.projected_revenue_y5,
      burn_rate: Math.abs(report.financial_projections.burn_rate) * 2.5,
      gross_margin: report.financial_projections.projected_revenue_y5 * 0.85,
    },
  ];

  // Valuation scenarios
  const valuationScenarios = [
    {
      scenario: "Conservative",
      valuation: report.financial_projections.valuation_estimate * 0.6,
      color: "#EF4444",
    },
    {
      scenario: "Base Case",
      valuation: report.financial_projections.valuation_estimate,
      color: "#3B82F6",
    },
    {
      scenario: "Optimistic",
      valuation: report.financial_projections.valuation_estimate * 1.8,
      color: "#10B981",
    },
  ];

  // Cash flow data
  const cashFlowData = [
    { month: "M0", cash_balance: 2.5 },
    { month: "M3", cash_balance: 1.9 },
    { month: "M6", cash_balance: 1.3 },
    { month: "M9", cash_balance: 0.7 },
    { month: "M12", cash_balance: 0.4 },
    { month: "M15", cash_balance: 0.1 },
  ];

  // Unit economics data
  const unitEconomicsData = [
    {
      metric: "Customer Acquisition Cost",
      current: 150,
      target: 120,
      benchmark: 200,
    },
    { metric: "Lifetime Value", current: 1200, target: 2000, benchmark: 1500 },
    { metric: "LTV/CAC Ratio", current: 8.0, target: 16.7, benchmark: 7.5 },
    { metric: "Gross Margin %", current: 75, target: 85, benchmark: 70 },
    { metric: "Payback Period (months)", current: 8, target: 6, benchmark: 12 },
  ];

  // Key financial metrics
  const keyMetrics = [
    {
      title: "ARR Growth Rate",
      value: "180%",
      change: "+25%",
      trend: "up",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "emerald",
    },
    {
      title: "Burn Multiple",
      value: "2.4x",
      change: "-0.3x",
      trend: "down",
      icon: <DollarSign className="w-5 h-5" />,
      color: "blue",
    },
    {
      title: "Revenue Per Employee",
      value: "$125K",
      change: "+$15K",
      trend: "up",
      icon: <Calculator className="w-5 h-5" />,
      color: "purple",
    },
    {
      title: "Cash Efficiency",
      value: "85%",
      change: "+12%",
      trend: "up",
      icon: <Target className="w-5 h-5" />,
      color: "amber",
    },
  ];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getMetricColor = (color: "emerald" | "blue" | "purple" | "amber") => {
    const colors = {
      emerald: "text-emerald-600 bg-emerald-50 border-emerald-200",
      blue: "text-blue-600 bg-blue-50 border-blue-200",
      purple: "text-purple-600 bg-purple-50 border-purple-200",
      amber: "text-amber-600 bg-amber-50 border-amber-200",
    };
    return colors[color] || "text-gray-600 bg-gray-50 border-gray-200";
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            Financial Projections & Valuation Analysis
          </h3>
          <p className="text-gray-600 mt-2">
            Comprehensive financial modeling and investment valuation framework
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-500">
              Target Valuation
            </div>
            <div className="text-2xl font-bold text-blue-600">
              ${report.financial_projections.valuation_estimate}M
            </div>
            <div className="text-xs text-gray-500">
              {report.financial_projections.revenue_multiple}x revenue multiple
            </div>
          </div>
        </div>
      </div>

      {/* Key Financial Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        {keyMetrics.map((metric, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl border-2 ${getMetricColor(
              metric.color as "emerald" | "blue" | "purple" | "amber"
            )}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold uppercase tracking-wider opacity-75">
                  {metric.title}
                </div>
                <div className="text-2xl font-bold mt-1">{metric.value}</div>
                <div
                  className={`text-xs mt-1 flex items-center ${
                    metric.trend === "up" ? "text-emerald-600" : "text-red-600"
                  }`}
                >
                  <span>{metric.change}</span>
                  <span className="ml-1">
                    {metric.trend === "up" ? "↗" : "↘"}
                  </span>
                </div>
              </div>
              <div className="opacity-75">{metric.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Projections and Cash Flow */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Revenue Growth & Profitability Trajectory
            </h4>
            <ResponsiveContainer width="100%" height={350}>
              <ComposedChart data={financialProjectionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="gross_margin"
                  stackId="1"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                />
                <Bar dataKey="revenue" fill="#3B82F6" />
                <Line
                  type="monotone"
                  dataKey="burn_rate"
                  stroke="#EF4444"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
            <h4 className="text-lg font-bold text-red-900 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2" />
              Cash Runway Analysis
            </h4>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-red-600">
                {report.financial_projections.runway_months}
              </div>
              <div className="text-sm text-red-700">months remaining</div>
            </div>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={cashFlowData}>
                <XAxis dataKey="month" />
                <YAxis hide />
                <Line
                  type="monotone"
                  dataKey="cash_balance"
                  stroke="#EF4444"
                  strokeWidth={3}
                  dot={{ fill: "#EF4444", strokeWidth: 2, r: 4 }}
                />
                <ReferenceLine y={0} stroke="#DC2626" strokeDasharray="3 3" />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 p-3 bg-red-100 rounded-lg">
              <div className="text-xs text-red-800 text-center">
                <AlertCircle className="w-4 h-4 inline mr-1" />
                Next funding required: $
                {report.financial_projections.next_funding_need}M
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Valuation Scenarios */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
          <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Valuation Scenario Analysis
          </h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={valuationScenarios}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scenario" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="valuation" radius={[4, 4, 0, 0]}>
                {valuationScenarios.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
          <h4 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Unit Economics Performance
          </h4>
          <div className="space-y-4">
            {unitEconomicsData.map((metric, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-emerald-100"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-emerald-900">
                    {metric.metric}
                  </span>
                  <div className="px-2 py-1 rounded text-xs bg-emerald-100 text-emerald-800">
                    improving
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <span className="text-gray-500">Current:</span>
                    <div className="font-semibold">{metric.current}</div>
                  </div>
                  <div>
                    <span className="text-gray-500">Target:</span>
                    <div className="font-semibold text-emerald-600">
                      {metric.target}
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-500">Benchmark:</span>
                    <div className="font-semibold text-gray-600">
                      {metric.benchmark}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Financial Health Indicators */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 rounded-xl border border-slate-200">
        <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center">
          <Briefcase className="w-5 h-5 mr-2" />
          Financial Health & Investment Readiness
        </h4>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">B+</div>
            <div className="text-sm text-slate-600">Financial Grade</div>
            <div className="text-xs text-slate-500 mt-1">Above Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-600">82%</div>
            <div className="text-sm text-slate-600">Capital Efficiency</div>
            <div className="text-xs text-slate-500 mt-1">
              Strong Performance
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              $
              {(
                report.financial_projections.projected_revenue_y3 /
                report.financial_projections.next_funding_need
              ).toFixed(1)}
              M
            </div>
            <div className="text-sm text-slate-600">ROI Multiple</div>
            <div className="text-xs text-slate-500 mt-1">3-Year Horizon</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-600">18mo</div>
            <div className="text-sm text-slate-600">Break-even ETA</div>
            <div className="text-xs text-slate-500 mt-1">
              Projected Timeline
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialProjections;
