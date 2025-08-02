const userDTO = (user) => {
  const userObj = user.toObject ? user.toObject() : { ...user };
  delete userObj.password;
  delete userObj.createdAt;
  delete userObj.updatedAt;
  delete userObj.__v;
  return userObj;
};

export { userDTO };
