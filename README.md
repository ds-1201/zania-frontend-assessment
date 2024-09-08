<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Documentation</title>
</head>
<body>

<h1>Project Documentation</h1>

<h2>Overview</h2>

<p>This project is a simple React-based document management interface with drag-and-drop functionality. It uses external libraries such as <code>react-beautiful-dnd-grid</code> for drag-and-drop, <code>react-modal</code> for modal functionality, and <code>msw</code> (Mock Service Worker) to simulate backend API responses within the browser. The state of the data is saved in browser storage to ensure persistence across reloads.</p>

<h2>File and Folder Structure</h2>

<p>Here’s a look at the structure of the project:</p>

<pre>
/public
/src
  ├── /components/card
  │     ├── Card.module.css
  │     ├── Card.tsx
  ├── /interface
  │     └── index.tsx
  ├── /mocks
  │     ├── browser.ts
  │     └── handlers.ts
  ├── /static
  │     └── data.json
  ├── /utils
  │     └── index.ts
  ├── App.tsx
  ├── index.tsx
  ├── index.css
  ├── react-app-env.d.ts
/.gitignore
/package-lock.json
/package.json
/README.md
/tsconfig.json
</pre>

<h3>Key Files:</h3>
<ul>
  <li><strong><code>components/card</code></strong>: Contains the <code>Card.tsx</code> component responsible for rendering individual document cards.</li>
  <li><strong><code>mocks/</code></strong>: This directory contains the MSW-related files that mock the server (<code>browser.ts</code> initializes the worker, and <code>handlers.ts</code> defines the API handlers).</li>
  <li><strong><code>static/data.json</code></strong>: The static JSON file that holds the initial data of the documents.</li>
  <li><strong><code>App.tsx</code></strong>: Main application logic, handling rendering and interactions.</li>
  <li><strong><code>utils/index.ts</code></strong>: Contains utility functions (for example, functions to sort).</li>
</ul>

<h2>How to Run the React App Locally</h2>

<p>This project was bootstrapped with <strong>Create React App</strong>.</p>

<h3>Prerequisites:</h3>
<ul>
  <li>Node.js and npm installed.</li>
</ul>

<h3>Steps to Run:</h3>
<ol>
  <li><strong>Clone the repository</strong>:<br>
  Run the following command:
  <pre><code>git clone https://github.com/ds-1201/zania-frontend-assessment.git</code></pre>
  </li>
  
  <li><strong>Install dependencies</strong>:<br>
  Run the following command to install the project dependencies:
  <pre><code>npm install</code></pre>
  </li>
  
  <li><strong>Start the mock service worker (MSW)</strong>:<br>
  MSW is integrated into the development setup and will start automatically in the background when the app is running.
  </li>
  
  <li><strong>Run the app</strong>:<br>
  Start the application locally using:
  <pre><code>npm start</code></pre>
  By default, the app will be available at <code>http://localhost:3000/</code>.
  </li>
</ol>

<h2>How to Run Using Docker</h2>

<h3>Prerequisites:</h3>
<ul>
  <li>Docker and Docker Compose installed.</li>
</ul>

<h3>Steps to Run:</h3>
<ol>
  <li><strong>Build the Docker image</strong>:<br>
  Run the following command to build the Docker image:
  <pre><code>docker-compose up --build</code></pre>
  </li>
  
  <li><strong>Access the app</strong>:<br>
  Once the containers are running, you can access the app at <code>http://localhost:3000</code>.
  </li>
  
  <li><strong>Shut down</strong>:<br>
  To stop the containers, run:
  <pre><code>docker-compose down</code></pre>
  </li>
</ol>

<h2>Thought Process Behind External Packages</h2>

<ol>
  <li><strong><code>react-beautiful-dnd-grid</code></strong>:<br>
  I chose this package because the popular <code>react-beautiful-dnd</code> is not maintained anymore, and its forked version, <code>@hello-pangea/dnd</code>, does not have inbuilt grid support. Since this project required grid support for drag-and-drop functionality, <code>react-beautiful-dnd-grid</code> was a better fit. It allows us to keep the implementation simple without writing custom logic for grids. While it may not be production-ready and has certain limitations, it is sufficient for the scope of this project, where there is no heavy focus on design or complex interactions. By selecting this package, I could focus on the core functionality of the task without over-engineering the solution.</li>
  
  <li><strong><code>react-modal</code></strong>:<br>
  This package was used to display images in an overlay modal upon clicking a card. It is lightweight, highly customizable, and provides accessibility features out-of-the-box. Additionally, it simplifies managing focus and closing the modal via the ESC key.</li>
  
  <li><strong><code>moment</code></strong>:<br>
  Moment.js is used to display how long ago the last save occurred in human-readable time, such as "a few seconds ago." While it's a large library, it's perfect for handling date formatting with ease and clarity.</li>
  
  <li><strong><code>msw</code> (Mock Service Worker)</strong>:<br>
  MSW for mocking API responses in the browser. This allows the application to simulate API calls without needing an actual backend server. MSW integrates easily into the development environment and offers a clean way to handle mock requests/responses, making it ideal for front-end-focused projects like this one.</li>
</ol>

<h2>Logic Overview</h2>

<p>The core logic of this project revolves around:</p>

<ol>
  <li><strong>Drag-and-drop functionality</strong>: Implemented using <code>react-beautiful-dnd-grid</code>, this allows users to reorder the cat cards. The <code>position</code> field in the JSON data is updated based on the new order after dragging.</li>

  <li><strong>Image overlay</strong>: On clicking a card, a modal opens, displaying the corresponding document image in an overlay. The modal can be closed by pressing the ESC key or clicking outside the image.</li>
  
  <li><strong>State persistence</strong>: The data is fetched and saved to the browser's local storage using the mock API from MSW. This ensures that the document order persists across page reloads.</li>
  
  <li><strong>Saving logic</strong>: The frontend calls the mock API every 5 seconds (not after every drag event) to save the current state of the cards. This reduces the number of unnecessary API calls and provides a user-friendly experience by showing how long ago the last save was made.</li>
  
  <li><strong>Spinner on image load</strong>: A placeholder spinner is displayed while the images are being loaded, providing a visual indication to users when the image has not yet fully loaded.</li>
</ol>

<p>This documentation provides an overview of how to use the application locally and via Docker, along with details on the thought process behind architectural decisions and package selection.</p>

</body>
</html>
