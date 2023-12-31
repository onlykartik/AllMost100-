import Login from ".";
import { Box, Typography } from "@mui/material";
import loginImg from '../../Login.png'

function AdminLogin() {

  const containerStyle = {
    padding: "20px",
    backgroundImage: `url(${loginImg})`, // Replace with the path to your image
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

  return (
    <Box style={containerStyle}>
      <Login />
    </Box>
  );
}

export default AdminLogin;
