"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from "recharts";
import {
  Target,
  Clock,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Zap,
  Users,
  DollarSign,
  Briefcase,
  Star,
  ArrowRight,
  Calendar,
  Flag,
} from "lucide-react";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StrategicActionPlan = ({ report }: { report: any }) => {
  // Transform actionable recommendations with derived metrics
  const timelineData = report.actionable_recommendations.map(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rec: any,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      index: any
    ) => ({
      ...rec,
      id: index + 1,
      completion_score: 0, // Always starts at 0 for new recommendations
      dependencies:
        rec.category === "Market Validation" ||
        rec.category === "Competitive Analysis"
          ? 1
          : rec.category === "Go-to-Market" || rec.category === "Business Model"
          ? 2
          : 3,
      resources_required:
        rec.effort === "High" ? 6 : rec.effort === "Medium" ? 4 : 2,
      success_probability:
        rec.impact === "High" && rec.effort === "Low"
          ? 85
          : rec.impact === "High" && rec.effort === "Medium"
          ? 75
          : rec.impact === "High" && rec.effort === "High"
          ? 65
          : rec.impact === "Medium" && rec.effort === "Low"
          ? 80
          : rec.impact === "Medium" && rec.effort === "Medium"
          ? 70
          : 60,
    })
  );

  // Strategic impact vs effort matrix - derived from actual recommendations
  const impactEffortData = timelineData.map(
    (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      item: any
    ) => ({
      ...item,
      impact_score:
        item.impact === "High" ? 8.5 : item.impact === "Medium" ? 6.0 : 3.5,
      effort_score:
        item.effort === "High" ? 8.0 : item.effort === "Medium" ? 5.5 : 3.0,
      priority_value:
        (item.impact === "High" ? 8.5 : item.impact === "Medium" ? 6.0 : 3.5) /
        (item.effort === "High" ? 8.0 : item.effort === "Medium" ? 5.5 : 3.0),
    })
  );

  // Generate KPI tracking based on report categories and scores
  const generateKpiTracking = () => {
    const categoryScores = report.category_scores;
    return [
      {
        category: "Revenue Metrics",
        kpis: [
          "Monthly Recurring Revenue",
          "Customer Acquisition Rate",
          "Average Contract Value",
          "Churn Rate",
        ],
        current_performance: Math.round((categoryScores.Business || 5) * 10),
        target_performance: 85,
        timeline: "90 days",
      },
      {
        category: "Product Metrics",
        kpis: [
          "Product-Market Fit Score",
          "User Engagement Rate",
          "Feature Adoption",
          "NPS Score",
        ],
        current_performance: Math.round((categoryScores.Product || 6) * 10),
        target_performance: 88,
        timeline: "120 days",
      },
      {
        category: "Market Metrics",
        kpis: [
          "Market Share Growth",
          "Competitive Win Rate",
          "Brand Recognition",
          "Thought Leadership",
        ],
        current_performance: Math.round((categoryScores.Market || 5.25) * 8.5),
        target_performance: 75,
        timeline: "180 days",
      },
      {
        category: "Operational Metrics",
        kpis: [
          "Team Productivity",
          "Process Efficiency",
          "Technology Scalability",
          "Quality Metrics",
        ],
        current_performance: Math.round((categoryScores.Execution || 5) * 12),
        target_performance: 82,
        timeline: "150 days",
      },
    ];
  };

  const kpiTracking = generateKpiTracking();

  // Generate investment committee decision framework from report data
  const generateDecisionFramework = () => {
    const coreMetrics = report.core_metrics;

    const getMetricScore = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      metricNames: any
    ) => {
      const relevantMetrics = coreMetrics.filter(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          m: any
        ) =>
          metricNames.some(
            (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name: any
            ) => m.name.toLowerCase().includes(name.toLowerCase())
          )
      );
      if (relevantMetrics.length === 0) return 5.0;
      return (
        relevantMetrics.reduce(
          (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            m: any
          ) => acc + m.score,
          0
        ) / relevantMetrics.length
      );
    };

    return [
      {
        milestone: "Market Validation",
        criteria: [
          "Customer interviews (50+)",
          "Problem-solution fit validation",
          "Competitive analysis completion",
        ],
        weight: 25,
        current_score: getMetricScore([
          "Market Opportunity",
          "Problem-Solution Fit",
        ]),
        target_score: 8.5,
        status:
          getMetricScore(["Market Opportunity", "Problem-Solution Fit"]) >= 7
            ? "in_progress"
            : "pending",
      },
      {
        milestone: "Product Readiness",
        criteria: [
          "MVP completion",
          "Technical scalability audit",
          "User experience optimization",
        ],
        weight: 20,
        current_score: getMetricScore([
          "Product-Market Readiness",
          "Technology",
        ]),
        target_score: 8.0,
        status:
          getMetricScore(["Product-Market Readiness", "Technology"]) >= 6.5
            ? "in_progress"
            : "pending",
      },
      {
        milestone: "Go-to-Market",
        criteria: [
          "Sales process definition",
          "Channel partner identification",
          "Pricing strategy validation",
        ],
        weight: 20,
        current_score: getMetricScore([
          "Go-to-Market Strategy",
          "Competitive Positioning",
        ]),
        target_score: 7.5,
        status:
          getMetricScore([
            "Go-to-Market Strategy",
            "Competitive Positioning",
          ]) >= 5
            ? "in_progress"
            : "pending",
      },
      {
        milestone: "Team & Operations",
        criteria: [
          "Key hire completion",
          "Operational processes",
          "Advisory board establishment",
        ],
        weight: 15,
        current_score: getMetricScore(["Team Credibility"]),
        target_score: 8.0,
        status:
          getMetricScore(["Team Credibility"]) >= 6 ? "in_progress" : "pending",
      },
      {
        milestone: "Financial Readiness",
        criteria: [
          "Financial model validation",
          "Unit economics proof",
          "Funding strategy execution",
        ],
        weight: 20,
        current_score: getMetricScore(["Business Model Viability", "Traction"]),
        target_score: 8.0,
        status:
          getMetricScore(["Business Model Viability", "Traction"]) >= 5.5
            ? "in_progress"
            : "pending",
      },
    ];
  };

  const decisionFramework = generateDecisionFramework();

  // Success probability factors derived from report scores
  const generateSuccessFactors = () => {
    const coreMetrics = report.core_metrics;

    const getFactorScore = (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      metricNames: any
    ) => {
      const relevantMetrics = coreMetrics.filter(
        (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          m: any
        ) =>
          metricNames.some(
            (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              name: any
            ) => m.name.toLowerCase().includes(name.toLowerCase())
          )
      );
      if (relevantMetrics.length === 0) return 5.0;
      return (
        relevantMetrics.reduce(
          (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            acc: any,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            m: any
          ) => acc + m.score,
          0
        ) / relevantMetrics.length
      );
    };

    return [
      {
        factor: "Market Timing",
        score: getFactorScore(["Market Opportunity", "Problem-Solution Fit"]),
        weight: 20,
      },
      {
        factor: "Team Execution",
        score: getFactorScore(["Team Credibility", "Go-to-Market Strategy"]),
        weight: 25,
      },
      {
        factor: "Product Quality",
        score: getFactorScore(["Product-Market Readiness", "Technology"]),
        weight: 20,
      },
      {
        factor: "Financial Resources",
        score: getFactorScore(["Business Model Viability", "Traction"]),
        weight: 15,
      },
      {
        factor: "Competitive Position",
        score: getFactorScore(["Competitive Positioning"]),
        weight: 20,
      },
    ];
  };

  const successFactors = generateSuccessFactors();

  const getPriorityColor = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    priority: any
  ) => {
    switch (priority.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "medium":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    status: any
  ) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-emerald-600" />;
      case "in_progress":
        return <Clock className="w-5 h-5 text-amber-600" />;
      case "pending":
        return <AlertTriangle className="w-5 h-5 text-red-600" />;
      default:
        return <Flag className="w-5 h-5 text-gray-600" />;
    }
  };

  const getCategoryIcon = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    category: any
  ) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const icons: any = {
      "Market Validation": <Target className="w-5 h-5" />,
      "Competitive Analysis": <TrendingUp className="w-5 h-5" />,
      "Go-to-Market": <Users className="w-5 h-5" />,
      Traction: <Zap className="w-5 h-5" />,
      "Business Model": <DollarSign className="w-5 h-5" />,
      Product: <Star className="w-5 h-5" />,
      Team: <Users className="w-5 h-5" />,
      Financial: <Briefcase className="w-5 h-5" />,
    };
    return icons[category] || <Flag className="w-5 h-5" />;
  };

  const CustomTooltip = ({
    active,
    payload,
  }: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    active: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload: any;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200 max-w-64">
          <p className="font-semibold text-gray-900 mb-2">{data.action}</p>
          <div className="space-y-1 text-sm">
            <p>
              <span className="text-gray-600">Impact:</span> {data.impact}
            </p>
            <p>
              <span className="text-gray-600">Effort:</span> {data.effort}
            </p>
            <p>
              <span className="text-gray-600">Timeline:</span> {data.timeline}
            </p>
            <p>
              <span className="text-gray-600">Success Rate:</span>{" "}
              {data.success_probability}%
            </p>
          </div>
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
            Strategic Action Plan & Investment Roadmap
          </h3>
          <p className="text-gray-600 mt-2">
            Comprehensive execution framework for investment readiness and value
            creation
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-4 py-2 rounded-xl border border-emerald-200">
            <div className="text-center">
              <div className="text-sm font-medium text-emerald-600">
                Success Probability
              </div>
              <div className="text-xl font-bold text-emerald-800">
                {Math.round(
                  successFactors.reduce(
                    (acc, factor) => acc + (factor.score * factor.weight) / 100,
                    0
                  )
                )}
                %
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact vs Effort Matrix */}
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        <div className="col-span-2">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="text-lg font-bold text-blue-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Strategic Priority Matrix: Impact vs Effort
            </h4>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={impactEffortData}
                margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="action"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={11}
                />
                <YAxis
                  label={{
                    value: "Priority Score",
                    angle: -90,
                    position: "insideLeft",
                  }}
                />
                {/* <Tooltip content={<CustomTooltip />} /> */}
                <Bar dataKey="priority_value" radius={[4, 4, 0, 0]}>
                  {impactEffortData.map(
                    (
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      entry: any,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      index: any
                    ) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.priority === "Critical"
                            ? "#EF4444"
                            : entry.priority === "High"
                            ? "#F59E0B"
                            : entry.priority === "Medium"
                            ? "#3B82F6"
                            : "#6B7280"
                        }
                      />
                    )
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-200">
            <h4 className="text-lg font-bold text-emerald-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2" />
              Success Factor Analysis
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={successFactors}>
                <PolarGrid />
                <PolarAngleAxis dataKey="factor" tick={{ fontSize: 10 }} />
                <PolarRadiusAxis
                  angle={90}
                  domain={[0, 10]}
                  tick={{ fontSize: 8 }}
                />
                <Radar
                  name="Current Score"
                  dataKey="score"
                  stroke="#10B981"
                  fill="#10B981"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h4 className="text-lg font-bold text-gray-900 mb-4">Quick Wins</h4>
            <div className="space-y-3">
              {timelineData
                .filter(
                  (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    item: any
                  ) => item.effort === "Low"
                )
                .slice(0, 3)
                .map(
                  (
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    item: any,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    index: any
                  ) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200"
                    >
                      <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-sm font-medium text-green-900">
                          {item.action}
                        </div>
                        <div className="text-xs text-green-700">
                          {item.timeline}
                        </div>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Action Items */}
      <div className="mb-8">
        <h4 className="text-lg font-bold text-gray-900 mb-6">
          Detailed Action Plan & Timeline
        </h4>
        <div className="space-y-4">
          {timelineData.map(
            (
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              item: any,
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              index: any
            ) => (
              <div
                key={index}
                className="bg-gradient-to-r from-slate-50 to-gray-50 p-6 rounded-xl border border-slate-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h5 className="font-bold text-gray-900">
                          {item.action}
                        </h5>
                        <div
                          className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {item.category} initiative focused on{" "}
                        {item.impact.toLowerCase()}-impact value creation
                      </p>

                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center">
                          <div className="text-xs text-gray-500">Timeline</div>
                          <div className="font-semibold text-gray-900">
                            {item.timeline}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">
                            Impact Level
                          </div>
                          <div
                            className={`font-semibold ${
                              item.impact === "High"
                                ? "text-emerald-600"
                                : item.impact === "Medium"
                                ? "text-amber-600"
                                : "text-blue-600"
                            }`}
                          >
                            {item.impact}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">
                            Effort Required
                          </div>
                          <div
                            className={`font-semibold ${
                              item.effort === "High"
                                ? "text-red-600"
                                : item.effort === "Medium"
                                ? "text-amber-600"
                                : "text-emerald-600"
                            }`}
                          >
                            {item.effort}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-gray-500">
                            Success Rate
                          </div>
                          <div className="font-semibold text-purple-600">
                            {item.success_probability}%
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-xs text-gray-500">
                          Resources: {item.resources_required} FTEs •
                          Dependencies: {item.dependencies}
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                              style={{ width: `${item.completion_score}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">
                            {item.completion_score}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 mt-6" />
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Investment Decision Framework */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
          <h4 className="text-lg font-bold text-purple-900 mb-4 flex items-center">
            <Briefcase className="w-5 h-5 mr-2" />
            Investment Committee Decision Framework
          </h4>
          <div className="space-y-4">
            {decisionFramework.map((milestone, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-purple-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(milestone.status)}
                    <span className="font-semibold text-purple-900">
                      {milestone.milestone}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-purple-600">
                      {milestone.current_score.toFixed(1)}/
                      {milestone.target_score}
                    </div>
                    <div className="text-xs text-purple-500">
                      {milestone.weight}% weight
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="w-full bg-purple-100 rounded-full h-2">
                    <div
                      className="h-2 bg-purple-500 rounded-full"
                      style={{
                        width: `${
                          (milestone.current_score / milestone.target_score) *
                          100
                        }%`,
                      }}
                    />
                  </div>
                </div>
                <div className="text-xs text-purple-700">
                  Key criteria: {milestone.criteria.slice(0, 2).join(", ")}...
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200">
          <h4 className="text-lg font-bold text-amber-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2" />
            KPI Tracking Dashboard
          </h4>
          <div className="space-y-4">
            {kpiTracking.map((category, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg border border-amber-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-amber-900">
                    {category.category}
                  </span>
                  <span className="text-xs text-amber-600 font-medium">
                    {category.timeline}
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-amber-700">
                    Progress to Target
                  </span>
                  <span className="text-sm font-bold text-amber-800">
                    {category.current_performance}% →{" "}
                    {category.target_performance}%
                  </span>
                </div>
                <div className="w-full bg-amber-100 rounded-full h-2 mb-2">
                  <div
                    className="h-2 bg-amber-500 rounded-full"
                    style={{
                      width: `${
                        (category.current_performance /
                          category.target_performance) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <div className="text-xs text-amber-600">
                  Tracking: {category.kpis.slice(0, 2).join(", ")}...
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Next Steps Summary */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl border border-indigo-200">
        <h4 className="text-lg font-bold text-indigo-900 mb-6 flex items-center">
          <Flag className="w-5 h-5 mr-2" />
          Executive Summary: Next 90 Days
        </h4>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h5 className="font-semibold text-indigo-800 mb-3">
              Immediate Priorities
            </h5>
            <ul className="space-y-2 text-sm">
              {report.investment_recommendation.next_steps.map(
                (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  step: any,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  index: any
                ) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 mr-2 mt-0.5 text-indigo-600 flex-shrink-0" />
                    <span className="text-indigo-800">{step}</span>
                  </li>
                )
              )}
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-indigo-800 mb-3">
              Critical Milestones
            </h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <Clock className="w-4 h-4 mr-2 mt-0.5 text-indigo-600 flex-shrink-0" />
                <span className="text-indigo-800">
                  Complete market validation (30 days)
                </span>
              </li>
              <li className="flex items-start">
                <Target className="w-4 h-4 mr-2 mt-0.5 text-indigo-600 flex-shrink-0" />
                <span className="text-indigo-800">
                  Finalize go-to-market strategy (60 days)
                </span>
              </li>
              <li className="flex items-start">
                <Users className="w-4 h-4 mr-2 mt-0.5 text-indigo-600 flex-shrink-0" />
                <span className="text-indigo-800">
                  Secure key team hires (90 days)
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-indigo-800 mb-3">
              Success Metrics
            </h5>
            <div className="space-y-3">
              <div className="bg-white p-3 rounded-lg border border-indigo-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-600">7.5+</div>
                  <div className="text-xs text-indigo-700">
                    Target Investment Score
                  </div>
                </div>
              </div>
              <div className="bg-white p-3 rounded-lg border border-indigo-100">
                <div className="text-center">
                  <div className="text-lg font-bold text-emerald-600">$2M+</div>
                  <div className="text-xs text-indigo-700">
                    Series A Readiness
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StrategicActionPlan;
