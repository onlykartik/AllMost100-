import DescriptionIcon from '@mui/icons-material/Description';
import Face3Icon from '@mui/icons-material/Face3';
import Face2Icon from '@mui/icons-material/Face2';
import TimeIcon from '@mui/icons-material/AccessTimeSharp';
import TitleIcon from '@mui/icons-material/Title';
import ListItem from '@mui/material/ListItem';
import { useParams } from 'react-router-dom';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import { useRecoilValue } from "recoil";
import { logedInUser } from '../../recoil_state';
const { Box, Typography, Card, Stack, Button, List, Divider, ListItemText } = require("@mui/material");
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
     const [commented , setCommented] = useState(false);
     const [message , setMessage] = useState("");
     const [posts, setPosts ] = useState([]);

     const {user,access,email} = useRecoilValue(logedInUser);
     console.log(user,access,email+" user,access,email")

    useEffect(()=>{
        fetch(`http://localhost:5000/admin/getTicket?${id}`,{
            mode :'cors',
        method:"Get",
        headers:{
            "Content-Type": "application/json",
            "authorization" : localStorage.getItem("jwtToken"),
            "ticketid" : id
        }
    }).then((res)=> res.json()).then((data)=>{
        console.log(data);
        setTicket(data)
    }).catch(()=>{
        setTicket([]);
    })
    },[id]);

    useEffect(()=>{
        fetch(`http://localhost:5000/user/getComments?${id}`,{
            mode :'cors',
        method:"Get",
        headers:{
            "authorization" : localStorage.getItem("jwtToken"),
            "subjectid" : id
        }
    }).then((res)=> res.json()).then((data)=>{
        
        setPosts(data.comments)
    }).catch(()=>{
        setPosts([]);
    })
    },[])

    let lStore =  JSON.parse( localStorage.getItem("userInfo"));

    const isCurrentUserAdmin = (ticket?.subjectObject?.[0]?.admin)?.split(",").includes(email ===""?lStore.email:email ) ;
    const isCurrentUserStudent = ticket?.subjectObject?.[0]?.student[0].Email  === (email ===""?lStore.email:email);
    const isCurrentUserAssignee = ticket?.subjectObject?.[0]?.assignee[0].Email === (email ===""?lStore.email:email);

    const onPostSubmittionHandler = (e)=>{

        let postedBy = "";
        if(isCurrentUserAdmin){
            console.log("PostedBy "+"admin");
            postedBy = "Admin";
        }else if(isCurrentUserAssignee){
            console.log("PostedBy "+"assignee");
            postedBy = "Assignee";
        }else if(isCurrentUserStudent){
            console.log("PostedBy "+"student");
            postedBy = "Student";
        }

        const commentObject = {
            commentedText : document.querySelector('.commute').value,
            postedBy,
            postedEmail : email,
            subjectId : id ,
            createdAt : new Date(),
        }
        

        fetch('http://localhost:5000/user/addComment',{
            mode :'cors',
            method:"Post",
            headers:{
                "Content-Type": "application/json",
                authorization: localStorage.getItem("jwtToken"),
            },
            body:JSON.stringify(commentObject)
        }).then(res=>res.json()).then(data =>{
        }).then(()=>{
            fetch(`http://localhost:5000/user/getComments?${id}`,{
                mode :'cors',
                method:"Get",
                headers:{
                    "authorization" : localStorage.getItem("jwtToken"),
                    "subjectid" : id
                }
            }).then((res)=> res.json()).then((data)=>{
                
                setPosts(data.comments)
            }).catch(()=>{
                setPosts([]);
            })
        })
        

    }

    return(
        <Box sx={{width:"95vw", display:"flex", flexDirection:"column", gap:"5px", backgroundColor:"#f7fafc"}}>
            
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

                    {/* All comments */}
                    <Box margin={"10px"}>
                    {
                        posts.map(post=>{
                            console.log(post.CommentText);
                            return (
                                <List
                                key={post.Id}
                                sx={{
                                    width: '90%',
                                    bgcolor: 'background.paper',
                                }}>
                                    <Box display={"flex"} flexDirection={"row"} justifyContent={"space-between"}>
                                        <Typography>{post.PostedBy+": "+ post.PostedByEmail}</Typography>
                                        <Typography fontSize={"13px"} color={"#4f4f4f"}>{ new Date(post.CreatedAt).toLocaleString()}</Typography>
                                    </Box>
                                    <ListItem>
                                    <Typography component={"p"} fontSize={"13px"} sx={{whiteSpace: "pre-wrap"}} color={"#4f4f4f"}>{post.CommentText}</Typography>                                       
                                    </ListItem>
                                        <Divider variant="inset" component="li" />
                                </List>
                            )
                        })
                    }




                    {isCurrentUserStudent &&
                    <>
                    <Stack width={"95%"} paddingTop={"20px"} paddingBottom={"10px"} direction={"row"} textAlign={"center"} justifyContent={"space-between"} alignItems={"center"}>
                        
                    <Stack direction={"row"} textAlign={"center"} alignItems={"center"}>
                       <Face2Icon fontSize='medium'  />
                       <Typography>  Student {ticket?.subjectObject?.[0]?.student[0].Email}</Typography>
                    </Stack>  

                    <Stack direction={"row"} textAlign={"center"} alignItems={"center"}>
                       <TimeIcon/>
                       <label className='currentTime' > {new Date().toLocaleString()}</label>
                    </Stack>   
                        
                    </Stack>
                    <textarea className='commute' style={{height :"100px", width:"95%", border:"1.5px solid #979797",marginBottom:"10px" }} 
                    onBlur={(e)=>{console.log(e.target.style.border = "1px solid #979797")}} 
                    onFocus={(e)=>{ console.log(e.target.style.border = 0) }} 
                    onChange={(e)=>{ 
                         setMessage(e.target.value);
                         setCommented(true);
                    }}
                    value={!commented?                    
`Hey, ${ticket?.subjectObject?.[0]?.assignee[0]?.Name?.toLowerCase()}. Any hurdles in submitting the ${ticket?.subjectObject?.[0]?.title} weekly deadline? kindly Don't hesitate to ping me there :).

                                ...write your ping 

`:message} />
                    </>
                    }
                    
                    {isCurrentUserAssignee &&
                    <>
                    <Stack width={"95%"} paddingBottom={"10px"} direction={"row"} textAlign={"center"} justifyContent={"space-between"} alignItems={"center"}>

                    <Stack direction={"row"} textAlign={"center"} alignItems={"center"}>
                    <Face3Icon/>
                    <Typography> Assignee {ticket?.subjectObject?.[0]?.assignee[0].Email}</Typography> 
                    </Stack>

                    <Stack direction={"row"} textAlign={"center"} alignItems={"center"}>
                       <TimeIcon/> 
                       <label className='currentTime' > {new Date().toLocaleString()}</label>
                    </Stack>

                    </Stack>                    
                    <textarea className='commute' style={{height :"140px", width:"95%", border:"1.5px solid #979797",marginBottom:"10px" }} 
                    onBlur={(e)=>{console.log(e.target.style.border = "1px solid #979797")}} 
                    onFocus={(e)=>{ console.log(e.target.style.border = 0) }} 
                    onChange={(e)=>{ 
                         setMessage(e.target.value);
                         setCommented(true);
                    }}
                    value={!commented?
`Hello, ${ticket?.subjectObject?.[0]?.student[0]?.Name?.toLowerCase()} how are you doing?. I have several questions about this week's lab, discussion, and quiz:)

                                   ...write you ping 

Thanking in advance,
${ticket?.subjectObject?.[0]?.student[0].Name  +" & Team100%"}.`:message} />
                    </>
                    }
                    
                    {isCurrentUserAdmin &&
                    <>
                    <Stack width={"95%"} paddingTop={"20px"} paddingBottom={"10px"} direction={"row"} textAlign={"center"} justifyContent={"space-between"} alignItems={"center"}>
                    <Stack direction={"row"} textAlign={"center"} alignItems={"center"}>
                    <Typography> Admin {(ticket?.subjectObject?.[0]?.admin)?.split(",")[0]}</Typography>
                    </Stack>

                    <Stack direction={"row"} textAlign={"center"} alignItems={"center"}>
                       <TimeIcon/> 
                       <label className='currentTime' > {new Date().toLocaleString()}</label>
                    </Stack>   
                    </Stack>
                    <textarea className='commute' style={{height :"140px", width:"95%", border:"1.5px solid #979797",marginBottom:"10px" }} 
                    onBlur={(e)=>{console.log(e.target.style.border = "1px solid #979797")}} 
                    onFocus={(e)=>{ console.log(e.target.style.border = 0) }} 
                    onChange={(e)=>{ 
                         setMessage(e.target.value);
                         setCommented(true);
                    }}
                    value={!commented?
`Hey, ${ticket?.subjectObject?.[0]?.student[0].Name},${ticket?.subjectObject?.[0]?.assignee[0].Name} I hope everyone is enjoying this channel. 
                      
                                ... write you ping
                        
Gratitude in advance,
${(ticket?.subjectObject?.[0]?.admin)?.split(",")[0]  +" & Team100%"}.`:message} />
                    </>
                    }
                    
                    <Button variant='contained' sx={{display:"block"}} onClick={onPostSubmittionHandler}>POST</Button>
                    </Box>
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