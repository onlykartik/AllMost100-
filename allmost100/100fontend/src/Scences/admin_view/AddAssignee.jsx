import { Box, Button, TextField, Typography } from "@mui/material";
import Header from "../../global/Header";


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { filteredListOfAssignees, listOfAllAssignees, listOfAllStuAndAssCreds, listOfAllStudents } from "../../recoil_state";
import { useRecoilState, useRecoilValue } from "recoil";



export function AssigneeTable() {
    const [assignees, setAssignees] =useRecoilState(listOfAllAssignees);
    const AssigneeListfromSelector = useRecoilValue(filteredListOfAssignees);


    React.useEffect(() => {
        fetch("http://localhost:5000/admin/assigns", {
          mode :'cors',
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("jwtToken"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setAssignees(data.assignees);
          console.log(data.assignees);

          })
          .catch((data) => {
          
          });
      }, [assignees.length]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell >Name</TableCell>
            <TableCell >EMAIL&nbsp;()</TableCell>
            <TableCell >CC&nbsp;()</TableCell>
            <TableCell >RATING&nbsp;()</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {AssigneeListfromSelector.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell >{row.Id}</TableCell> */}
              <TableCell >{row.Name}</TableCell>
              <TableCell >{row.Email}</TableCell>
              <TableCell >{row.CC}</TableCell>
              <TableCell >{row.Rating}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export function AssigneAndStudentCreds(){

    const [assgAndStu, setAssgAndStu] =useRecoilState(listOfAllStuAndAssCreds);
    React.useEffect(() => {
        fetch("http://localhost:5000/admin/assigns&userCreds", {
          mode :'cors',
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("jwtToken"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            
          console.log(data._assgineAndStuCred);
          setAssgAndStu(data._assgineAndStuCred);
          })
          .catch((data) => {
            setAssgAndStu([])
          });
      }, [assgAndStu.length]);

    return(
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell >USER</TableCell>
            <TableCell >PASSWORD&nbsp;()</TableCell>
          
          </TableRow>
        </TableHead>
        <TableBody>
          {assgAndStu.map((row) => (
            <TableRow
              key={row.ID}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell >{row.ID}</TableCell> */}
              <TableCell >{row.USER}</TableCell>
              <TableCell >{row.PASSWORD}</TableCell>
            
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    )
}

function StudentTable(){
    const [students, setStudents] =useRecoilState(listOfAllStudents);
    React.useEffect(() => {
        fetch("http://localhost:5000/admin/students", {
          mode :'cors',
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("jwtToken"),
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setStudents(data.students);
          console.log(data.students);

          })
          .catch((data) => {
          
          });
      }, [students.length]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {/* <TableCell>ID</TableCell> */}
            <TableCell >Name</TableCell>
            <TableCell >EMAIL&nbsp;()</TableCell>
            <TableCell >University&nbsp;()</TableCell>
            <TableCell >Contact&nbsp;()</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((row) => (
            <TableRow
              key={row.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {/* <TableCell >{row.Id}</TableCell> */}
              <TableCell >{row.Name}</TableCell>
              <TableCell >{row.Email}</TableCell>
              <TableCell >{row.University}</TableCell>
              <TableCell >{row.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CreateAssignee(){
    const initialState = {
        name: '',
        email: '',
        cc: '',
        rating: '',
        contact:''
      };

    const [formData, setFormData] = React.useState(initialState);

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Handle form submission, you can use formData here
      console.log('Form Submitted', formData);

      fetch("http://localhost:5000/admin/createAssignee", {
        mode :'cors',
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: localStorage.getItem("jwtToken"),
        },
        body: JSON.stringify(formData)
      })
        .then((res) => res.json())
        .then((data) => {
          
        alert("assigne creation completed")

        })
        .catch((data) => {
        
        });


    };
    return (
        <form onSubmit={handleSubmit}>
        <Box m={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Box>
        <Box m={2}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </Box>
        <Box m={2}>
          <TextField
            fullWidth
            label="CC"
            name="cc"
            value={formData.cc}
            onChange={handleChange}
          />
        </Box>
        <Box m={2}>
          <TextField
            fullWidth
            label="Rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
          />
        </Box>
        <Box m={2}>
          <TextField
            fullWidth
            label="Contact"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </Box>
        <Box m={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </form>
    )
}


function AddAssignee(){
    return(
        <Box>
            <Header name={"Assignee List"}/>
            <AssigneeTable/>
            <Header name={"Student List"}/>
            <StudentTable/>
            <Header name={"Assignee & Student Credentials"}/>
            <AssigneAndStudentCreds/>
            <Header name={"Create Assignee"}/>
            <CreateAssignee/>
        </Box>
    )
}

export default AddAssignee;