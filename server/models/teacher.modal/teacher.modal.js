import mongoose from 'mongoose'

const teacherSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
      institution: {
        type: String,
        enum: ['institution1', 'institution2', 'institution3', 'institution4'],
        required: true,
      },
      description: {
        type: String,
        required: true,
        maxlength: 500,  
      },
      picture: {
        type: String,
        required: true, 
      },
      createdAt: {
        type: Date,
        default: Date.now,
      }
})


const Teacher = mongoose.model('Teacher', teacherSchema)

export default Teacher