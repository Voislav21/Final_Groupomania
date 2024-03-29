# Groupomania Documentaion
visit - https://groupomania-voislav.com

This documentation provides instructions on how to set up and run the "Groupomania" application locally. The application is built using React and Express, with a MySQL database. Additionally, a SQL dump file is included to help you populate your database with initial data.

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

Node.js (v14.x or later)  
npm (Node Package Manager)  
MySQL (v8.x or later)  

## Getting Started

1. Clone the Repository: Clone the repository from GitHub to your local machine using the following command:  
  ```git clone https://github.com/Voislav21/Final_Groupomania.git```   
3. Install Dependencies: Navigate to the project directory and install the project dependencies for both the frontend and backend:  
   ```cd Final_Groupomania```   
   ```cd frontend```   
   ```npm install```   
   ```cd backend```   
   ```npm install```  
5. Database Setup:  
 .Create a MySQL database for your project.  
 .Import the SQL dump file located in the project's root directory:  
  ```mysql -u your-username -p your-database-name < project-dump.sql```  
Alternitavley you can just copy and paste the dumpfile into your IDE (workbench) and run the query. This will populate and create all the schemas.   
7. Configuration:   
 .Create an uploads folder in the root of the backend directory.   
 .Create a .env file in the root of the backend directory.  
 .Provide the necessary environment variables in the .env file, including database credentials and other configurations. For example:   
```DB_HOST=localhost```   
```DB_USER=your-username```   
```DB_PASSWORD=your-password```   
```DB_DATABASE=your-database-name```  
8. Run the backend:   
```cd backend```   
```npm start```  
10. Run the frontend:   
```cd frontend```   
```npm run dev```  
## Accessing the Application
Open your web browser and navigate to http://localhost:3000 to access the running React app.  
## ATTENTION!  
*It is crucial that you use http://localhost:3000 and not the other link in the terminal output!*

## Notes
This documentation provides a basic setup guide. Depending on your environment and requirements, you may need to modify some steps.
Remember to secure your environment variables and sensitive information.
Feel free to explore and customize the application to your needs!   

## Github repository   
[github repo] (https://github.com/Voislav21/Final_Groupomania.git)
