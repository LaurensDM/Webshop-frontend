export default function isEmail(emailAddress) {
  const regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

  if (emailAddress.match(regex)) { return true; }

  return false;
}