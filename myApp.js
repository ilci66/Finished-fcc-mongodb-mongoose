require('dotenv').config();
const mongoose = require('mongoose');

const myUri = "mongodb+srv://ilker:123asd123@learningmongodb.duuyu.mongodb.net/database1?retryWrites=true&w=majority";

mongoose.connect(myUri, { useNewUrlParser: true, useUnifiedTopology: true });

//taking ages to load on replit
//console.log(process.env.PW, process.env.MONGO_URI)
//console.log(myUri)

let peopleSchema = new mongoose.Schema({
  name: { type:String, required:true},
  age: Number,
  favoriteFoods: [String]
})

 let Person = mongoose.model('Person', peopleSchema);
//an example
//  let ilker = new Person({name:'Ilker', age:27, favoriteFoods:['pasta', 'pizza']});
//  console.log(ilker);

//I need to modify server.js (line104) to keep people 
//in my database, fcc code automatically deletes it
const createAndSavePerson = (done) => {
  let ilker = new Person({name:'Ilker', age:27, favoriteFoods:['pasta', 'pizza']});
  ilker.save((error, data) => {
    if(error){
      console.log(error)
    } else {
      done(null,data)
    }
  })
};

let arrayOfPeople = [
  {name:'Ali', age:22, favoriteFoods:['cake']},
  {name:'Ilker', age:27, favoriteFoods:['pasta', 'pizza']},
  {name:'Veli', age:32, favoriteFoods:['ice-cream', 'pizza', 'cookies']}
];
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (error, people) => {
    if(error){
      console.log(error)
    } else {
      done(null, people)
    }
  })
};

//Person.find({name: 'Ilker', age: 27}, (error, data) => {
//  if(error){
//    console.log(error)
//  }else{
//    console.log(data)
//  }
//})
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (error, resultsArray) => {
    if(error) {
      console.log(error)
    } else {
      done(null, resultsArray)
    }
  })
};

// I added this one 
// const findByFood = ('pizza', done) => {
//   Person.find({favoriteFoods: {$all:['pizza']}},(error, data) => {
//     if(error){
//       console.log(error)
//     }else{
//       console.log(data)
//     }
//   })
// };

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:{$all: [food]}}, (error, result) => {
    if(error){
      console.log(error)
    }else{
      done(null, result)
    }
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (error, data) => {
    if(error) {
      console.log(error)
    }else{
      done(null, data)
    }
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (error, data) => {
    if(error) {console.log(error)}
    else{
      data.favoriteFoods.push(foodToAdd)
      data.save((error, updatedData) => {
        if(error) { console.log(error) }
        else { done(null, updatedData) }
      })
    }
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  //it says personname so I don't wanna use find by Id
  //Person.findByIdAndUpdate({name})
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new:true}, 
  (error, updatedData) => {
    if(error){
      console.log(error)
    }else{
      done(null, updatedData)
    }
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (error, deletedRecord) => {
    if(error) { console.log(error) }
    else{ done(null, deletedRecord) }
//if you console.log(deletedRecord) you will see the one being
// removed, evenif it doesn't appear in the database anymore
  })
  //done(null /*, data*/);
};

const removeManyPeople = (done) => {
//The Model.remove() doesn’t return the deleted document, but
// a JSON object containing the outcome of the operation, and 
// the number of items affected
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (error, jsonStatus) => {
    if(error) { console.log(error) }
    else {
      done(null, jsonStatus)
    }
  })
//done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
// this is very useful
  Person.find({favoriteFoods: {$all: foodToSearch}})
//you can ascend or decend by using '-'
    .sort('name')
    .limit(2)
// you can include or exlude with '-'
    .select('-age')
    .exec((error, data) => {
      if(error){ console.log(error) }
      else{ done(null, data) }
    })

  //done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
