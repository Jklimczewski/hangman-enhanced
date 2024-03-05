import { Link } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import { useState } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledDiv = styled("div")`
  background-color: #AA7CD3;
  width: 70%;
  height: 250px;
  text-align: center;
  margin: 100px auto;
  padding: 50px 0;
  border-radius: 30px;
  font-size: 25px;
`;

const StyledDiv2 = styled("div")`
  padding: 25px;
  display: inline-block;
`;

function Account() {
    const [alert, setAlert] = useState("");
    const { keycloak } = useKeycloak();

    const handleLogout = () => {
        setAlert("Loging out...");
        setTimeout(() => {
            keycloak.logout();
        }, 2000);
      }
    
    const handleUpdate = () => {
    setAlert("Redirecting...");
    setTimeout(() => {
        keycloak.accountManagement();
    }, 2000);
    }

    return (
        <div>
            {keycloak.authenticated && (
                <StyledDiv>
                    <h1>Hey {keycloak.tokenParsed.preferred_username}</h1>
                    <StyledDiv2>
                        <Link to="/account/game"><Button variant="outlined" size="large">Play</Button></Link>
                    </StyledDiv2>
                    <StyledDiv2>
                        <Button variant="outlined" size="large" onClick={handleUpdate}>Manage acc</Button>
                    </StyledDiv2>
                    <StyledDiv2>
                        <Button variant="outlined" size="large" onClick={handleLogout}>Logout</Button>
                    </StyledDiv2>
                    <StyledDiv2>
                        <a href="/words">Words List</a>
                    </StyledDiv2>
                    <h3>{alert}</h3>
                </StyledDiv>
            )}
            {keycloak.authenticated === false && (window.location.href = "/login")}
        </div>
    )
}
export default Account;