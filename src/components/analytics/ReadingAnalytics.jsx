import {
  Bar,
  BarChart,
  CartesianGrid,
  Funnel,
  FunnelChart,
  LabelList,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatCard } from "@/components/shared/StatCard";

const chartPalette = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
  "hsl(var(--primary))",
];

const getChartColorByIndex = (index) => chartPalette[index % chartPalette.length];

const getDynamicStageKeys = (analytics) => {
  if (analytics.funnel?.length) {
    return analytics.funnel.map((item) => item.readingStage);
  }

  if (analytics.stackedDomainStage?.length) {
    return Object.keys(analytics.stackedDomainStage[0]).filter((key) => key !== "researchDomain");
  }

  return [];
};

export function ReadingAnalytics({ analytics, isLoading, isError }) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading analytics...</p>;
  }

  if (isError) {
    return <p className="text-sm text-destructive">Unable to fetch analytics right now.</p>;
  }

  if (!analytics) {
    return <p className="text-sm text-muted-foreground">No analytics data available.</p>;
  }

  const stageKeys = getDynamicStageKeys(analytics);
  const activeStageCount = Object.values(analytics.summary.papersByReadingStage || {}).filter((count) => count > 0).length;
  const completionSubtitle = `${analytics.summary.papersByReadingStage["Fully Read"] || 0} fully read papers`;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard title="Total Papers" value={analytics.summary.totalPapers} />
        <StatCard
          title="Completion Rate"
          value={`${analytics.summary.completionRatePercentage}%`}
          subtitle={completionSubtitle}
        />
        <StatCard title="Active Reading Stages" value={activeStageCount} />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Reading Stage Funnel</CardTitle>
            <CardDescription>Paper count at each reading stage.</CardDescription>
          </CardHeader>
          <CardContent className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel dataKey="count" data={analytics.funnel} isAnimationActive>
                  <LabelList position="right" fill="hsl(var(--foreground))" stroke="none" dataKey="readingStage" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Citations vs Impact Score</CardTitle>
            <CardDescription>Scatter grouping by impact score with citation count on x-axis.</CardDescription>
          </CardHeader>
          <CardContent className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 10 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" dataKey="x" name="Citation Count" />
                <YAxis type="number" dataKey="y" name="Paper Index" allowDecimals={false} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value, key) => {
                    if (key === "x") {
                      return [value, "Citations"];
                    }

                    return [value, key];
                  }}
                />
                <Legend />
                {analytics.scatter.map((series, index) => (
                  <Scatter
                    key={series.impactScore}
                    name={series.impactScore}
                    data={series.points}
                    fill={getChartColorByIndex(index)}
                  />
                ))}
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>Domain × Reading Stage Distribution</CardTitle>
          <CardDescription>Stacked bars showing reading stage spread within each domain.</CardDescription>
        </CardHeader>
        <CardContent className="h-[420px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={analytics.stackedDomainStage} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="researchDomain" angle={-15} textAnchor="end" interval={0} height={80} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              {stageKeys.map((stage, index) => (
                <Bar key={stage} dataKey={stage} stackId="paperStage" fill={getChartColorByIndex(index)} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Papers by Reading Stage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {Object.entries(analytics.summary.papersByReadingStage).map(([stage, count]) => (
              <div key={stage} className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>{stage}</span>
                <span className="font-semibold">{count}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Citations per Domain</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {Object.entries(analytics.summary.averageCitationsPerDomain).map(([domain, avg]) => (
              <div key={domain} className="flex items-center justify-between rounded-md border px-3 py-2">
                <span>{domain}</span>
                <span className="font-semibold">{avg}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
