export const exportReport = async (filters) => {
  const response = await fetch("/api/report/export", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(filters),
  });
  return response.json();
};
