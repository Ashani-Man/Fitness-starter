const client = require("./client.cjs");

const createRoutineActivity = async (routine_id, activity_id, count) => {
  try {
    const {
      rows: [routineActivity],
    } = await client.query(`
    INSERT INTO routines_activities (routine_id, activity_id, count)
    VALUES ('${routine_id}', '${activity_id}', '${count}')
    RETURNING *;
    `);
    return routineActivity;
  } catch (error) {
    console.error(error);
  }
};

const getRoutinesActivities = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines_activities;
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRoutineActivity,
  getRoutinesActivities,
};