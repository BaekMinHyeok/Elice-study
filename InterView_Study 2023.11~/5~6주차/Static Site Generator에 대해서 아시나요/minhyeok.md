-   -   답변

        > ssg 동작 방식으로는 사용자가 웹 페이지를 방문하면(`request`), 엣지 캐싱(`edge caching`)된 HTML 클라이언트로 반환해 줍니다. 브라우저는 HTML을 다운로드하고 최종 사용자가 사이트를 볼 수 있도록 한다.
        > 엣지 캐싱(edge caching)이란?
        > 최종 사용자에게 더 가까운 컨텐츠를 저장하기 위해 캐싱 서버를 사용하는 것이다. 대표적으로 CDN을 많이 사용한다.
        > 장점으로는 SSG는 사전에 빌드된 HTML로 성능 향상을 제공하여 보다 빠른 렌더링, 콘텐츠 풀 페인트 및 상호 작용 시간을 얻을 수 있습니다. 첫 번째 바이트까지의 시간도 일관되게 빨라져 사용자 경험을 향상시킵니다. 이미 생성된 HTML 파일을 받기 때문에 `SEO` 친화적이다.
        > 단점으로는 모든 URL에 대해 개별 HTML 파일을 생성해야 한다. 따라서 URL을 미리 예측할 수 없거나 URL을 예측할 수 없으면 적용이 어렵다.
        > 유저랑 상호작용이 많고 고객의 개인정보로 기준으로 이루어지는 서비스라면 검색엔진 노출보다 고객의 데이터를 보호하는 것이 더 중요할 수 있다 -> CSR
        > 회사홈페이지이기 때문에 상위노출이 필요하고 누구에게나 항상 같은 내용을 보여줘야하며 매주 업데이트 되어야한다면 ->SSR
        > 회사홈페이지이기 때문에 상위노출이 필요하고 누구에게나 항상 같은 내용을 보여줘야 하지만 업데이트를 거의 하지 않아도 된다면 -> SSG
        > 만약 사용자에 따라 페이지 내용이 달라지며 화면깜빡임 없는 빠른 인터렉션이 중요하고 상위노출이 필요하다면 -> CSR + SSR = Universal랜더링을 고려해야한다!

        정리
        동작 방식:

사용자가 웹 페이지를 요청할 때, 사전에 빌드된 정적 HTML 파일을 반환합니다. 이러한 파일은 엣지 캐싱 서버(CDN)에서 관리되어 사용자에게 빠르게 제공됩니다.
엣지 캐싱 및 CDN:

엣지 캐싱은 콘텐츠를 사용자에게 가장 가까운 위치에 캐싱 서버에 저장하는 것입니다. 대표적인 예로 CDN(Content Delivery Network)이 있습니다. 이를 통해 빠른 전송 속도와 성능을 얻을 수 있습니다.
장점:

성능 향상: 미리 생성된 HTML로 인해 빠른 페이지 로딩 및 렌더링이 가능합니다.
SEO 우수성: 검색 엔진 최적화에 유리하며, 검색 엔진은 사전에 생성된 HTML을 쉽게 크롤링할 수 있습니다.
일관된 TTFB(Time To First Byte): 첫 번째 바이트 시간이 일관되게 빨라져 사용자 경험을 향상시킵니다.
단점:

개별 HTML 파일: 모든 URL에 대해 개별 HTML 파일을 생성해야 합니다.
동적 데이터: 동적으로 변경되는 데이터에 대한 처리가 제한적이며, 일반적으로는 클라이언트 측 JavaScript를 사용하여 데이터를 가져옵니다.
URL 예측 어려움: 동적인 라우팅이나 URL 예측이 어려운 경우에는 SSG의 이점을 제대로 활용하기 어려울 수 있습니다.
종합적으로 SSG는 정적 콘텐츠에 적합하며, 빠른 성능과 SEO 친화성을 제공하는 반면, 동적 데이터에 대한 처리가 제한적이며 URL 구조의 유연성이 부족할 수 있습니다. - 조사
**SSG 동작 방식** 1. 사용자가 웹 페이지를 방문하면(`request`), 엣지 캐싱(`edge caching`)된 HTML 클라이언트로 반환해 준다. 2. 브라우저는 HTML을 다운로드하고 최종 사용자가 사이트를 볼 수 있도록 한다. > 엣지 캐싱(edge caching)이란? > 최종 사용자에게 더 가까운 컨텐츠를 저장하기 위해 캐싱 서버를 사용하는 것이다. 대표적으로 CDN을 많이 사용한다.
**SSG 장점** - SSG는 사전에 빌드된 HTML로 성능 향상을 제공하여 보다 빠른 렌더링, 콘텐츠 풀 페인트 및 상호 작용 시간을 얻을 수 있습니다. 첫 번째 바이트까지의 시간도 일관되게 빨라져 사용자 경험을 향상시킵니다.
빌드 타임에 HTML 파일이 생성되기 때문에 빠른 `FP`, `FCP`, `TTI`를 제공한다. 또한 매 요청마다 생성하는 것이 아니므로, `SSR`과 달리 일관성있게 빠른 `TFB`를 달성할 수 있다. - **FP (첫 번째 페인트):** 초기 렌더링이 빠르게 발생합니다. - **FCP (첫 번째 콘텐츠 풀 페인트):** 브라우저가 첫 번째 콘텐츠를 신속하게 렌더링합니다. - **TTI (인터랙티브까지의 시간):** 페이지가 완전히 인터랙티브 상태로 빨리 변합니다. - **TFB (첫 번쨰 바이트까지의 시간)** : - 브라우저가 페이지 콘텐츠의 첫 번째 바이트를 수신하는 시간을 측정합니다. - 사전에 빌드된 HTML로 인해 SSR보다 일관되게 더 빠른 TFB가 가능합니다.
이미 생성된 HTML 파일을 받기 때문에 `SEO` 친화적이다.
`build` 명령은 실제로 사이트를 방문하는 사람의 워크플로를 벗어나므로 시간이 좀 걸리더라도 문제되지 않는다.
**SSG 단점** - 모든 URL에 대해 개별 HTML 파일을 생성해야 한다. 따라서 URL을 미리 예측할 수 없거나 URL을 예측할 수 없으면 적용이 어렵다. > 유저랑 상호작용이 많고 고객의 개인정보로 기준으로 이루어지는 서비스라면 검색엔진 노출보다 고객의 데이터를 보호하는 것이 더 중요할 수 있다 -> CSR > 회사홈페이지이기 때문에 상위노출이 필요하고 누구에게나 항상 같은 내용을 보여줘야하며 매주 업데이트 되어야한다면 ->SSR > 회사홈페이지이기 때문에 상위노출이 필요하고 누구에게나 항상 같은 내용을 보여줘야 하지만 업데이트를 거의 하지 않아도 된다면 -> SSG > 만약 사용자에 따라 페이지 내용이 달라지며 화면깜빡임 없는 빠른 인터렉션이 중요하고 상위노출이 필요하다면 -> CSR + SSR = Universal랜더링을 고려해야한다!
