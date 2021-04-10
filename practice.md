## Coding Problem Review

This will be a file that compiles the practice questions

### Minimum Swaps - Medium
You are given an unordered array consisting of consecutive integers  [1, 2, 3, ..., n] without any duplicates. You are allowed to swap any two elements. Find the minimum number of swaps required to sort the array in ascending order.
```markdown
i   arr                         swap (indices)
0   [7, 1, 3, 2, 4, 5, 6]   swap (0,3)
1   [2, 1, 3, 7, 4, 5, 6]   swap (0,1)
2   [1, 2, 3, 7, 4, 5, 6]   swap (3,4)
3   [1, 2, 3, 4, 7, 5, 6]   swap (4,5)
4   [1, 2, 3, 4, 5, 7, 6]   swap (5,6)
5   [1, 2, 3, 4, 5, 6, 7]
```
#### solution
```
def minimumSwaps(arr):
    i = 0
    count = 0
    while i < len(arr):
        if arr[i] != i+1:
            swap(arr, i, arr[i]-1)
            count+=1
        else:
            i+=1        
    return count  
```
Reflect:\n
I think I overcomplicated the process. Initial solution was to find the index where numbers are not decreasing anymore and swaping the highest from the left and the lowest from the right. E.g.
```
[7, 1, 3, | 2, 4, 5, 6]
```
Turns out always swaping first is a viable option. For future, fully exam a seemingly obious solution before moving on.
```
def helper(arr, count):
    if arr == sorted(arr):
        return count
    else:
        i = len(arr) - 1
        index = 0
        while(i > 0):
            if arr[i-1] > arr[i]:
                index = i
                break
            i -= 1
        high = highest(arr[:index])
        low = lowest(arr[index:])
        arr = swap(arr, high, low + index)
        return helper(arr, count + 1)
        
        
def lowest(arr):
    low = math.inf
    index = 0
    for num in arr:
        if num < low:
            low = num
            index = arr.index(num)
    return index

def highest(arr):
    high = -math.inf
    index = 0
    for num in arr:
        if num > high:
            high = num
            index = arr.index(num)
    return index
                
def swap(arr, a, b):
    temp = arr[a]
    arr[a] = arr[b]
    arr[b] = temp
    return arr
```

### Array Manipulation - Hard

Starting with a 1-indexed array of zeros and a list of operations, for each operation add a value to each the array element between two given indices, inclusive. Once all operations have been performed, return the maximum value in the array.

```
    a b k
    1 5 3
    4 8 7
    6 9 1
Add the values of  between the indices  and  inclusive:

index->	 1 2 3  4  5 6 7 8 9 10
	[0,0,0, 0, 0,0,0,0,0, 0]
	[3,3,3, 3, 3,0,0,0,0, 0]
	[3,3,3,10,10,7,7,7,0, 0]
	[3,3,3,10,10,8,8,8,1, 0]
```

Solution:
```
# Complete the arrayManipulation function below.
def arrayManipulation(n, queries):
    d = [0 for i in range(n+1)]
    result = -math.inf
    for arr in queries:
        a = arr[0] - 1
        b=  arr[1]
        k = arr[2]
        d[a] += k
        d[b] -= k
    
    total = 0
    for s in d:
        total += s
        if total > result:
            result = total 
    return result
```
Reflection
this was very similar to unit step function and the final approach was similar too. The challenge for this is the time restrain. Original approch was to use (a,b) to indicate range and a map to store the k value. Clearly was way more complicated than this approach.



### isPrime()

My solution:
The solution is based on Sieve of Eratosthenes. Basiclly, we work from 0 and to the number limit. The starting prime numbers are 2, 3, 5, 7 and all multiple of the number are not prime. In this algorithm, we create an empty array with predefined value. If the number is prime and we have not enouter it before, all the multiple of this number is not prime and we mark it in the inner loop. Finally, we loop the entire array again to sum the result.
Runtime is O(N log log N). 
Note: the limit of the array is sqrt(n) b/c 3 * 6 == 6 * 3 == 18 therefore the max is sqrt(18)
https://en.wikipedia.org/wiki/Sieve_of_Eratosthenes
```
class Solution:
    def countPrimes(self, n: int) -> int:
        matrix = [False for i in range(n)]
        
        for i in range(2, n): # this can be sqrt(n) because number repeates after sqrt(n)
            if not matrix[i]:
                for j in range(i*i, n, i):
                       matrix[j] = True
                
        count = 0
        for i in range(2, len(matrix)):
            if not matrix[i]:
                count+=1
        return count
```

```
class Solution:
    def countPrimes(self, n: int) -> int:
        #The Sieve of Eratosthenes, which marks all multiples of primes as composite. I.E. 2*2 is composite since 4 is divisible by 2 and therefore not prime
        if n < 3:
            return 0
        primes = [True] * n
        primes[0] = primes[1] = False
        for i in range(2, int(n ** 0.5) + 1):
            if primes[i]:
                primes[i * i: n: i] = [False] * len(primes[i * i: n: i]) #Starting from i*i, Up to n, With step i
        return sum(primes)
```
Reflection:
I think this is a good algorithm to keep in mind since I have seen this before. Good to review every once a while.


### Python Notes

```
casting:

str()
int()
float()

List:
list = []

list.append(a) #add to the end
list.insert(index, item) # add item to the index 
list.index(item) # finding the index of an item

list.pop([index]) # remove last item, optional: remove at the index
or
del list[1] # delete at certain index, can also del list entirely
or
list.clear() # remove all items

list comprehensive
newlist = [expression for item in iterable if condition == True]

s = {} # set
d = {} # dict
s = set(list) # convert list to set, useful for checking repeat



```