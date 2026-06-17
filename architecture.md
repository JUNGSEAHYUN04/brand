# 🏗️ BrandKit 서비스 아키텍처 (Advanced)

```mermaid
graph TD
    %% 1. 클라이언트 계층
    subgraph Client_Layer [1. 클라이언트 계층]
        A[Web / Mobile / Dashboard]
        A1[사용자 만족도 및 수정 데이터 수집]
    end

    %% 2. API 계층
    subgraph API_Layer [2. API 계층]
        B[API Gateway / Auth]
        C[Job Queue / Redis - 비동기 작업 관리]
    end

    %% 3. AI 오케스트레이션 계층
    subgraph AI_Orchestration [3. AI 오케스트레이션 계층]
        D[Brand Orchestrator - 워크플로우 제어]
        E[분석/전략 엔진 - 시장 및 타겟 분석]
        F{검증 엔진 - Quality Gate / 상표권 체크}
        G[멀티모달 Gemini 엔진 - 텍스트 및 이미지 생성]
        
        D --> E
        E --> F
        F -- "Fail: 품질 미달 시 재실행" --> E
        F -- "Pass: 검증 완료 시 진행" --> G
    end

    %% 4. RAG 지식 계층
    subgraph Knowledge_Layer [4. RAG & 피드백 지식 계층]
        H[(Vector DB: 시장 데이터 및 트렌드)]
        I[(Feedback DB: 사용자 취향 및 수정 이력 학습)]
    end

    %% 5. 데이터 계층
    subgraph Data_Layer [5. 데이터 계층]
        J[(PostgreSQL / S3 / Vector DB)]
        J1[사용자 정보 / 브랜드 에셋 / 피드백 로그]
    end

    %% 6. 결과물 생성 계층
    subgraph Output_Layer [6. 가이드북 생성 엔진]
        K[통합 패키징 & PDF 렌더링]
        L[최종 결과물: Brand Guidebook Package]
    end

    %% 전체 흐름 연결
    A --> B
    B --> C
    C --> D
    
    %% 지식 참조 연결
    E & G <--> H
    G <--> I
    
    %% 데이터 저장 및 출력 연결
    G --> J
    J --> K
    K --> L
    
    %% 피드백 루프 (중요!)
    L -- "사용자 수정 및 채택 데이터 피드백" --> I
    A1 -.-> I