### 그래프

그래프는 유한하고 변할 수 있는 꼭지점 또는 노드나 점들의 집합으로 구성된 데이터 구조이다.

- 즉 그래프는 노드나 노드들의 연결을 모은 것이다.
- 노드들의 연결만 있고, 연결을 성멸하는 패턴은 존재하지 않는다.

그래프용어

- 버텍스: 노드

- 엣지(간선): 노드사이의 연결
- 가중/비가중: 간선에 값을 부여하면 가중 그래프가 된다.
- 방향/무방향: 단방향 또는 양방향(무방향) 그래프로 구성
- <img src="/Users/khg/Library/Application Support/typora-user-images/image-20220806172538803.png" alt="image-20220806172538803" style="zoom:25%;" />

그래프는 인접매트릭스를 이용해 연결된 노드를 표시할 수 있다.

- <img src="/Users/khg/Library/Application Support/typora-user-images/image-20220806173442542.png" alt="image-20220806173442542" style="zoom:25%;" />

또한 인접리스트를 이용해 연결이 된 노드만을 표시할 수 있다.

- 더적은 공간을 사용한다.
- 모든 엣지를 더빠르게 순회할수 있다.
- 허지만 특정 엣지를 확인하는데는 느리다.
- <img src="/Users/khg/Library/Application Support/typora-user-images/image-20220806174533202.png" alt="image-20220806174533202" style="zoom:25%;" />