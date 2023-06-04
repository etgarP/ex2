# Ex2 for Advanced Programming Class

This repository contains an advanced programming assignment where we have developed a client-side web application connected to a server. The server utilizes MongoDB with Mongoose and follows the provided API specifications. We have also implemented real-time communication between clients using Socket.IO.

## Server

The server is responsible for handling the following API endpoints:

### Chats

- **GET /api/Chats**: Retrieves all users we have chatted with, including their respective chat IDs and the last message exchanged.
- **POST /api/Chats**: Creates a new chat with another user.
- **GET /api/Chats/{id}**: Retrieves a specific chat by its ID.
- **DELETE /api/Chats/{id}**: Deletes a chat by its ID.
- **POST /api/Chats/{id}/Messages**: Adds a new message to a chat.
- **GET /api/Chats/{id}/Messages**: Retrieves all messages for a particular chat.

### Tokens

- **POST /api/Tokens**: Creates a new token for a user after verifying their username and password.

### Users

- **GET /api/Users/{username}**: Retrieves the necessary user information for the chat page.
- **POST /api/Users**: Registers a new user.

## Client-Side Integration

We have established a connection between the clients and the server using Socket.IO. This integration allows for real-time messaging between users. When a user sends a message to another user, the recipient immediately sees the message on their chat page or contact list. Even if the messaging page with a specific user is not open, the contact area on the left still receives updates, and a notification is displayed.

## Running the Site

To run the web application, please follow these steps:

1. Navigate to the "whatsapp" folder in your terminal or command prompt.
2. Run the following command to install the required dependencies:
npm install
3. Similarly, navigate to the "server" folder in your terminal or command prompt.
4. Run the following command to install the server dependencies:
npm install
5. Go to the "server" folder and start the server by running:
npm start
6. You can now access the web application by opening the following URL in your browser:
http://localhost:12345/
7. Start using the site and enjoy the real-time messaging functionality!

Thank you for using our application!
