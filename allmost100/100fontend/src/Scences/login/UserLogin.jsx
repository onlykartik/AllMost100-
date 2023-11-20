import Login from ".";
const { Box, Typography } = require("@mui/material");
function UserLogin(){
    return(
        <Box>
            <Typography variant="h2">USER LOGIN</Typography>
            <Login/>
        </Box>
    )
}


export default UserLogin;
