function Validate({
  fullName,
  organizationName,
  idNumber,
  email,
  password,
}) {
  if (!fullName || !organizationName || !email || !password) {
    return res
      .status(400)
      .json({ message: "All required fields must be provided" });
  }

  /// alert for idNumber length
  if (idNumber.length < 10) {
    return res
      .status(400)
      .json({ message: "ID number must be at least 10 characters long" });
  }
  /// alert for password length
  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }
}
module.exports = { Validate };
