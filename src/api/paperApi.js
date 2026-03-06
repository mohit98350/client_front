import { httpClient } from "./httpClient";

const buildSearchParams = (filters) => {
  const params = new URLSearchParams();

  if (filters.readingStage?.length) {
    params.set("readingStage", filters.readingStage.join(","));
  }

  if (filters.researchDomain?.length) {
    params.set("researchDomain", filters.researchDomain.join(","));
  }

  if (filters.impactScore?.length) {
    params.set("impactScore", filters.impactScore.join(","));
  }

  if (filters.dateRange) {
    params.set("dateRange", filters.dateRange);
  }

  return params;
};

export const createPaper = async (paperPayload) => {
  const response = await httpClient.post("/papers", paperPayload);
  return response.data.data;
};

export const fetchPaperLibrary = async (filters) => {
  const params = buildSearchParams(filters);
  const query = params.toString();
  const response = await httpClient.get(query ? `/papers?${query}` : "/papers");
  return response.data.data;
};

export const fetchAnalytics = async () => {
  const response = await httpClient.get("/analytics");
  return response.data.data;
};
