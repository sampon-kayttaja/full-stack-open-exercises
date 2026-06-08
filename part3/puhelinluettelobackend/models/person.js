const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console
.log('connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })
const personSchema = new mongoose.Schema({
  name: { 
    type: String, 
    minlength: [3, 'name must be at least 3 characters long'], 
    required: [true, 'name is required'] 
  },
  number: { 
    type: String,  
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d{6,15}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: [true, 'number is required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


const Person = mongoose.model('Person', personSchema)
module.exports = Person