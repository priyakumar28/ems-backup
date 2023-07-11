const jwt = require("jsonwebtoken");
const basic = require("../services/user/users");
const moment = require("moment");
const { ac } = require("./accesscontrol");
const msal = require("@azure/msal-node");
const jwksClient = require("jwks-rsa");

const DISCOVERY_KEYS_ENDPOINT = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}/discovery/v2.0/keys`;

const config = {
  auth: {
    clientId: process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID,
    authority: `${process.env.NEXT_PUBLIC_AZURE_AUTHORITY_URL}${process.env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
    clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
  },
  system: {
    loggerOptions: {
      loggerCallback(loglevel, message, containsPii) {
        console.log({ loglevel, message, containsPii });
      },
      piiLoggingEnabled: false,
      logLevel: msal.LogLevel.Verbose,
    },
  },
};

// Middleware for requiring authentication and getting user
const requireAuth = (fn) => async (req, res) => {
  // Respond with error if no authorization header
  if (!req.headers.authorization) {
    return res.status(401).send({
      status: "error",
      message: "You must be signed in to call this endpoint",
    });
  }

  // Get access token from authorization header ("Bearer: xxxxxxx")
  const accessToken = req.headers.authorization.split(" ")[1];

  try {
    const validationOptions = {
      audience: config.auth.clientId, // v2.0 token
      issuer: config.auth.authority + "/v2.0", // v2.0 token
    };

    const payload = await getVerifiedToken(accessToken, validationOptions);

    let currentTime = moment().valueOf();
    let expireTime = payload.exp * 1000;

    if (currentTime > expireTime) {
      return res.status(440).json({
        success: false,
        message: "Session expired. Please login again",
      });
    }

    let email = payload.preferred_username.toLowerCase();

    let { code, ...userObj } = await basic.getByIdOrEmailAuth({ email });

    
    // need to fetch user from database and associated roles and permissions
    if (code === 200) {
      req.user = userObj.data;
    } else {
      return res
        .status(code)
        .json({ success: false, message: userObj.message });
    }
    let permissionCheck = await ac(req.user.roles, [
      "View employees", "Site Settings", "Employee Configuration Settings", "View HR assessment forms",
      "View L1 assessment forms", "View REX approval forms", "View users", "View roles", "View courses", "View training sessions",
      "View departments", "View designations"
    ], email);
    if (
      (req.query.page === "/resource-pool/employees" && !permissionCheck["View employees"]) ||
      (req.query.page === "/my-profile" && !req.user.user_level === "Employee") ||
      (req.query.page === "/settings/site-settings" && !permissionCheck["Site Settings"] && !permissionCheck["Employee Configuration Settings"]) ||
      (req.query.page === "/settings/employer-documents" && !permissionCheck["View HR assessment forms"] && !permissionCheck["View L1 assessment forms"] && !permissionCheck["View REX approval forms"]) ||
      (req.query.page === "/settings/user" && !permissionCheck["View users"]) ||
      (req.query.page === "/settings/roles" && !permissionCheck["View roles"]) ||
      (req.query.page === "/settings/courses" && !permissionCheck["View courses"]) ||
      (req.query.page === "/settings/training-sessions" && !permissionCheck["View training sessions"]) ||
      (req.query.page === "/settings/departments" && !permissionCheck["View departments"]) ||
      (req.query.page === "/settings/designations" && !permissionCheck["View designations"])
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized to view this page",
        data: req.user,
      });
    }
    // Call route function passed into this middleware
    return fn(req, res);
  } catch (error) {
    console.log(error);
    // If there's an error assume token is expired and return
    // auth/invalid-user-token error (handled by apiRequest in util.js)
    res.status(401).send({
      status: "error",
      code: "auth/invalid-user-token",
      message: "Your login has expired. Please login again.",
    });
  }
};

const getSigningKeys = (header, callback) => {
  let client = jwksClient({
    jwksUri: DISCOVERY_KEYS_ENDPOINT,
  });

  client.getSigningKey(header.kid, function (err, key) {
    let signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
};

const getVerifiedToken = async (accessToken, validationOptions) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, getSigningKeys, validationOptions, (err, payload) => {
      if (err) {
        reject(err);
      }
      resolve(payload);
    });
  });
};

module.exports = requireAuth;
