const { OAuth2Client } = require('google-auth-library');
const { clientId } = require('./../src/utils/keys'); // Won't work, use env variable or server/utils/key
const client = new OAuth2Client(clientId);

const googleAuth = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: clientId,
  });
  const payload = ticket.getPayload();
  console.log('payload: ', payload);

  const { sub, emaill, name, picture } = payload;
  const userId = sub;
  return { userId, email, fillName: name, photoUrl: picture };
};

module.exports = googleAuth;
