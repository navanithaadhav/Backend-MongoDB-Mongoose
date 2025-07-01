const mongoose = require("mongoose");
const User = require("./user");

main().catch((err) => console.log(err.message));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/testdb");
  const user = await User.findOne({
    name: "John Doe",
  });
  /*const user = await User.create({
    name: "John Doe",
    age: 30,
    email: "johndev@gmail.com",
    hobbies: ["reading", "gaming"],
    address: {
      street: "123 Main St",
      city: "New York",
    },
  });
  console.log(user);*/
  //const users = await User.findById("67f3a1fe8e601b202117137d");
  //const age = await User.exists({ name: "John Doe" });
  /*const user = await User.where("name")
    .equals("John Doe")
    .where("age")
    .gt(20)
    .lt(40)
    .limit(2)
    .select("name age _id")
    .populate("bestFriend")
    .sort({ age: -1 });*/
  //const user = await User.findOne({ name: "John Doe" });
  //const user = await User.findByName("John Doe"); // static method
  //const user = await User.find().byName("John Doe"); // query helper method
  // query helper method
  //user.sayHello(); // call instance method
  //
  // console.log(user.namedEmail);
  console.log(user);
  user.save();
  console.log(user);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
