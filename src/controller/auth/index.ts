import { generateLink } from "./generateLink";
import { login } from "./login";
import { verifyToken } from "./verifyOneTimeLink";

const auth = {
  login,
  verifyToken,
  generateLink,
};

export default auth;
