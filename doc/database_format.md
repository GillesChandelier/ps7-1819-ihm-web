## Attribut et tables de la base de donnée

# Quizz
  * _id: {type: ObjectId, require: true}
  * name: {type: String, require: true}
  * thematic: {type: String, require:true}
  * room : {type: String, require:true}
  * questions: [{type: ObjectId, ref: 'Question'}]
  * album : [{type: ObjectId, ref: 'Picture'}]

# Picture
  * _id: {type: ObjectId, require: true}
  * path: {type: String, require: true}
  * tags: [{type: String}]
  * like: {type: Number, required: true}
  * interesting: {type: Number, required: true}
  * fun: {type: Number, required: true}
  * quizz: {type: ObjectId, ref: 'Quizz'}
  * group : {type: ObjectId, ref: 'Group', require: true}

# Question
  * quizz: {type: ObjectId, ref: 'Quizz'}
  * thematic: {type: String, required:true}
  * text: {type: String, required:true}
  * answers: [{type: ObjectId, ref: 'Answer'}]
  * goodAnswer: {type: ObjectId, ref: 'Answer'}

# Answer
  * question: {type: ObjectId, required: true}
  * text: {type: String, required:true}

# Group
  * _id: {type: ObjectId, require: true}
  * type: {type: String, require: true}
  * visitors: [{type: ObjectId, ref: 'Visitor'}]
  * album : [{type: ObjectId, ref: 'Picture'}]

# Visitor
  * group: {type: ObjectId, ref: 'Group'}
  * name: {type: String, require: true}
  * age: {type: Number, require: true}
  * gender: {type: String, require: true}

# Stat
  * _id: {type: ObjectId, require: true}
  * group: {type: ObjectId, ref: 'Group'}
  * quizz: {type: ObjectId, ref: 'Quizz'}
  * participationPercent : {type: Number, require: true}
  * rightAnswerPercent : {type: Number, require: true}

