### What is Dynamic programming?

Dynamic programming is a computer programming method used to avoid computing
multiple time the same subproblem in a recursive algorithm.

Dynamic programming is applied to optimization problems where can be many possible solutions.
Each solution has a value what can be found by solution with the optimal (minimum or maximum) value.
This solution calls an optimal solution to the problem.

Dynamic programming method can design in 4 steps:
1. Characterize the structure of an optimal solution.
2. Recursively define the value of an optimal solution.
3. Compute the value of an optimal solution in a bottom-up fashion.
4. Construct an optimal solution from computed information.

<b>*</b>Some of the algorithm problems can be solved by the "divide and conquer" strategy instead of Dynamic programming.
For example:
  - Merge sort
  - Quick sort

Solutions for these algorithms not overlapping sub-problems, so they not classified as dynamic programming problems.

### The Fibonacci

Numbers( 0,1,1,2,3,5,8,13,21,34...), it’s the Fibonacci sequence, described by the recursive formula:

```

F(0) = 0, (1) = 1
F(N) = F(N - 1) + F(N - 2), for N > 1.

```

Fibonacci sequence which approximates the [golden spiral](https://en.wikipedia.org/wiki/Golden_ratio#Relationship_to_Fibonacci_sequence).

The spiral is drawn starting from the inner 1×1 square and continues outwards to successively
 larger squares.

![Vizualization Fibonacci sequence](https://en.wikipedia.org/wiki/Golden_ratio#/media/File:FakeRealLogSpiral.svg)

Commonly denoted F(n) form a sequence, such that each number is the 
sum of the two preceding ones, starting from 0 and 1.

Given N, calculate F(N).
Fibonacci sequence most common example to Dynamic programming method.

Trivial algorithm for computing F(N):
```

if n = 0: return 0
else if n = 1: return 1
else: return naive F(n − 1) + F(n − 2)
```

JavaScript implementation:

```js

/**
 * Time complexity: O(2^n)
 * Space complexity: O(n)
 *
 * @param number N
 * @return number
 */
function getFibonacciNumberRecursive(N) {
  if (N <= 1) {
    return N;
  }
  return getFibonacciNumberRecursive(N - 1) + getFibonacciNumberRecursive(N - 2);
}
```

### Runtime Analysis:

To calculate F(n) as sum of time to calculate F(n-1) and F(n-2), plus time to calculate them together O(1):
```

T(n<=1) = O(1) - for all operations F(1), F(0)

T(n) = T(n − 1) + T(n − 2) + O(1)
T(n) = T(n − 1) + T(n − 2) + c
2^kT(n − 2 * k) + c(2^(k−1) + 2^(k−2) + . . . + 2 + 1) = Ω(c2 ^ (n/2))

```

Where "c" is the time needed to add n-bit numbers. Since

```
T(n) = Ω(n2 ^ n/2) => T(n) = O(2^n)

```

<b>O(2^n)</b> - exponential time and O(n) space complexity for call stack size.

To describe <b>O(2^n)</b> time complexity, let's draw the recursion tree of calls,
which will have depth n and intuitively figure out that this function 
is asymptotically <b>O(2^n)</b>.

To prove this conjecture by induction, let shows recursion tree for F(5)

```

                                        /<------------- F(5) ------------------>\
                                      /                                          \
                                F(4)[F(n - 1)]                                    F(3)[F(n - 2)]
                               /               \                                  /             \
                              /                 \                                /               \
                     F(3)[F(n - 1)]              F(2)[F(n - 2)]                 F(2)[F(n - 1)]    F(1)[F(n - 2)]
                     /           \               /             \                /             \
                    /             \             /               \              /               \
      F(2)[F(n - 1)]             F(2)[F(n - 1)] F(1)[F(n - 1)] F(0)[F(n - 2)]  F(1)[F(n - 1)]  F(0)[F(n - 2)]
      /             \
     /               \
  F(1)[F(n - 1)]      F(0)[F(n - 2)]

```

In provide recursion tree of calls example, getFibonacciNumberRecursive(5) or F(5) function make
multiple executions with same arguments:
- F(2) - 4 times
- F(3) - 2 times
- The leaves of the recursion tree will always return 1 (F(1) and F(0))

Assume T(n-1) = O(2^(n-1)), therefore

```

T(n) = T(n-1) + T(n-2) + O(1) which is equal to
T(n) = O(2 ^ (n-1)) + O(2 ^ (n-2)) + O(1) = O(2^n)

```

Consequently, the tight bound for this function is the Fibonacci sequence itself (~θ(1.6^n))
which related to Golden ratio

![Vizualization Golden ratio with numbers](https://en.wikipedia.org/wiki/Fibonacci_number#/media/File:FibonacciSpiral.svg) 

### Improved Fibonacci Algorithm by memoization.

Simple way to optimeze function getFibonacciNumberRecursive, create a chache Object for memoize storage.
Runtime, assuming n-bit registers for each entry of memo data structure(cache Object):

```

T(n) = T(n − 1) + O(1) = O(n)
T(n) = T(n − 1) + c = O(cn)
T(n) = O(n ^ 2)
```

JavaScript implementation:

```js
/*
 * @param memo - cache storage object
 */
const memo = {};

/**
 * Time complexity: O(n ^ 2)
 * Space complexity: O(n)
 *
 * @param number N
 * @return number
 */
function getFibonacciNumberRecursive(N) {
  if (N <= 1) {
    return N;
  }
  if (!memo[N]) {
    memo[N] = getFibonacciNumberRecursive(N - 1) + getFibonacciNumberRecursive(N - 2);
  }
  return memo[N];
}
```

In recursion tree of calls example, (5) or F(5) function make
one execution with same arguments:
- F(2) - 1 times
- F(3) - 1 times

For optimization memoization method time complexity, we can store the previous two numbers only
because that is all we need to get the next Fibonacci number in series.

JavaScript iterative implementation

```js

/**
 * Iterative
 * Time complexity: O(n)
 * Space complexity: O(1)
 *
 * @param number N
 * @return number
 */
function getFibonacciNumberIterative(N) {
  if (N <= 1) {
    return N;
  }
  let a = 0;
  let b = 1;
  let sum = null;

  for (let i =2; i <= N; i++) {
    sum = a + b;
    a = b;
    b = sum;
  }

  return b;
}
```

Alternative optimization recursion version, can be implementation of [tail recursion](https://en.wikipedia.org/wiki/Tail_call).
Calculate the results first, and pass the results of your current call onto the next recursive call.

Tail recursion JavaScript implementation.

```js

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 *
 * @param number N
 * @return number
 */
function getFibonacciNumberTailRecursion (n, a = 0, b = 1){
  if (n > 0) {
    return fib(n - 1, b, a + b)
  }
  return a
}

```

In the tail-recursive case, with each evaluation of the recursive call, the running total is updated.

#### Bonus reference.

Faster Math solution, not related to Dynamic programming.

```js
/**
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibFormula.html
 * @param number N
 * @return number
 */
function getFibonacciNumberMath (N){
  return parsetInt(Math.round(Math.pow((1 + Math.sqrt(5)) / 2, N) / Math.sqrt(5))); 
}
```

Formula [reference](http://www.maths.surrey.ac.uk/hosted-sites/R.Knott/Fibonacci/fibFormula.html). 

