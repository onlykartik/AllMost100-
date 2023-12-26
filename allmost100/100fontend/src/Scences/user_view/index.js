import { AppBar, Box, Card, CardContent, Stack, Toolbar, Typography } from "@mui/material";
import Header from "../../global/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function TicketDashboard(){

    const [tickets, setTicket]=useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        fetch("http://localhost:5000/dashboard",{
            mode :'cors',
            method :"Get",
            headers :{
                "Content-Type": "application/json",
                "authorization" : localStorage.getItem("jwtToken")
            },
        }).then(res=> res.json()).then(data =>{
            setTicket(data.subjects);
        }).catch(()=>{
            setTicket([]);
        })
    },[]);

    const onTicketClickHandler =(ticketId)=>{
        console.log(ticketId)
        navigate(`/ticket/dashboard/ticket/${ticketId}`);

    }
    return(
        <Box margin={"20px"}>
            <Header name={"Ticket Dashboard"}/>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography flex={1.4} variant="h6" color="inherit" component="div">
                        Subject
                    </Typography>
                    <Typography flex={1.6} variant="h6" color="inherit" component="div">
                        Student Name & University
                    </Typography>
                    <Typography flex={0.7} variant="h6" color="inherit" component="div">
                        Assignee
                    </Typography>
                    </Toolbar>
            </AppBar>
            {tickets.map(ticket=>{
                return(
                    <Card sx={{ marginBottom:"2px"}} key={ticket.id} onClick={()=>{onTicketClickHandler(ticket.id)}}>
                        <CardContent>
                            <Stack display={"flex"} direction={"row"}  flexWrap={"wrap"}>
                                <Typography flex={1.4} fontSize={"18px"}>{ticket.title}</Typography>
                                <Typography flex={1.6} fontSize={"18px"}>{ticket.student[0].Name} <strong style={{ fontSize: '12px',color:"#1976d2" }}>{ticket.student[0]?.university?.toUpperCase() || "N/A"} </strong></Typography>
                                <Typography flex={0.7} fontSize={"18px"}>{ticket.assignee[0].Name}</Typography>
                            </Stack>
                        </CardContent>
                   </Card>
                )
            })}
        </Box>
    )
}

export default TicketDashboard;