const path = require("path");
/* configs .env accessable globaly */
require("dotenv").config();
const { query } = require("./sql_connection");


const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;

async function addComment(req, res, next){
    const { username, passcode } = req.user;

    const  {commentedText,postedBy,postedEmail,subjectId,createdAt} = req.body
    console.log(typeof commentedText)

    const comment = await query(
        'INSERT INTO comments (CommentText, PostedBy, PostedByEmail, SubjectId, CreatedAt) VALUES (?, ?, ?, ?, ?)',
        [commentedText, postedBy, postedEmail, Number.parseInt(subjectId), new Date(createdAt)]
      );
    
    if(comment){
        res.status(200).json({  message:"success" });
    }else{
        res.status(500).json({ message:"fail" });
    }
}


async function getComments(req, res, next){
    const {authorization,subjectid} =  req.headers;
    console.log(authorization+" subject id "+ Number.parseInt (subjectid))
    const allComments = await query(`select * from comments where SubjectId =${subjectid}`);

    res.status(200).json({  comments:allComments });
}    

module.exports ={
    addComment,
    getComments
}