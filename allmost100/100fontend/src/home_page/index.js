import { useNavigate } from "react-router-dom";
import { Button,Stack } from "@mui/material"
function Home(){
    const navigate =useNavigate();

    return(
        <Stack spacing={2}>
            <Button variant="contained" size="large" onClick={ ()=>{navigate("/user")} }>USER login</Button>
            <Button variant="contained" size="large" onClick={()=>{navigate("/admin")}}>ADMIN login</Button>
        </Stack>
    )
}


export default Home;
