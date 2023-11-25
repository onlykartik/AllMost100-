import * as React from "react";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import AddTaskIcon from "@mui/icons-material/AddTask";
import AdminIcon from '@mui/icons-material/AdminPanelSettings';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "../../global/Header";
import { useRecoilState, useSetRecoilState } from "recoil";
import { newStujectDashboard } from "../../recoil_state";

const columns = [
  { field: "firstName", headerName: "First name" , hide :true},
  { field: "lastName", headerName: "Last name", hide :true },
  {
      field: 'fullName',
      headerName: 'Full name',
      width: 130,
      valueGetter: getFullName
    },
  { field: "email", headerName: "Email", width: 150, isEditable: true },
  { field: "contact", headerName: "Contact", width: 130 },
  { field: "title", headerName: "Title", width: 130 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "dueDates1", headerName: "Due Date", width: 100, valueGetter:dateFormater },
  { field: "scope", headerName: "Scope"},
  { field: "university", headerName: "University", width: "150" },
  { field: "referedName", headerName: "Admin", width: "130", renderCell : adminIcons },
  {
    field: "assignSubject",
    headerName: "Assign Task",
    width: "170",
    renderCell: Scope,
  },
];

function getFullName(params){
    return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
}

function dateFormater(params){
    return `${ new Date(params.row.dueDates1).toLocaleDateString()}`
}


function Scope(params) {
    return (
      <Box>
        <DraggableDialog row={params.row} />
      </Box>
    );
}

function adminIcons(params){
   return(
    <Box display={"flex"} flexDirection={"column"} gap={"5px"}>
    <Button variant="contained" size="small" endIcon={<AdminIcon sx={{color:"#1976d2"}}/>} color="secondary">
         {params.row.referedName.split(",")[0].split("@")[0]}
    </Button>
    <Button variant="contained" size="small" endIcon={<AdminIcon sx={{color:"#1976d2"}}/>} color="secondary">
        {params.row.referedName.split(",")[1].split("@")[0]}
    </Button>
    </Box>
    )
}

function FormDashboard() {
//  const [dashboard, setDashboard] = useState([]);

  const [dashboard,setDashboard] = useRecoilState(newStujectDashboard);
 
  useEffect(() => {
    fetch("http://localhost:5000/formDashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: localStorage.getItem("jwtToken"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setDashboard(data);
        console.log(data)
      })
      .catch((data) => {
        setDashboard([]);
      });
  }, []);

  return (
    <Box m="20px">
      <Header name={"New Subjects"} />
      <DataGrid rows={dashboard} columns={columns} rowHeight={80} />
    </Box>
  );
}


function DraggableDialog({ row }) {
  const [open, setOpen] = React.useState(false);
  const [selectedAssigne, setSeletedAssigne] = useState("")
  const setDashboardState =  useSetRecoilState(newStujectDashboard)


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler=(e)=>{
     e.preventDefault();

     const ticketCreationDetails = {
        newSubject_id :row.id,
        student:{
            fullName : row.firstName +" "+ row.lastName,
            contact : row.contact,
            university : row.university,
            email : row.email,
        },
        subject:{
            title: row.title,
            description : row.description,
            dueDate : row.dueDates1,
            scope : row.scope,
        },
        assignee:{ 
            assigneId : selectedAssigne
        },
        referedName :{
            admin : row.referedName
        }
     }
     console.log(ticketCreationDetails);

     fetch("http://localhost:5000/admin/createTicket",{
        method :"POST",
        headers:{
            "Content-Type": "application/json",
            authorization: localStorage.getItem("jwtToken"),
        },
        body:JSON.stringify(ticketCreationDetails)
     }).then(res => res.json()).then(data=>{
        console.log(data);

        // ReSet Newsubject Dashboard
        setDashboardState((oldDashboardState)=>{
          return oldDashboardState.filter((newSubs=> newSubs.id != row.id? true:false));
        })
     })
  }

  return (
    <React.Fragment>
      <Button
        variant="contained"
        endIcon={<AddTaskIcon />}
        onClick={handleClickOpen}
      >
        add
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <form onSubmit={onSubmitHandler}>
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          {row.title.toUpperCase()}
        </DialogTitle>

        <DialogContent>
        <Typography>Description:</Typography>
        <Typography>{row.description}</Typography>
          <DialogContentText>
            <Stack spacing={"10px"} sx={{paddingTop:"10px"}}>
              <Box display={"none"}> <Typography display={"inline"}>{row.id}</Typography> </Box>
              <Box> <label>Full Name:</label> <Typography  display={"inline"}>{row.firstName + " " + row.lastName}</Typography> </Box>
              <Box> <label> Email:</label> <Typography display={"inline"}>{row.email}</Typography> </Box>
              <Box> <label> Contact:</label> <Typography display={"inline"}>{row.contact}</Typography> </Box>
              <Box> <label> University:</label> <Typography display={"inline"}>{row.university}</Typography> </Box>
              <Box> <label> Admin:</label> <Typography display={"inline"}>{row.referedName}</Typography> </Box>
              <Box><label>1st Due date :</label> <Typography display={"inline"}>{ new Date(row.dueDates1).toLocaleDateString() }</Typography> </Box>
              <Box><label>Assign to:</label> </Box>
            <BasicSelect  selectedAssigne={selectedAssigne} setSeletedAssigne ={setSeletedAssigne}/>  
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleClose}>Subscribe</Button>
        </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}




function BasicSelect({selectedAssigne,setSeletedAssigne}) {
    const [assignes, setAssignee] = useState([]);
//    const [selectedAssigne, setSeletedAssigne] = useState("")
    useEffect(() => {
      fetch("http://localhost:5000/admin/assigns", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken"),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setAssignee(data.assignees);
        })
        .catch((data) => {
          setAssignee([]);
        });
    }, []);
 
    const handleChange = (event) => {
        setSeletedAssigne(event.target.value)
    };
 
    return (
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Mentor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Mentor"
            onChange={handleChange}
            value={selectedAssigne}
          >
            {assignes.map((assigne) => (
              <MenuItem key={assigne.Id} value={assigne.Id}>
                {assigne.Name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    );
  }
   
export default FormDashboard;