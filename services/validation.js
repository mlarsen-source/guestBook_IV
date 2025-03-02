export function validateForm(data) 
{
    
  // Store all the validation errors in an array
  const errors = [ ];
  

  // validate first name (required)
  if (!data.fname || data.fname.trim() === "") {
    errors.push("First Name is required");
  }

  // Validate last name (required)
  if (!data.lname || data.lname.trim() === "") {
    errors.push("Last Name is required");
  }

  // validate title (required)
  if (!data.title || data.title.trim() === "") {
    errors.push("Job Title is required");
  }

   // validate company (required)
   if (!data.company || data.company.trim() === "") {
    errors.push("Company is required");
  }

  // validate linkedIn (not required)
  if (data.linkedIn.trim() != "" && data.linkedIn.indexOf("linkedin.com") === -1) {
    errors.push("LinkedIn entry is not valid");
  }

  // validate email (required)
  if (!data.email || data.email.trim() === "" || data.email.indexOf("@") === -1 || data.email.indexOf(".") === -1) {
    errors.push("Email is required and must be valid");
  }

  return {
    isValid: errors.length === 0,
    errors
  };

}