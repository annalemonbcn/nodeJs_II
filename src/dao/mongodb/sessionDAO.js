import userModel from "../../db/models/userModel.js";

class sessionsDAO {
  async getUserByEmail(email) {
    return await userModel.findOne({ email });
  }

  async getUserById(id) {
    return await userModel
      .findById(id)
      .select("-password -createdAt -updatedAt -__v");
  }
}

export { sessionsDAO };
