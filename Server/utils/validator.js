function Validate({ fullName, organizationName, idNumber, email, password }) {
  return (req, res) => {
    if (!fullName || !organizationName || !idNumber || !email || !password) {
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
  };
}

function ValidatePost({
  JobTitle,
  JobType,
  Department,
  Location,
  Salary,
  Description,
  Requirement,
}) {
  if (
    !JobTitle ||
    !JobType ||
    !Department ||
    !Location ||
    !Salary ||
    !Description ||
    !Requirement
  ) {
    return res.status(400).json({
      message: "All required fields must be provided",
    });
  }
  if (Description.length < 90) {
    return res.status(400).json({
      message: "Description must be at least 90 characters long",
    });
  }
  if (JobTitle.length < 10) {
    return res.status(400).json({
      message: "Job Title must be at least 10 characters long",
    });
  }
  if (Department.length < 7) {
    return res.status(400).json({
      message: "Department must be at least 7 characters long",
    });
  }
  if (Location.length < 10) {
    return res.status(400).json({
      message: "Location must be at least 10 characters long",
    });
  }
  if (Requirement.length < 50) {
    return res.status(400).json({
      message: "Requirement must be at least 50 characters long",
    });
  }
}
module.exports = { Validate, ValidatePost };
