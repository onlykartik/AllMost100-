const path = require("path");
require("dotenv").config();
const { query } = require("./sql_connection");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;


async function addFormData(req, res, next) {
  const formFields = req.body;
  // The database is expecting a date in the correct format, typically in 'YYYY-MM-DD' (e.g., '2023-10-18') for MySQL.
  const inputDate = formFields["dueDates1"];
  const parts = inputDate.split("/");
  formFields["dueDates1"] = `${parts[2]}-${parts[0]}-${parts[1]}`;


  const addedFormData = await query(
    "INSERT INTO new_subjects (firstName, lastName, email, contact, title, description, dueDates1) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      formFields["firstName"],
      formFields["lastName"],
      formFields["email"],
      formFields["contact"],
      formFields["title"],
      formFields["description"],
      formFields["dueDates1"],
    ]
  );


  res.status(200).json(addedFormData);
}


async function getAllformData(req, res, next) {
  const username = req.user.username;
  const passcode = req.user.passcode;
 
    const formData = await query("select * from new_subjects");
    res.status(200).json(formData);
 
}


module.exports = {
  addFormData,
  getAllformData,
};
