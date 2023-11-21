import { Box, Button, Input, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { logedInUser } from "../../recoil_state";


const formStyle = {
  alignItems: "center",
};

function Login() {
    const navigate = useNavigate();
    const setUser = useSetRecoilState(logedInUser)

  return (
    <Box>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const inputs = event.currentTarget;
          const email = inputs[0].value;
          const password = inputs[1].value;


          fetch("http://localhost:5000/login",{
            method : "POST",
            headers :{
                "Content-Type": "application/json",
                "username" : email,
                "passcode" : password
            },
         //   body: JSON.stringify()  
          }).then(res => res.json()).then(data =>{
           
            if(data.role ==="Admin"){
                console.log(data.token);
                localStorage.setItem('jwtToken', data.token);
                setUser({
                  user : "VP Fancy Admin",
                  access:"admin",
                  email,
                })
                navigate("/admin/newsubjects")


            }else if(data.role ==="User(student/assigne)"){
                console.log(data.token);
                localStorage.setItem('jwtToken', data.token);
                setUser({
                  user : "T-REX User",
                  access :"user",
                  email,
                })
                
                navigate("/ticket/dashboard")
            }
          })


          console.log(inputs[0].value +" "+ inputs[1].value);
        }}
      >
       
        <Stack spacing={3} sx={formStyle}>
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
