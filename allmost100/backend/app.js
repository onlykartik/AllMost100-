const dashboard = require("./dashBoard_API");
const formApi = require("./formApi");
const middlewares = require("./middlewares");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");


let PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "/index.html"));
  res.status(200).json({ message: "comming soon" });
});
app.post("/login", dashboard.login);
app.get(
  "/dashboard",
  middlewares.authenticateJwt,
  dashboard.listSubjectsForReporterAssigneCCs
);
app.post("/filledForm", formApi.addFormData);
app.get("/formDashboard", middlewares.adminAuthenticateJwt, formApi.getAllformData);
app.get("/admin/assigns", middlewares.adminAuthenticateJwt, dashboard.getAllAssignees )
app.post("/admin/createTicket",middlewares.adminAuthenticateJwt, dashboard.createTicket )
app.get("/admin/getTicket",middlewares.authenticateJwt, dashboard.getSingleTicket )


app.listen(PORT, () => {
  console.log(
    "Crops enabled services: That  means anybody can call your API servics at",
    PORT
  );
});
