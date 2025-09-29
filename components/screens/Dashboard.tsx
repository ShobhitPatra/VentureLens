"use client";
import ExecutiveSummary from "../dashboard/sections/ExecutiveSummary";
import InvestmentScoreMatrix from "../dashboard/sections/InvestmentScoreMatrix";
import MarketIntelligence from "../dashboard/sections/MarketIntelligence";
import RiskAssessment from "../dashboard/sections/RiskAssessment";
import StrategicActionPlan from "../dashboard/sections/StrategicActionPlan";
import FinancialProjections from "../dashboard/sections/FinancialProjections";
import DashboardFooter from "../dashboard/DashboardFooter";
import { useReport } from "@/store/useReport";
import VoiceQAAssistant from "../VoiceQAAssistant";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const Dashboard = () => {
  const { report } = useReport();
  console.log(report);
  const router = useRouter();
  // useEffect(() => {
  //   if (!report) {
  //     router.replace("/");
  //   }
  // }, [report, router]);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="relative">
            <Loader2 className="w-8 h-8 text-orange-600 font-thin animate-spin mx-auto" />
            <div className="absolute inset-0 blur-xl bg-orange-400 opacity-20 animate-pulse"></div>
          </div>
          <div>
            <p className="text-gray-800 text-md font-semibold">
              Loading Analysis Dashboard
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 md:px-4">
      <ExecutiveSummary report={report} />
      <InvestmentScoreMatrix report={report} />
      <MarketIntelligence report={report} />
      <RiskAssessment report={report} />
      <FinancialProjections report={report} />
      <StrategicActionPlan report={report} />
      <div id="voice-qa-assistant">
        <VoiceQAAssistant report={report} />
      </div>
      <DashboardFooter />
    </div>
  );
};

export default Dashboard;
