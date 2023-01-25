const questionSchema = new Schema({
  question_id: { type: Number, unique: true },
  product_id: Number,
  question_body: String,
  user_id: Number,
  submitted_date: Date,
  reported: Boolean,
  question_helpfulness: Number
})


const answerSchema = new Schema({
  answer_id: { type: Number, unique: true },
  answer_body: String,
  user_id: Number,
  submitted_date: Date,
  reported: Boolean,
  answer_helpfulness: Number,
  photo_id: Number
})

const userSchema = new Schema({
  user_id: { type: Number, unique: true },
  user_name: String,
  user_email: String
})

const photoSchema = new Schema({
  photo_id: { type: Number, unique: true },
  photo_url: String
})