export const signUp = (req, res) => {
  //   console.log("the function is triggred");
  const { fullname, email, password, profilePicture } = req.body;
  console.log(fullname, email, password, profilePicture);
};
