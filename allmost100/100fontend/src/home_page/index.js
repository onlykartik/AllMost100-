import { useNavigate } from "react-router-dom";
import { Button, Stack, Box, Typography } from "@mui/material";
import homeBGV from '../homeImage.png'

function Home() {
  const navigate = useNavigate();

  const containerStyle = {
    padding: "20px",
    backgroundImage: `url(${homeBGV})`, // Replace with the path to your image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "100vh", // Adjust as needed
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // Align to the top
    alignItems: "flex-end", // Align to the right
  };

  const labelStyle = {color: "#f9561f",fontSize: "24px",fontWeight: "bold",marginBottom: "20px"};

  return (
    <Box style={containerStyle}>
      <Typography style={labelStyle}>Welcome to AllMost100 App!</Typography>
      <Stack spacing={2} alignItems="center" >
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            navigate("/user");
          }}
        >
          USER Login
        </Button>
        <Button  variant="contained" size="large" onClick={() => {navigate("/admin");}}>ADMIN Login</Button>
      </Stack>
    </Box>
  );
}

export default Home;
