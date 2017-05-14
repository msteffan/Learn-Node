const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const storeSchema = new mongoose.Schema({
  name : {
    type: String,
    trim: true,
    required: 'Please enter a name'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String]
});

storeSchema.pre('save', function(next){
  if (!this.isModified('name')){
    next(); // skip it
    return; // stop the function
  }
  this.slug = slug(this.name); // take name and run it through the slug package to autogenerate the slug
  next();
  // TODO: make sure the slugs are unique
});

module.exports = mongoose.model('Store', storeSchema)
