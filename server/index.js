const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();

// Middleware to parse JSON in request body
app.use(express.json());

// enable cross origin resource sharing
app.use(cors());

// database credentials for making requests
const dbCredentials = {
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_database",
};

// Insert row into table
app.post("/api/insert", async (req, res) => {
  try {
    // Extract data from the request body
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    const age = req.body.age;

    // Create a MySQL database connection
    const connection = await mysql.createConnection(dbCredentials);

    // Define the SQL query to insert data into a table
    const sqlInsert =
      "INSERT INTO employees (id, name, occupation, age) VALUES (?, ?, ?, ?);";

    // Execute the SQL query with the provided data
    const [results] = await connection.execute(sqlInsert, [
      id,
      name,
      occupation,
      age,
    ]);

    // Close the database connection
    connection.end();

    // Send a success response
    res.status(201).json({ message: "Data inserted successfully", results });
  } catch (error) {
    console.error("Error:", error);
    // Send an error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// retrieve table data
app.get("/api/get", async (req, res) => {
  try {
    // Create a MySQL database connection
    const connection = await mysql.createConnection(dbCredentials);

    // Define the SQL query to fetch data from table
    const sqlGet = "SELECT * FROM employees";

    // Execute the SQL query to fetch data
    const [rows] = await connection.execute(sqlGet);

    // Close the database connection
    connection.end();

    // Send the retrieved data as a JSON response
    res.json(rows);
  } catch (error) {
    console.error("Error:", error);
    // Send an error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Delete row from table
app.delete("/api/delete/:id", async (req, res) => {
  try {
    // Extract the id parameter from the URL
    const id = req.params.id;

    // Create a MySQL database connection
    const connection = await mysql.createConnection(dbCredentials);

    // Define the SQL DELETE query
    const sqlDelete = "DELETE FROM employees WHERE id = ?";

    // Execute the SQL DELETE query
    await connection.execute(sqlDelete, [id]);

    // Close the database connection
    connection.end();

    // Send a success response
    res.status(204).send();
  } catch (error) {
    console.error("Error:", error);
    // Send an error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Update row in table
app.put("/api/update", async (req, res) => {
  try {
    // Extract updated row data from the body
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    const age = req.body.age;

    // Create a MySQL database connection
    const connection = await mysql.createConnection(dbCredentials);

    // Define the SQL UPDATE query
    const sqlUpdate =
      "UPDATE employees SET name = ?, occupation = ?, age = ? WHERE id = ?";

    // Execute the SQL UPDATE query with the provided data and ID
    await connection.execute(sqlUpdate, [name, occupation, age, id]);

    // Close the database connection
    connection.end();

    // Send a success response
    res.status(200).json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    // Send an error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
