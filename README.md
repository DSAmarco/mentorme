#MentorMe

Build Instructions

Create a new empty folder.

Open the empty folder in Visual Studio Code (VSCode); it should remain empty.

Launch a terminal in Visual Studio Code (VSCode).


Enter and execute the following commands line by line:
* git clone --single-branch -b "main" https://github.com/DSAmarco/mentorme.git .
* cd api
* npm install
* cd ..
* cd client
* npm install --legacy-peer-deps
  
Create an .env file and place it in the 'api' folder with the following format:

MONGO = “MONGO DATABASE KEY HERE”

JWT_KEY = “JWT_KEY STRING HERE, USE ANY RANDOM STRING”

STRIPE = “STRIPE API KEY HERE”

Open two separate terminals in Visual Studio Code (VSCode).

In the first terminal, navigate to the 'client' directory (e.g., .../mentorme/client).

Run “yarn run dev” in this terminal to start the Vite server, which hosts the website.

In the second terminal, navigate to the 'api' directory (e.g., .../mentorme/api).

Run “yarn run start” in this terminal to initiate the MongoDB database.

Run the MentorMe application by going to http://localhost:xxxx/

