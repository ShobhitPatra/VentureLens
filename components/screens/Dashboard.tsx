"use client";
import { motion } from "framer-motion";
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
  return (
    <div className="flex flex-col gap-4 md:px-4">
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <ExecutiveSummary report={report} />
        <InvestmentScoreMatrix report={report} />
        <MarketIntelligence report={report} />
        <RiskAssessment report={report} />
        <FinancialProjections report={report} />
        <StrategicActionPlan report={report} />
      </motion.div>
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
