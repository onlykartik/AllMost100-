const express = require("express");
const app = express();
const cors = require('cors');

const dashboard = require("./dashBoard_API");
const formApi = require("./formApi");
const middlewares = require("./middlewares");
const comments = require("./comments");


const bodyParser = require("body-parser");


let PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));



app.post("/login", dashboard.login);
app.get(
  "/dashboard",
  middlewares.authenticateJwt,
  dashboard.listSubjectsForReporterAssigneCCs
);


app.post("/filledForm",  formApi.addFormData);
app.get("/formDashboard", middlewares.adminAuthenticateJwt, formApi.getAllformData);
app.get("/admin/assigns", middlewares.adminAuthenticateJwt, dashboard.getAllAssignees);
app.get("/admin/students", middlewares.adminAuthenticateJwt, dashboard.getAllStudents);

app.get("/admin/assigns&userCreds", middlewares.adminAuthenticateJwt, dashboard.getAssignees_StudentCreds);

app.post("/admin/createTicket", middlewares.adminAuthenticateJwt, dashboard.createTicket);

app.post("/admin/createAssignee", middlewares.adminAuthenticateJwt, dashboard.createAssignee);


app.get("/admin/getTicket",middlewares.authenticateJwt, dashboard.getSingleTicket);

app.post("/user/addComment",middlewares.authenticateJwt,comments.addComment)
app.get("/user/getComments", middlewares.authenticateJwt,comments.getComments)


app.listen(PORT,'localhost', (req, res) => {
  console.log(
    "Crops enabled services: That  means anybody can call your API servics at",
    PORT
  );
});
