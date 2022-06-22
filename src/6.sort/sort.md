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

#### 선택정렬

버블정렬과 비슷하지만, 큰 값을 배열 끝에 위치시키는 대신 작은 값을 한 번에 하나씩 위치에 배열한다.최솟값을 찾아 마지막에 바꾸어 맨앞에 둔다.

- 첫 번째 부터 n까지 순회후 어떤 값이 들어갈지 선택하여 정렬한다.한 루프가 끝날때 선택된 값의 자리가 확정된다.
- 시간복잡도는 O(n²)
- ![img](https://cdn-images-1.medium.com/max/1600/1*to7gYwi5_bkZhx-1kSB0Lg.gif)

#### 삽입정렬

한번에 하나의 값의 취해서 올바른 위치에 삽입하는 정렬이다. 현재위치보다 낮은 index값을 순회하며 값을 올바른 위치에 삽입한다.

- 시간복잡도는 O(n²)
- ![img](https://cdn-images-1.medium.com/max/1600/1*IK3Q4NBRLthllMINV3OxpQ.gif)

#### 참조

___

https://devbin.kr/2020/algorithm-sort-algorithm-%EC%A0%95%EB%A0%AC-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98/#i-4

https://jinhyy.tistory.com/9