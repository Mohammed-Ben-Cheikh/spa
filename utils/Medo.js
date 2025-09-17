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

  getBy(key, value, collection) {
    const data = this.getCollection(collection);
    return data.find((i) => i[key] === value) || undefined; // ✅ fixed
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
    if (!db[collection]) return;
    let updatedItem = null;
    db[collection] = db[collection].map((item) => {
      if (item.id === id) {
        updatedItem = { ...item, ...newData };
        return updatedItem;
      }
      return item;
    });
    localStorage.setItem(this.dbName, JSON.stringify(db));
    return updatedItem;
  }

  remove(id, collection) {
    const db = this.getAll();
    if (!db[collection]) return;
    db[collection] = db[collection].filter((item) => item.id !== id);
    localStorage.setItem(this.dbName, JSON.stringify(db));
    return id;
  }
}

// export default Medo;

export default new Medo("app");
