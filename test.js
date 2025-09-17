function setData() {
  localStorage.setItem(
    JSON.stringify([
      { name: "mohammed", age: 20 },
      { name: "mohammed", age: 20 },
      { name: "mohammed", age: 20 },
    ])
  );
}

setData();
