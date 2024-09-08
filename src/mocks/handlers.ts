import { http, HttpResponse } from "msw";
import { Cat } from "../interface";

// static imports
import staticCats from "./../static/data.json";

// Initialize with default data
let cats: Cat[] = staticCats;

// Handlers for our mock API
export const handlers = [
  // Get cats
  http.get("/api/cats", async () => {
    // const data = getInitialData();
    return HttpResponse.json(cats);
  }),

  // Update cats order
  http.put("/api/cats", async ({ request }) => {
    const updatedCats = (await request.json()) as Cat[];
    cats = updatedCats;
    // Can Do: write data.json with updated cats
    return HttpResponse.json(cats);
  }),
];
