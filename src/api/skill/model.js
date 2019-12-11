import mongoose, { Schema } from 'mongoose'

const skillSchema = new Schema({
  skill: {
    type: String
  },
  color: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

skillSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      skill: this.skill,
      color: this.color,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Skill', skillSchema)

export const schema = model.schema
export default model
