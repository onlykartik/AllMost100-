const path = require("path");
/* configs .env accessable globaly */
require("dotenv").config();
const { query } = require("./sql_connection");


const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;


function handleRoot(req, res) {

  res.sendFile(path.join(__dirname, "/index.html"));
  res.status(200).json({ message: "comming soon" });
}

async function login(req, res, next) {

  const { username, passcode } = req.body;

  // verify password of user(assigne,student)/admin
  const stu_asg = await query(`select * from usercredentials`);
  const userAdmin = await query(`select * from admincredentials`);



  const isUserStu_Asg = stu_asg.find((user) => {
    return user.USER === username && user.PASSWORD === passcode;
  });


  const isUserAdmin = userAdmin.find((user) => {
    return user.USER == username && user.PASSWORD == passcode;
  });


  if (isUserStu_Asg) {
    const token = jwt.sign({ username, passcode }, secret, { expiresIn: "2h" });
    res.status(200).json({ message: "Success", role: "User(student/assigne)", token });

  } else if (isUserAdmin) {    
    const token = jwt.sign({ username, passcode }, secret, { expiresIn: "2h" });
    res.status(200).json({ message: "Success", role: "Admin", token });
  } else {
    res.status(500).json({ message: "No user found" });
  }
}


async function listSubjectsForReporterAssigneCCs(req, res, next) {

  const { username, passcode } = req.user;

  // fetch all student/assignee and decide who is the username
  const students  = await query("select * from student");
  const assignees = await query("select * from assignee");
  const CCs       = await query("select * from subject");

  const isUserStudent = students.find((stu) => stu.Email === username);
  const isUserAssignee = assignees.find((assigne) => assigne.Email === username);


  const isUserCC = CCs.find((cc) => {
    const ccMembers = cc.CC;
    const ccList = ccMembers.split(",");
    return ccList.find((cc) => cc === username);
  });

  if (isUserStudent) {
    console.log(isUserStudent +" is user ***student*** "+ username);

    const stuSubjects = await query("select * from subject where studentId=?", [isUserStudent.Id,]);
    const subjects =
    await Promise.all(
    stuSubjects.map(async subject =>{
      const aSubject = {
        id : subject.Id,
        title :subject.SubjectTitle,
        discription :subject.SubjectDescription,
        deadLines : JSON.stringify(subject.DeadlineDates),
        admin :subject.CC,
        closed : subject.Closed,
        student : await query("select * from student where Id =?;",[subject.StudentID]) ,
        assignee : await query("select * from assignee where Id =?;",[subject.AssigneeID]) ,
      };
      return aSubject  
    })
    );
    res.status(200).json({ role: "student", subjects });

  } else if (isUserAssignee) {
    console.log(isUserAssignee +" is user ***assigne*** "+ username);

    const stuSubjects = await query("select * from subject where AssigneeId=?",[isUserAssignee.Id]);

    const subjects =
    await Promise.all(
    stuSubjects.map(async subject =>{
      const aSubject = {
        id : subject.Id,
        title :subject.SubjectTitle,
        discription :subject.SubjectDescription,
        deadLines : JSON.stringify(subject.DeadlineDates),
        admin :subject.CC,
        closed : subject.Closed,
        student : await query("select * from student where Id =?;",[subject.StudentID]) ,
        assignee : await query("select * from assignee where Id =?;",[subject.AssigneeID]) ,
      };
      return aSubject  
    })
    );

    res.status(200).json({ role: "assignee", subjects });

  } else if (isUserCC) {
    console.log(isUserAssignee +" is user ***CC*** "+ username);
    const ccOwnedSubjectList = CCs.filter((cc) =>cc.CC.split(",").some((c) => c === username));

    const subjects =
    await Promise.all(
    ccOwnedSubjectList.map(async subject =>{
      const aSubject = {
        id : subject.Id,
        title :subject.SubjectTitle,
        discription :subject.SubjectDescription,
        deadLines : JSON.stringify(subject.DeadlineDates),
        admin :subject.CC,
        closed : subject.Closed,
        student : await query("select * from student where Id =?;",[subject.StudentID]) ,
        assignee : await query("select * from assignee where Id =?;",[subject.AssigneeID]) ,
      };
      return aSubject  
    })
    );

    res.status(200).json({ role: "Admin", subjects });
  } else {

    res.status(500).json({ message: "user is not authorized" });
  }
}


async function getAllAssignees(req, res, next){

  const assignees = await query("select * from assignee");
  if(assignees){
    res.status(200).json({role:"admin", assignees})
  }else{
    res.status(500).json({message:"no assignees"})
  }
}

async function createTicket(req, res, next){

  const ticketDetails= (req.body);

 const studentIsExist = await query(`select * from student where Email ='${ticketDetails.student.email}'`)
 if(studentIsExist.length <=0){
  console.log("User as Student with Email id "+ ticketDetails.student.email +" is **NOT FOUND** ")
  const createStudent =  await query(`INSERT INTO student (Name,Email,university) values('${ticketDetails.student.fullName}', '${ticketDetails.student.email}', '${ticketDetails.student.university}')`);
  const studentId = createStudent.insertId;
  const assigneId = ticketDetails.assignee.assigneId;
  const dueDates = {
    one: ticketDetails.subject.dueDate,
    two: ""
  };
  
  const dueDatesJSON = JSON.stringify(dueDates);
  
const createSubject =
await query(`INSERT INTO subject (SubjectTitle, SubjectDescription, DeadlineDates, CC, Closed, StudentID, AssigneeID)
             VALUES('${ticketDetails.subject.title}','${ticketDetails.subject.description}','${dueDatesJSON}','${ticketDetails.referedName.admin}',${0},${Number.parseInt(studentId)},${Number.parseInt(assigneId)})`);

             console.log(createSubject)
  const newSubject_id = Number.parseInt(ticketDetails.newSubject_id);
  const deleteNewSubject = await query(`DELETE FROM new_subjects WHERE id=${newSubject_id} `);
              
  res.status(200).json({message:"deleted from new_subjects and inserted in student and subject", createSubject})
 }else if(studentIsExist.length >0){
  console.log("User as Student with Email id "+ ticketDetails.student.email +" is **FOUND** ")
  const studentId = studentIsExist[0].Id;
  const assigneId = ticketDetails.assignee.assigneId;
  const dueDates = {
    one: ticketDetails.subject.dueDate,
    two: ""
  };
  const dueDatesJSON = JSON.stringify(dueDates);

  const createSubject =
await query(`INSERT INTO subject (SubjectTitle, SubjectDescription, DeadlineDates, CC, Closed, StudentID, AssigneeID)
             VALUES('${ticketDetails.subject.title}','${ticketDetails.subject.description}','${dueDatesJSON}','${ticketDetails.referedName.admin}',${0},${Number.parseInt(studentId)},${assigneId})`);

 const newSubject_id = Number.parseInt(ticketDetails.newSubject_id);
 const deleteNewSubject = await query(`DELETE FROM new_subjects WHERE id=${newSubject_id} `)            
res.status(200).json({message:"student already exist updates subject and deleted from new_subjects ", createSubject})
}

}


async function getSingleTicket(req, res, next){

  const {authorization, ticketid}=req.headers ;  
  if(!ticketid){
    res.status(500).json({ role: "admin", message:"Not found for now send request after 2 days" });
  }
  const aSubject = await query("select * from subject where Id=?",[ Number.parseInt(ticketid)]);

  const subjectObject =
  await Promise.all(
    aSubject.map(async subject =>{
    const subjectFullInfo = {
      id : subject.Id,
      title :subject.SubjectTitle,
      discription :subject.SubjectDescription,
      deadLines : JSON.stringify(subject.DeadlineDates),
      admin :subject.CC,
      closed : subject.Closed,
      student : await query("select * from student where Id =?;",[subject.StudentID]) ,
      assignee : await query("select * from assignee where Id =?;",[subject.AssigneeID]) ,
    };
    return subjectFullInfo  
  })
  );

  res.status(200).json({ role: "admin/User", subjectObject });
}

module.exports = {
  handleRoot,
  login,
  listSubjectsForReporterAssigneCCs,
  getAllAssignees,
  createTicket,
  getSingleTicket
};
