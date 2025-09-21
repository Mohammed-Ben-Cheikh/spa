async function test(param) {
  return new Promise((res, rej) => {
    param ? res("ah") : rej("la");
  });
}

test(true)
  .then((r) => {
    console.log(`mohammed gol ${r}`);
  })
  .catch((err) => {
    console.log(`omar gol ${err}`);
  });

console.log("ahhh");
