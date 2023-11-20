import Login from ".";
const { Box, Typography } = require("@mui/material");
function AdminLogin(){
    return(
        <Box>
            <Typography alignContent={"center"} variant="h2">ADMIN USER LOGIN</Typography>
            <Login/>
        </Box>
    )
}


export default AdminLogin;
