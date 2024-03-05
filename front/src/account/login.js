import { useKeycloak } from "@react-keycloak/web";
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledDiv = styled("div")`
  background-color: #AA7CD3;
  width: 70%;
  height: 120px;
  text-align: center;
  margin: 100px auto;
  padding: 100px 0;
  border-radius: 30px;
  font-size: 25px;
`;

const StyledDiv2 = styled("div")`
  padding: 25px;
  display: inline-block;
`;

function Login() {
  const { keycloak } = useKeycloak();
  const [alert, setAlert] = useState("");

  const handleLogin = () => {
    setAlert("Redirecting...");
    setTimeout(() => {
        keycloak.login();
    }, 2000);
  }

  const handleRegister = () => {
    setAlert("Redirecting...");
    setTimeout(() => {
        keycloak.register();
    }, 2000);
  }

  return (
    <div>
        {keycloak.authenticated === false && (
            <StyledDiv>
              <StyledDiv2>
                <Button variant="outlined" size="large" type="button" onClick={handleLogin}>
                    Login
                </Button>
              </StyledDiv2>
              <StyledDiv2>
                <Button variant="outlined" size="large" type="button" onClick={handleRegister}>
                    Register
                </Button>
              </StyledDiv2>
              <h3>{alert}</h3>
            </StyledDiv>
        )}
        {keycloak.authenticated && (window.location.href = "/account")}
    </div>
  )
}

export default Login;
