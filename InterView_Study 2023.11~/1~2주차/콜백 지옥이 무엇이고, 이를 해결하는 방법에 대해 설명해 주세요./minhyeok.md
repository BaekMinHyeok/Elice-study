# 콜백 지옥이 무엇이고, 이를 해결하는 방법에 대해 설명해 주세요.

-   비동기 처리 로직을 위해 콜백 함수를 연속해서 사용할 때 발생하는 문제입니다.
-   콜백함수를 이용해서 비동기 처리를 해주다가 코드가 깊어지는 것을 말합니다.
-   예시도 찾아보자

해결방법

-   Promise
    -   JavaScript에서 비동기 작업을 다루는데 사용되는 객체입니다. 비동기 작업은 작업이 완료되길 기다리지 않고 다른 작업을 수행할 수 있도록 하는 것을 의미합니다.
    **promise가 필요한 이유?**
    -   서버에서 받아온 데이터를 처리하기 위해fetch등으로 서버에서 데이터를 요청하고 받아온 뒤 처리하기 위하여 Promise가 필요하다
    Promise 의 3가지 상태
    **pending** : 대기 - 비동기 처리 로직이 아직 완료되지 않은 상태
    **fulfilled** : 이행 - 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태
    **rejected** : 실패 - 비동기 처리가 실패하거나 오류가 발생한 상태
    then , catch??
-   async, await
    -   **async와 await**는 ES2017에 도입된 문법으로 자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법이다.
    -   기존의 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 도와준다.
