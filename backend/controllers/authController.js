// backend/controllers/authController.js
export const authUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await user.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};