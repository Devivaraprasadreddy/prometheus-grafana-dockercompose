const express = require("express");
const path = require("path");
const client = require("prom-client");

const app = express();
const port = 3000;

// Prometheus metrics
const itemsAdded = new client.Counter({
  name: "todo_items_added_total",
  help: "Total number of items added"
});

const itemsDeleted = new client.Counter({
  name: "todo_items_deleted_total",
  help: "Total number of items deleted"
});

// Gauge for live todo count
const currentTodos = new client.Gauge({
  name: "todo_items_current",
  help: "Current number of todos"
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// In-memory todos
let todos = [];
let currentId = 1;

// GET all todos
app.get("/api/todos", (req, res) => {
  res.send(todos);
});

// POST new todo
app.post("/api/todos", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).send({ error: "Task is required" });

  const todo = { id: currentId++, task };
  todos.push(todo);
  itemsAdded.inc();
  currentTodos.set(todos.length); // update gauge
  res.send(todo);
});

// DELETE todo by id
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(400).send({ error: "Todo not found" });

  todos.splice(index, 1);
  itemsDeleted.inc();
  currentTodos.set(todos.length); // update gauge
  res.send({ message: "Todo deleted" });
});

// Health check
app.get("/health", (req, res) => res.send("OK"));

// Metrics
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", client.register.contentType);
  res.end(await client.register.metrics());
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Todo app running on port ${port}`);
});
