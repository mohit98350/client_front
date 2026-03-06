import { useQuery } from "@tanstack/react-query";
import { fetchAnalytics } from "@/api/paperApi";
import { ReadingAnalytics } from "@/components/analytics/ReadingAnalytics";

export function AnalyticsPage() {
  const analyticsQuery = useQuery({
    queryKey: ["analytics"],
    queryFn: fetchAnalytics,
  });

  return (
    <ReadingAnalytics
      analytics={analyticsQuery.data}
      isLoading={analyticsQuery.isLoading}
      isError={analyticsQuery.isError}
    />
  );
}
