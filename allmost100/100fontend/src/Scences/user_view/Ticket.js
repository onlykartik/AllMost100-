import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import { useParams } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
const { Box, Typography, Card, CardContent, Stack } = require("@mui/material");
const { default: Header } = require("../../global/Header");
const { useEffect, useState } = require("react");

const discriptionCss ={
    width:"97.4%",
    border: "2px solid",
    borderLeftWidth: "5px",  
    borderLeftColor: "#1976d2",  
    padding: "10px",
    borderTopWidth :"0px",
    borderBottomWidth :"0px", 
    borderRightColor : "#1976d2",
    minHeight: "100px"
}
const commentsCss ={
    width:"100%",
    padding: "10px",
    borderTopWidth :"0px",
    borderBottomWidth :"0px", 
    borderRightColor : "#1976d2",
    minHeight: "500px"
}

const titleCss ={
    padding :"10px",
    borderRadius :"0px", 
    width:"97.4%",

    border: "2px solid",
    borderLeftWidth: "5px",  
    borderLeftColor: "#1976d2",  
    padding: "10px",
    borderTopWidth :"0px",
    borderBottomWidth :"0px", 
    borderRightColor : "#1976d2",
   
}


function Ticket(){
    const { id } = useParams();
    console.log(id);
     const [ticket, setTicket] = useState([]);


    useEffect(()=>{
        fetch(`http://localhost:5000/admin/getTicket?${id}`,{
        method:"Get",
        headers:{
            "Content-Type": "application/json",
            "authorization" : localStorage.getItem("jwtToken"),
            "ticketid" : id
        }
    }).then((res)=> res.json()).then((data)=>{
        console.log(data)
        setTicket(data)
    }).catch(()=>{
        setTicket([]);
    })
    },[id])

    return(
        <Box sx={{width:"95vw", display:"flex", flexDirection:"column", gap:"5px"}}>
            
            <Card sx={{width:"100%"}}>
            <Box sx={titleCss}> 
            <Stack direction={"row"} textAlign={"center"}>
                <TitleIcon fontSize={"smaller"}/>
               <Typography fontSize={"larger"}> {ticket?.subjectObject?.[0]?.title} </Typography>
            </Stack>
            </Box>
            </Card>
            
            <Card sx={{width:"75%"}}>
                <Box sx={discriptionCss}>
                        <Stack direction={"row"} textAlign={"center"}>
                        <DescriptionIcon/> <Typography fontSize={"smaller"} fontWeight={"bold"}>Description:</Typography> 
                        </Stack>
                <Typography> {ticket?.subjectObject?.[0]?.discription}</Typography>
                </Box>
            </Card>

            <Card sx={{width:"75%", borderRadius:"25px"}}>
                <Box sx={commentsCss}>
                        <Stack direction={"row"} textAlign={"center"}>
                        <QuestionAnswerIcon/> <Typography fontSize={"smaller"} fontWeight={"bold"}>Comments:</Typography> 
                        </Stack>
                </Box>
            </Card>
            

            <Card sx={{
                 position:"fixed", right:"0px", top:"70px", width :"22vw", height:"40vw", borderRadius:"25px", backgroundColor:"#1976d2", color:"white",
                 }}>
                <Box sx={{padding:"10px", display:"flex", flexDirection:"column", gap:"35px"}} >
                     <Stack direction={"column"} textAlign={"center"}>
                        <Typography> Admin</Typography>
                        <Typography>{ticket?.subjectObject?.[0]?.admin}</Typography>
                     </Stack>
                     <Stack direction={"column"} textAlign={"center"}>
                        <Typography> Reporter</Typography>
                        <Typography>{ticket?.subjectObject?.[0]?.student[0].Name}</Typography>
                        <Typography>{ticket?.subjectObject?.[0]?.student[0].Email}</Typography>
                        <Typography>{ticket?.subjectObject?.[0]?.student[0].university}</Typography>
                     </Stack>
                     <Stack direction={"column"} textAlign={"center"}>
                        <Typography> Assignee</Typography>
                        <Typography>{ticket?.subjectObject?.[0]?.assignee[0].Name}</Typography>
                        <Typography>{ticket?.subjectObject?.[0]?.assignee[0].Email}</Typography>
                     </Stack>
                     <Stack direction={"row"} justifyContent={"center"}>
                        <Typography> Is Closed</Typography>
                        <Typography>{ticket?.subjectObject?.[0]?.closed}</Typography>
                     </Stack>

                     <Stack direction={"column"} textAlign={"center"}>
                        <Typography> Due dates</Typography>
                        <Typography>{ticket?.subjectObject?.[0]?.deadLines}</Typography>
                     </Stack>
                </Box>
            </Card>
  
        </Box>
    )
}
export default Ticket;