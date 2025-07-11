import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";

const Login = ({login}) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onSubmit = (e) => {
        e.preventDefault();
        if(!username || !password){
            alert("los campos no deben de estar vacios");
            return;
        }

        const isLogin = login({username, password});

        if(isLogin) {
            setUsername("");
            setPassword("");
            navigate("/home")
        } else {
            alert("el login fallo");
        }
    };

    return(
        <form>
            <div>
                <Box
                    margin={"auto"}
                    flexDirection={"column"}
                    display={"flex"}
                    width={400}
                    marginTop={"20px"}   
                >
                    <TextField 
                        label={"username"} 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        type={"password"}
                        label={"password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <Button onClick={onSubmit}>LOGIN</Button>

                    <Button onClick={() => {navigate("/register")}}>Register</Button>

                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                        Use test credentials:<br/>
                        Username: test<br/>
                        Password: test
                    </Typography>

                </Box>
            </div>
        </form>
    );
};

export default Login;