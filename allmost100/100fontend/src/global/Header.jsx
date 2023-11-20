import { Box, Typography } from "@mui/material";


function Header(props) {
  return (
    <Box sx={{ backgroundColor: "", height :"100px" }}>
      <Typography variant="h4" color={"#1976d2"}> <strong>{props.name}</strong></Typography>
    </Box>
  );
}


export default Header;


