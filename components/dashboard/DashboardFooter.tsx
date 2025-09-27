const DashboardFooter = () => {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 text-center">
      <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
        <span>© 2025 VentureLens Analytics</span>
        <span>•</span>
        <span>Confidential Investment Analysis</span>
        <span>•</span>
        <span>
          Generated on{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default DashboardFooter;
