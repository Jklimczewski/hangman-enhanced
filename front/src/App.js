import Login from "./account/login";
import Game from "./game/game";
import Account from "./account/account"
import NotFound from "./notFound"
import Words from "./words"
import { Route, Routes } from "react-router";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./Keycloak";

function App() {  
  return (
  <>
    <ReactKeycloakProvider authClient={keycloak} initOptions={{pkceMethod: "S256"}}>
      <Routes>
        <Route path="/words" element={<Words/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/account" element={<Account/>} />
        <Route path="/account/game" element={<Game/>} />
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </ReactKeycloakProvider>
  </>
  );
}

export default App;
