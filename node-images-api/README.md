# Node.js Image API

This Node.js API allows you to upload, retrieve, delete images, and shorten their URLs. Follow the steps below to run the application and utilize its functionalities.

## Running the Node.js Application

1. **Clone the Repository**: Clone the repository containing the Node.js application from GitHub.

   ```bash
   git clone https://github.com/MohamedAbotalb/Zetaton_Tasks/tree/develop/node-images-api
   ```

2. Install Dependencies: Navigate into the project directory and install the dependencies using npm or yarn

   ```bash
   cd nodejs-image-api
   npm install or yarn add
   ```

3. Set up Firebase Configuration: Make sure to set up your Firebase configuration by providing the necessary credentials and configuration in the config/firebase.js file.

4. Environment Variables
   Before running the application, ensure to set the following environment variables in a .env file:

   ```bash
   FIREBASE_API_KEY=AIzaSyAF3u1VlkXoF0hMNouOcvE2c51IpBNF0fA
   FIREBASE_AUTH_DOMAIN=node-images-api.firebaseapp.com
   FIREBASE_PROJECT_ID=node-images-api
   FIREBASE_STORAGE_BUCKET=node-images-api.appspot.com
   FIREBASE_MESSAGING_SENDER_ID=1054641879214
   FIREBASE_APP_ID=1:1054641879214:web:c361e5d3fc8716e6de153f
   FIREBASE_MEASUREMENT_ID=G-TZTSQ8XWSC
   PORT=5000
   ```

5. Start the Server: Start the Node.js server to run the application.

   ```bash
   npm start
   ```

The server should now be running on the specified port (default is 5000).

## Using the API Endpoints

You can employ any HTTP client, such as Postman, to interact with the API. Simply utilize the base URL `http://localhost:5000/api` and combine it with the provided endpoints, specifying the appropriate HTTP methods for each interaction.

- Upload Image: Upload an image to Firebase Storage and store its URL in Firestore.

  - Endpoint: POST /images
  - Request Body: Form-data with a field named image containing the image file.
  - Response: Returns the uploaded image data including its ID and URL.

- Get All Images: Retrieve all uploaded images.

  - Endpoint: GET /images
  - Response: Returns an array of image objects with their IDs and URLs.

- Get Image by ID: Retrieve a specific image by its ID.

  - Endpoint: GET /images/:id
  - Response: Returns the image data including its ID and URL.

- Delete Image by ID: Delete a specific image by its ID from Firebase Storage and Firestore.

  - Endpoint: DELETE /images/:id
  - Response: Returns a success message upon successful deletion

- Shorten Image URL: Shorten the URL of a specific image and update it in Firestore.

  - Endpoint: PUT /images/:id/shorten
  - Response: Returns the updated image data including its ID, URL, and shortened URL.
