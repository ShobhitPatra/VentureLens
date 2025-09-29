"use client";
import ExecutiveSummary from "../dashboard/sections/ExecutiveSummary";
import InvestmentScoreMatrix from "../dashboard/sections/InvestmentScoreMatrix";
import MarketIntelligence from "../dashboard/sections/MarketIntelligence";
import RiskAssessment from "../dashboard/sections/RiskAssessment";
import StrategicActionPlan from "../dashboard/sections/StrategicActionPlan";
import FinancialProjections from "../dashboard/sections/FinancialProjections";
import DashboardFooter from "../dashboard/DashboardFooter";
import { useReport } from "@/store/useReport";

const Dashboard = () => {
  const { report } = useReport();
  console.log(report);
  return (
    <div className="flex flex-col gap-4 md:px-4">
      <ExecutiveSummary report={report} />
      <InvestmentScoreMatrix report={report} />
      <MarketIntelligence report={report} />
      <RiskAssessment report={report} />
      <FinancialProjections report={report} />
      <StrategicActionPlan report={report} />
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
