import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SubjectOutlinedIcon from '@mui/icons-material/SubjectOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation } from 'react-router-dom';
import dinoImage from '../dinosaur.png'
import { useRecoilValue } from "recoil";
import { logedInUser } from "../recoil_state";
import VerifiedRoundedIcon from '@mui/icons-material/VerifiedRounded';
const Item = ({ title, to, icon, selected, setSelected }) => {


  return (
    <Link to={to}>
    <MenuItem
      active={selected === title}
      style={{
        transition: "background-color 2s", // Optional: Add a transition for smooth effect
      }}
      icon={icon}
    >
      <Typography>{title}</Typography>
    </MenuItem>
    </Link>
  );
};


function MySidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selected, setSelected] = useState("Dashboard");
  const user = useRecoilValue(logedInUser);

  const location = useLocation();
  const { pathname } = location;
  const hideSidebarRoutes = ['/', '/user', '/admin'];
  const isSidebarHidden = hideSidebarRoutes.includes(pathname);

  if(isSidebarHidden){
    return <Box></Box>
  }

  return (
    <Box sx={{
      ".ps-menu-button:hover" :{
        backgroundColor: "rgb(121, 183, 167) !important"
      }
    }} >
      
    <Sidebar collapsed={isCollapsed}  
    rootStyles={{
      "border-right-width": "0",
    }}
    >
      {/* backgroundColor="transparent !important" */}
      <Menu iconShape="square">
        {/* LOGO AND MENU ICON */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
          style={{
            margin: "10px 0 20px 0",
           
            "&:hover": {
              backgroundColor: "red"
            },
          }}
        >
          {!isCollapsed && (
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              ml="0px"
            >
              <Typography variant="h3" >
                100% <strong>P</strong>
              </Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>


        {!isCollapsed && (
          <Box mb="25px">
            <Box display="flex" justifyContent="center" alignItems="center">
              <img
                alt="profile-user"
                width="100px"
                height="100px"
                src={dinoImage}
                style={{ cursor: "pointer", borderRadius: "50%" }}
              />
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h3"
             
                fontWeight="bold"
                sx={{ m: "10px 0 0 0" }}
              >
                {user.email.split("@")[0].concat("@")}
              </Typography>
              <Typography variant="h5" >
                {user.user}
                <VerifiedRoundedIcon  sx={{color:"blue"}}/>
              </Typography>
            </Box>
          </Box>
        )}


        <Box padding={isCollapsed ? undefined : "5%"}>
          <Item
            title="Ticket Dashboard"
            to="/ticket/dashboard"
            icon={<HomeOutlinedIcon sx={{ color:"#1976d2"}} />}
            selected={selected}
            setSelected={setSelected}
          />


          <Typography
            variant="h6"
         
            sx={{ m: "15px 0 5px 20px" }}
          >
            Data
          </Typography>

          {/* User can only see Add Assignee, New Subjects, Create Ticket Icons */}
          {user.access==="admin" ?
           <Box sx={{
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.50)',
            transition: 'box-shadow 0.3s ease-in-out',
            borderRadius :"40px",
          }}>
            <Item
            title="Create Ticket"
            to="/admin/CreateTicket"
            icon={<AddBoxOutlinedIcon sx={{ color:"#1976d2"}} />}
            selected={selected}
            setSelected={setSelected}
            />
          </Box>:""  }
         {user.access !=="admin"?"":
         <Box>
          <Item
          title="Add Assignee"
          to="/admin/addAssignee"
          icon={<PeopleOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          />
          <Item
          title="New Subjects"
          to="/admin/newsubjects"
          icon={<SubjectOutlinedIcon />}
          selected={selected}
          setSelected={setSelected}
          />
        </Box>}
          
          <Item
            title="Finished Subjects"
            to="/finishedSubjects"
            icon={<CheckCircleOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Typography
            variant="h6"
         
            sx={{ m: "15px 0 5px 10px" }}
          >
            Pages
          </Typography>
          <Item
            title="Form"
            to="/form"
            icon={<PersonOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="Calendar"
            to="/calendar"
            icon={<CalendarTodayOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Item
            title="FAQ Page"
            to="/faq"
            icon={<HelpOutlineOutlinedIcon />}
            selected={selected}
            setSelected={setSelected}
          />
          <Box>
            <Button variant="contained" size="large" startIcon={<LogoutIcon />}
            onClick={()=>{localStorage.removeItem("jwtToken")}}
            >  
            <Item
            title={"LOG OUT"}
            to="/"
            selected={selected}
            setSelected={setSelected}
            /> 
            </Button>
          </Box>
          
        </Box>
      </Menu>
    </Sidebar>
    </Box>
  );
}


export default MySidebar;