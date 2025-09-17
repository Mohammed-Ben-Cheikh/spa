class Medo {
  dbName;

  constructor(dbName) {
    this.dbName = dbName;
    if (!localStorage.getItem(dbName)) {
      localStorage.setItem(dbName, JSON.stringify({}));
    }
  }

  getAll() {
    const data = localStorage.getItem(this.dbName);
    return data ? JSON.parse(data) : {};
  }

  getCollection(collection) {
    const db = this.getAll();
    return db[collection] || [];
  }

  getById(id, collection) {
    const data = this.getCollection(collection);
    return data.find((i) => i.id === id) || undefined;
  }

  insert(data, collection) {
    const db = this.getAll();
    if (!db[collection]) db[collection] = [];
    data.id =
      Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
    db[collection].push(data);
    localStorage.setItem(this.dbName, JSON.stringify(db));
    return data.id;
  }

  update(collection, id, newData) {
    const db = this.getAll();
    const item = db[collection].find((i) => i.id === id);
    item = (...newData)
  }
}

const spa = new Medo("app");
const users = spa.getCollection("users");
const data = spa.insert({ name: "mohammed", age: 20 }, "users");

console.log(spa.update("users", "mfnthk58b51ygj"));
