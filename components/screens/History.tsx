"use client";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowUpRightFromSquare, Loader2 } from "lucide-react";
import Link from "next/link";
import ReportCard from "../history/ReportCard";
import { useCurrentUser } from "@/store/useCurrentUser";
import { useAuthWithConvex } from "@/hooks/useWithConvex";

export function ReportsHistory() {
  const { currentUser } = useCurrentUser();
  const { loading } = useAuthWithConvex();
  const reports = useQuery(
    api.reports.getUserReports,
    currentUser?.email ? { userEmail: currentUser.email } : "skip"
  );
  //  loading state
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center min-h-[200px]">
        <div className="text-lg text-gray-700">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }
  // Not signed in
  if (!currentUser) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center py-12">
        <h1 className="text-3xl font-bold mb-4">Analysis History</h1>
        <p className="text-gray-600 mb-6">
          Please sign in to view your report history
        </p>
        <Link href="/auth" className="">
          <div className="flex items-center justify-center gap-2 text-blue-600 hover:underline">
            Get Started
            <span>
              <ArrowUpRightFromSquare size={14} />
            </span>
          </div>
        </Link>
      </div>
    );
  }

  // Reports loading
  if (reports === undefined) {
    return (
      <div className="h-screen flex justify-center items-center min-h-[200px]">
        <div className="text-lg text-gray-700">
          <Loader2 className="animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-white">
      <div className="flex justify-end  p-2  text-gray-500">
        {reports.length} report{reports.length !== 1 ? "s" : ""} found
      </div>

      {reports.length === 0 ? (
        <div
          className="
          h-screen
          flex flex-col items-center justify-center
        text-center py-12 rounded-lg"
        >
          <h2 className="text-xl font-semibold mb-2">No reports yet</h2>
          <p className="text-gray-600 mb-4">
            Analyze your first startup to see reports here!
          </p>
          <Link href="/" className="">
            <div className="flex items-center justify-center gap-2 text-green-600 hover:underline">
              Start Analysis
              <span>
                <ArrowUpRightFromSquare size={14} />
              </span>
            </div>
          </Link>
        </div>
      ) : (
        <div className="space-y-4 md:px-64 px-1">
          {reports.map((report) => (
            <ReportCard
              key={report._id}
              userId={report.userId}
              reportData={report.reportData}
              created_at={report.created_at}
              originalUrl={report.originalUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
