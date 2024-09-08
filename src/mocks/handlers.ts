import { delay, http, HttpResponse } from "msw";
import { Cat } from "../interface";

// static imports
import staticCats from "./../static/data.json";

const getInitialData = (): Cat[] => {
  const data = localStorage.getItem("servercats");
  return data ? JSON.parse(data) : staticCats;
};

// Handlers for our mock API
export const handlers = [
  // Get cats
  http.get("/api/cats", async () => {
    const data = getInitialData();
    await delay();
    return HttpResponse.json(data);
  }),

  // Update cats order
  http.put("/api/cats", async ({ request }) => {
    const updatedDocuments = await request.json();
    localStorage.setItem("servercats", JSON.stringify(updatedDocuments));
    await delay();
    return HttpResponse.json(updatedDocuments);
  }),

  // Add a new cat
  http.post("/api/cats", async ({ request }) => {
    const newDocument = (await request.json()) as Cat;
    const data = getInitialData();
    data.push(newDocument);
    localStorage.setItem("servercats", JSON.stringify(data));
    return HttpResponse.json(newDocument);
  }),

  // Delete a cat
  http.delete("/api/cats/:id", async ({ params }) => {
    const { id } = params;
    const data = getInitialData();
    const index = data.findIndex((doc) => doc.id === id);
    data.splice(index, 1);
    localStorage.setItem("servercats", JSON.stringify(data));
    return HttpResponse.json({ success: true });
  }),
];
