import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true,
      default: 'user'
    },
    image: {
      type: String,
      default: 'https://avatars.pfptown.com/830/rick-and-morty-pfp-4857.png'
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
)

const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User
