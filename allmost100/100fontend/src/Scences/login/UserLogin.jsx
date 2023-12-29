import login from "/Users/karterreddy/Production Apps/AllMost100/allmost100/100fontend/src/Login.png";
import Login from "./index";
const { Box, Typography } = require("@mui/material");


  const containerStyle = {
    padding: "20px",
    backgroundImage: `url(${login})`, // Replace with the path to your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "90vh", // Adjust as needed
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Align to the top
    alignItems: "flex-start", // Align to the right
  };

  const labelStyle = {
    color: "#f9561f",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  };

function UserLogin(){
    return(
        <Box style={containerStyle}>
            <Typography style={labelStyle}>User login!</Typography>
            <Login/>
        </Box>
    )
}


export default UserLogin;
