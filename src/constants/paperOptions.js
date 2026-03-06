export const RESEARCH_DOMAINS = [
  "Computer Science",
  "Biology",
  "Physics",
  "Chemistry",
  "Mathematics",
  "Social Sciences",
];

export const READING_STAGES = [
  "Abstract Read",
  "Introduction Done",
  "Methodology Done",
  "Results Analyzed",
  "Fully Read",
  "Notes Completed",
];

export const IMPACT_SCORES = ["High Impact", "Medium Impact", "Low Impact", "Unknown"];

export const DATE_RANGE_FILTERS = [
  { label: "This Week", value: "week" },
  { label: "This Month", value: "month" },
  { label: "Last 3 Months", value: "3months" },
  { label: "All Time", value: "all" },
];

export const IMPACT_COLOR_MAP = {
  "High Impact": "hsl(var(--chart-1))",
  "Medium Impact": "hsl(var(--chart-2))",
  "Low Impact": "hsl(var(--chart-3))",
  Unknown: "hsl(var(--chart-5))",
};

export const STAGE_COLOR_MAP = {
  "Abstract Read": "hsl(var(--chart-1))",
  "Introduction Done": "hsl(var(--chart-2))",
  "Methodology Done": "hsl(var(--chart-3))",
  "Results Analyzed": "hsl(var(--chart-4))",
  "Fully Read": "hsl(var(--chart-5))",
  "Notes Completed": "hsl(var(--primary))",
};
