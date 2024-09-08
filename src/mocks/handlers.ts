import { http, HttpResponse } from "msw";

// Initialize with default data from local storage or use empty array if no data is found
const getInitialData = () => {
  const data = localStorage.getItem("documents");
  return data
    ? JSON.parse(data)
    : [
        { type: "bank-draft", title: "Bank Draft", position: 0 },
        { type: "bill-of-lading", title: "Bill of Lading", position: 1 },
        { type: "invoice", title: "Invoice", position: 2 },
        { type: "bank-draft-2", title: "Bank Draft 2", position: 3 },
        { type: "bill-of-lading-2", title: "Bill of Lading 2", position: 4 },
      ];
};

// Handlers for our mock API
export const handlers = [
  // Get documents
  http.get("/api/documents", async () => {
    const data = getInitialData();
    return HttpResponse.json(data);
  }),

  // Add a new document
  http.post("/api/documents", async ({ request }) => {
    const newDocument = await request.json();
    const data = getInitialData();
    data.push(newDocument);
    localStorage.setItem("documents", JSON.stringify(data));
    return HttpResponse.json(newDocument);
  }),

  // Update documents order
  http.put("/api/documents", async ({ request }) => {
    const updatedDocuments = await request.json();
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
    return HttpResponse.json(updatedDocuments);
  }),
];
