import Medo from "../../../models/Medo.js";

Medo.insert(
  {
    age: 20,
    id: "mfo8z1akc61on6",
    name: "test",
    test: {
      test1: "kdhgdf",
      test2: "kjshadgfkj",
    },
  },
  "cars"
);
console.log(Medo.getAll());
