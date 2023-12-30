
import { Box, Button, Input, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { logedInUser } from "../../recoil_state";


const formStyle = {
  alignItems: "center",
  boxShadow: "0 41px 8px rgba(0, 0, 0, 0.2)", // Adjust the color and opacity as needed
  borderRadius: "8px", // Optional: To round the corners
  padding : "80px",
  background: "#ffffff"
};
const labelStyle = {color: "#f9561f",fontSize: "24px",fontWeight: "bold",marginBottom: "20px"};

function Login() {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(logedInUser);

  return (
    <Box>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const inputs = event.currentTarget;
          const email = inputs[0].value;
          const password = inputs[1].value;


          fetch("http://localhost:5000/login",{
            mode: 'cors',
            method : "POST",
            headers :{
                "Content-Type": "application/json",
            },body: JSON.stringify( {
              "username" : email,
              "passcode" : password
            }),
          }) .then((res) => {
    if (!res.ok) {
      alert("Incorrect");
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  }).then(data =>{
           console.log("errror")
            if(data.role ==="Admin"){
                console.log(data);
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('userInfo',JSON.stringify( {
                  user : "VP Fancy Admin",
                  access:"admin",
                  email,
                }));
                console.log( JSON.parse ( localStorage.getItem('userInfo')));
                setUser({
                  user : "VP Fancy Admin",
                  access:"admin",
                  email,
                });
                alert("Success")
                navigate("/admin/newsubjects")


            }else if(data.role ==="User(student/assigne)"){
                console.log(data.token);
                localStorage.setItem('jwtToken', data.token);
                localStorage.setItem('userInfo', JSON.stringify({
                  user : "T-REX User",
                  access :"user",
                  email,
                }));
                setUser({
                  user : "T-REX User",
                  access :"user",
                  email,
                });
                navigate("/ticket/dashboard")
            }
          }).catch(e=>{
            console.log( ' This is the network error ', e)
          })


          console.log(inputs[0].value +" "+ inputs[1].value);
        }}
      >
        
        <Stack spacing={3} sx={formStyle }>
        <Typography textAlign={"center"} style={labelStyle}> login!</Typography>
          <Input placeholder="User email!" required />
          <Input placeholder="Password!" required />
          <Button variant="contained" type="submit" size="medium">
            Login
          </Button>
        </Stack>
      </form>
    </Box>
  );
}


export default Login;
