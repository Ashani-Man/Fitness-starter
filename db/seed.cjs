const client = require("./client.cjs");
const { createActivity } = require("./activities.cjs");
const { createRoutine } = require("./routines.cjs");
const { createRoutineActivity } = require("./routinesActivities.cjs");
const createTables = async () => {
  try {
    await client.query(`
    CREATE TABLE activities (
      id SERIAL PRIMARY KEY,
      name VARCHAR(20) NOT NULL,
      description TEXT NOT NULL
    );

    CREATE TABLE routines (
      id SERIAL PRIMARY KEY,
      is_public BOOLEAN NOT NULL ,
      goal TEXT NOT NULL
    );

    CREATE TABLE routines_activities(
      id SERIAL PRIMARY KEY,
      routine_id INT REFERENCES routines(id) NOT NULL,
      activity_id INT REFERENCES activities(id) NOT NULL,
      count INT NOT NULL
    )
    `);
  } catch (error) {
    console.error(error);
  }
};

const dropTables = async () => {
  try {
    await client.query(`
    DROP TABLE IF EXISTS routines_activities;
    DROP TABLE IF EXISTS routines;
    DROP TABLE IF EXISTS activities;
    `);
  } catch (error) {
    console.error(error);
  }
};

const resetAndSeed = async () => {
  await client.connect();
  console.log("connected to the DB");
  await dropTables();
  await createTables();

  await createActivity("FingerPushups", "two Fingers");
  await createActivity("BenchPress", "Hands on barbell");
  await createActivity("Running", "Start slow then go faster");
  await createRoutine(true, "Stronger");
  await createRoutine(false, "Unhealthy");
  await createRoutine(true, "6 pack");
  await createRoutineActivity(1, 1, 25);
  await createRoutineActivity(2, 3, 1);
  await createRoutineActivity(3, 1, 30);
  await createRoutineActivity(3, 2, 20);
  await createRoutineActivity(3, 3, 1);
  await client.end();
};
resetAndSeed();
console.log('Server Running')