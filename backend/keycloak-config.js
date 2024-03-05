const NodeAdapter = require("keycloak-connect");

const config = {
  "confidential-port": 8843,
  realm: "project",
  "auth-server-url": process.env.KEYCLOAK_URL,
  "ssl-required": "external",
  resource: "HangmanServer",
  "realmPublicKey": process.env.REALM_PUBLIC_KEY,
  "bearer-only": true,
};

const keycloak = new NodeAdapter({}, config);

module.exports = keycloak;