import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "https://localhost:8843",
 realm: "project",
 clientId: "HangmanApp",
 pkceMethod: "S256",
});


export default keycloak;