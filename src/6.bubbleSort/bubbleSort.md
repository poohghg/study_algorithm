#### 정렬

정렬 알고리즘은 컬렉션의 항목을 재배열하는 과정을 의미한다.

- https://www.toptal.com/developers/sorting-algorithms
- 정렬은 프로그램에서 흔히 사용된다.
- 정렬을 수행할수 있는 다양한 알고리즘이 존재하고, 각각의 장단점이 있다.

자바스크립트에서 sort메서드의 로직 수행방식

- https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

- ```
  arr.sort([compareFunction])
  ```

- `compareFunction`이 제공되지 않으면 요소를 문자열로 변환하고 유니 코드 코드 포인트 순서로 문자열을 비교하여 정렬됩니다. 
  - a,b를 인자로 받았을때
  - -(음수)를 반환하면 a,b
  - +(양수)를 반환하면 b,a 

#### 버블정렬

- 흔히 사용되지 않음 x, 성능도 별로임
- 한번에 하나씩 이동한다.
- 루프를 돌면서 각 항목을 다음 항목과 비교후 교환한다.
  - 시간복잡도는 O(n²)
  - 한 항목을 전체 항목과 비교하여 정렬한다?
  - ![img](https://cdn-images-1.medium.com/max/1600/1*ZQmdM7My9QIhvxj98hrweg.gif)