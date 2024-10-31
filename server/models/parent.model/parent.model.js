import mongoose from 'mongoose';

const ParentSchema = new mongoose.Schema({
    firstParentName:{
        type: String,
        required: true,
    },
    firstParentLastName: {
        type: String,
        required: true,
    },
    secondParentName:{
        type: String,
        default: null,
    },
    secondParentLastName: {
        type: String,
        default: null, 
    },
    childFirstName: {
        type: String,
        required: true,
    },
    childLastName: {
        type: String,
        required: true,
    },
    childAge: {
        type: Number,
        required: true,
        min: 2,
        max: 7, 
    },
    institution: {
        type: [String],  
        required: true,
        enum: ['Institution1', 'Institution2', 'Institution3', 'Institution4'],
    },
    pin: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    status: 
    { type: String, 
        enum: ['checked-in', 'checked-out'], 
        default: 'checked-out' 
    },
    checkInTime: {
         type: Date
     },
    checkOutTime: { 
        type: Date 
    }
}, {timestamps: true});

// generisanje pin-a prije cuvanja:
ParentSchema.pre('save', function (next) {
    if (!this.pin) {
        this.pin = Math.floor(1000 + Math.random() * 9000).toString(); 
    }
    next();
});


const Parent = mongoose.model('Parent', ParentSchema);

export default Parent;