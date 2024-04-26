const client = require('./client.cjs')

const createActivity = async(name, description)=>{
  try {
    const {rows: [activity]} = await client.query(`
    INSERT INTO activities (name, description)
    VALUES ('${name}', '${description}')
    RETURNING *;
    `);
    return activity
  } catch (error) {
    console.error(error)
  }
}


const getActivities= async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM activities;
    `);
    return rows;
  } catch(error) {
    console.log(error);
  }
}

const getActivity = async(id)=>{
  try {
    const {rows: [activity]} = await client.query(`
    SELECT * FROM activities WHERE id = ${id}
    `)
    return activity;
  } catch (error) {
    console.log(error)
  }
}

const deleteActivity = async(id)=>{
  try {

    await client.query(`
    DELETE FROM routines_activities WHERE activity_id = ${id};
    `);

    await client.query(`
    DELETE FROM activities WHERE id = ${id};
    `);

  } catch (error) {
    console.log(error);
  }
  }


module.exports = {
  createActivity,
  getActivities,
  getActivity,
  deleteActivity
}