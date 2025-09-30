"use client";

import { useReport } from "@/store/useReport";
import { useRouter } from "next/navigation";

interface ReportCardProps {
  originalUrl: string;
  reportData: string;
  userId: string;
  created_at: number;
}

const ReportCard = ({
  originalUrl,
  reportData,
  created_at,
}: ReportCardProps) => {
  const createdDate = new Date(created_at);
  const { setReport } = useReport();
  const router = useRouter();

  const handleViewDetails = () => {
    try {
      setReport(JSON.parse(reportData));
      router.push("/dashboard");
    } catch (error) {
      console.error("error in report card", error);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="w-24 ">
          <h3 className="text-lg font-semibold ">
            {originalUrl || "Startup Analysis"}
          </h3>
          <p className="text-sm text-gray-500">
            {createdDate.toLocaleDateString()} at{" "}
            {createdDate.toLocaleTimeString()}
          </p>
        </div>
        <div className="">
          <button
            onClick={handleViewDetails}
            className="text-blue-500 hover:text-blue-700 text-sm cursor-pointer"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
export default ReportCard;
