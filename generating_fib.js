function printGeneratingFib(N) {
  console.log(0);
  if (N < 1) {
    return;
  }
  console.log(1);

  let a = 0;
  let b = 1;
  let sum = null;

  while((a + b) <= N) {
    sum = a + b;
    console.log(sum); //Print 1,2,3,5,8...
    a = b;
    b = sum;
  }
}
