import mongoose from "mongoose"

const Schema = mongoose.Schema

const vodSchema = new Schema({
  title: {
    type: String,
  },
  game: {
    type: String,
  },
  link: {
    type: String,
  },
  description: {
    type: String,
    default: 'No description provided.'
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  },
  comments:[{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
}, {
  timestamps: true
})

const Vod = mongoose.model('Vod', vodSchema)

export {
  Vod
}