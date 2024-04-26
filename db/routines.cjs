const client = require("./client.cjs");

const createRoutine = async (is_public, goal) => {
  try {
    const {
      rows: [routine],
    } = await client.query(`
    INSERT INTO routines (is_public, goal)
    VALUES ('${is_public}', '${goal}')
    RETURNING *;
    `);
    return routine;
  } catch (error) {
    console.error(error);
  }
};

const getRoutines = async () => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM routines;
    `);
    return rows;
  } catch (error) {
    console.log(error);
  }
};

const getRoutine = async(id)=>{
  try {
    const {
      rows: [routine],
    } = await client.query(`
    SELECT * FROM routines WHERE id = ${id}
    `);
    return routine;
  } catch (error) {
    console.log(error)
  }
}

const deleteRoutine = async (id) => {
  try {
    await client.query(`
    DELETE FROM routines_activities WHERE routine_id = ${id};
    `);

    await client.query(`
    DELETE FROM routines WHERE id = ${id};
    `);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createRoutine,
  getRoutines,
  getRoutine,
  deleteRoutine,
};