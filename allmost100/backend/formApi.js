const path = require("path");
require("dotenv").config();
const { query } = require("./sql_connection");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;


async function addFormData(req, res, next) {

  const formFields = req.body;
  const ref1 = formFields.reference.split(',')[0].concat("@gmail.com");
  const ref2 = formFields.reference.split(',')[1].concat("@gmail.com");
  formFields.reference = ref1 +',' + ref2;

  console.log(ref1 +" "+ ref2);


  const addedFormData = await query(
    "INSERT INTO new_subjects (firstName, lastName, email, contact, title, description, dueDates1,university,referedName) VALUES (?, ?, ?, ?, ?, ?, ? ,? ,?)",
    [
      formFields["firstName"],
      formFields["lastName"],
      formFields["email"],
      formFields["contact"],
      formFields["title"],
      formFields["description"],
      formFields["dueDates1"],
      formFields["university"],
      formFields["reference"],
      
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
