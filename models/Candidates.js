var mongoose = require('mongoose');
var CandidateSchema = new mongoose.Schema({
  Name: String,
  picture: String,
  price: String,
  orders: {type: Number, default: 0},
});
CandidateSchema.methods.upvote = function(cb) {
  this.orders += 1;
  this.save(cb);
};
mongoose.model('Product', CandidateSchema);
