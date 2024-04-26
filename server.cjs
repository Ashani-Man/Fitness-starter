const log = console.log;
const express = require("express");
const client = require("./db/client.cjs");
const {
  getActivities,
  getActivity,
  createActivity,
  deleteActivity,
} = require("./db/activities.cjs");
const {
  getRoutines,
  getRoutine,
  createRoutine,
  deleteRoutine,
} = require("./db/routines.cjs");
const {
  getRoutinesActivities,
  createRoutineActivity,
} = require("./db/routinesActivities.cjs");
const app = express();
const PORT = 8080;
client.connect();

// middleware
app.use(express.json());


//front-end / back-end communication setup
app.get("/", (req, res) => {
  res.send(`Runing`)
            ;
});

//activities routes
app.get("/api/v1/activities", async (req, res) => {
  const allActivities = await getActivities();

  res.send(allActivities);
});

app.get("/api/v1/activities/:id", async (req, res) => {
  const { id } = req.params;
  const singleActivity = await getActivity(id);
  res.send(singleActivity);
});

app.post("/api/v1/activities", async (req, res) => {
  const { name, description } = req.body;
  const activity = await createActivity(name, description);
  res.send(activity);
});

app.delete("/api/v1/activities/:id", async (req, res) => {
  const { id } = req.params;
  await deleteActivity(id);
  const updatedActivites = await getActivities();
  res.send(updatedActivites);
});

//routines routes
app.get("/api/v1/routines", async (req, res) => {
  const allRoutines = await getRoutines();
  res.send(allRoutines);
});

app.get("/api/v1/routines/:id", async (req, res) => {
  const { id } = req.params;
  const singleRoutine = await getRoutine(id);
  res.send(singleRoutine);
});

app.post("/api/v1/routines", async (req, res) => {
  const { is_public, goal } = req.body;
  const routine = await createRoutine(is_public, goal);
  res.send(routine);
});

app.delete("/api/v1/routines/:id", async (req, res) => {
  const { id } = req.params;
  await deleteRoutine(id);
  const updatedRoutines = await getRoutines();
  res.send(updatedRoutines);
});

//join table routes
app.get("/api/v1/routinesactivities", async (req, res) => {
  const allRoutinesActivities = await getRoutinesActivities();
  res.send(allRoutinesActivities);
});

app.post("/api/v1/routinesactivities", async (req, res) => {
  const { routine_id, activity_id, count } = req.body;
  const routineActivity = await createRoutineActivity(
    routine_id,
    activity_id,
    count
  );
  res.send(routineActivity);
});

app.listen(PORT, () => {
  log("listening on " + PORT);
});