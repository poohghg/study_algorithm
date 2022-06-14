#### 객체와 연산

빅오의 시점에서 자바스크립트는 어떻게 배열과 객체를 뻐르게 처리할까?

#### 객체

- 객체에서 입력,접근,제거는 모두 상수시간이다

- 객체을 검색하는것은 선형시간이다.

- ```javascript
  function basicObject() {
    const obj = {
      a: 'A',
      b: 'B',
      c: 'C',
    };
    // O(n) 선형시간.
    Object.keys(obj);
    Object.values(obj);
    Object.entries(obj);
    // O(1) 상수시간.
    obj.hasOwnProperty(a);
  }
  ```

#### 배열

- 배열에서 접근은 상수시간이다.
- 배열에서의 탐색은 O(n) 선형시간 이다.
- 배열끝에 추가하는 것은 상수시간이다.(push)
- 이미 만들어진 배열의 중간 또는 앞에 값을 추가,제거 하는 것은 O(n) 선형시간 이다.
  - index를 재정의 하기때문이다.
  - 변경은 x
- 배열 메서드의 시간복잡도
- <img src="/Users/khg/Library/Application Support/typora-user-images/image-20220612174042054.png" alt="image-20220612174042054" style="zoom:50%;" />
- 출처: https://cs.slides.com/colt_steele/built-in-data-structures-25#/11/0/0**N**

