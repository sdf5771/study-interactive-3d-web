# Interactive 3D Web Study Project

React + TypeScript + Three.js를 활용한 인터랙티브 3D 웹 학습 프로젝트입니다.


## 🚀 프로젝트 개요

이 프로젝트는 Three.js를 사용하여 다양한 3D 그래픽스 기술을 학습하고 실습하기 위한 교육용 프로젝트입니다. 

각각의 페이지에서 서로 다른 3D 기술과 개념을 다루고 있습니다.

사용된 3D Model 들은 직접 `blender`를 사용해서 모델링과 리깅 작업을 진행하였습니다.

## 🛠 기술 스택

- **Frontend Framework**: React 19.1.1
- **Language**: TypeScript 5.8.3
- **Build Tool**: Vite 7.1.2
- **3D Graphics**: Three.js 0.179.1
- **Animation**: GSAP 3.13.0
- **Routing**: React Router DOM 7.8.2
- **Development Tools**:
  - dat.GUI 0.7.9 (GUI 컨트롤)
  - Stats.js 0.17.0 (성능 모니터링)

## 📁 프로젝트 구조

```bash
src/
├── routes/
│ ├── Home/ # 메인 페이지 (네비게이션)
│ ├── Camera/ # 카메라 제어 학습
│ ├── Geometry/ # 기본 지오메트리 학습
│ ├── SphereGeometry/ # 구체 지오메트리 학습
│ ├── Group/ # 그룹 오브젝트 학습
│ ├── Transform/ # 변환(이동, 회전, 스케일) 학습
│ ├── Utility/ # 유틸리티 기능 학습
│ ├── Gsap/ # GSAP 애니메이션 학습
│ └── LoadGltf/ # GLTF 모델 로딩 및 애니메이션
├── components/ # 공통 컴포넌트
├── assets/ # 정적 자원
└── App.tsx # 메인 앱 컴포넌트
```

## 🎮 주요 기능

### 1. **Camera** (`/camera`)

- Three.js 카메라 제어 기본기
- 원근 카메라(PerspectiveCamera) 사용법
- OrbitControls를 통한 카메라 조작

### 2. **Geometry** (`/geometry`, `/sphere-geometry`)

- 기본 지오메트리 생성 및 조작
- 구체, 박스 등 다양한 형태의 3D 오브젝트
- 머티리얼과 지오메트리의 결합

### 3. **Transform** (`/transform`)

- 3D 오브젝트의 위치, 회전, 크기 변환
- 실시간 변환 애니메이션

### 4. **Group** (`/group`)

- 여러 오브젝트를 그룹으로 관리
- 계층 구조를 통한 복합 오브젝트 제어

### 5. **GSAP Animation** (`/gsap`)

- GSAP 라이브러리를 활용한 고급 애니메이션
- 타임라인 기반 애니메이션 제어

### 6. **GLTF Model Loading** (`/load-gltf`)

- 3D 모델 파일(.glb) 로딩 및 렌더링
- 본(Bone) 기반 캐릭터 애니메이션
- 키보드 입력을 통한 캐릭터 제어
- **조작법**:
  - `W`: 전진
  - `S`: 후진
  - `A`: 좌측 이동
  - `D`: 우측 이동
  - `Space`: 점프

### 7. **Utility** (`/utility`)

- AxesHelper, GridHelper 등 개발 도구
- dat.GUI를 통한 실시간 파라미터 조정
- Stats.js를 통한 성능 모니터링

## 🎯 3D 모델

프로젝트에 포함된 3D 모델:

- `miffy__bg.glb`: 미피 캐릭터 (본 애니메이션 지원)
- `strawberry_monkey.glb`: 딸기 원숭이 모델

## 🚀 시작하기

### 설치

```bash
# 의존성 설치
npm install
```

### 개발 서버 실행

```bash
# 개발 서버 시작
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 프로젝트를 확인할 수 있습니다.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📚 학습 목표

1. **Three.js 기초**: 씬, 카메라, 렌더러의 기본 구조 이해
2. **3D 지오메트리**: 다양한 3D 형태 생성 및 조작
3. **애니메이션**: 프레임 기반 애니메이션과 GSAP 활용
4. **3D 모델 처리**: GLTF 형식의 3D 모델 로딩 및 제어
5. **인터랙션**: 사용자 입력을 통한 3D 오브젝트 제어
6. **성능 최적화**: 3D 렌더링 성능 모니터링 및 최적화

## 🎮 GLTF 캐릭터 제어 시스템

LoadGltf 페이지에서는 본(Bone) 기반의 캐릭터 애니메이션을 구현했습니다:

- **자연스러운 걷기 애니메이션**: 다리와 팔이 교대로 움직이는 리얼한 걸음걸이
- **점프 액션**: 스페이스바로 점프 동작 실행
- **Threshold 기반 애니메이션**: 회전 각도 제한을 통한 자연스러운 움직임
- **실시간 본 제어**: 각 신체 부위별 독립적인 애니메이션 제어

## 🔧 개발 도구

- **dat.GUI**: 실시간 파라미터 조정을 위한 GUI 컨트롤러
- **Stats.js**: FPS, 메모리 사용량 등 성능 지표 모니터링
- **OrbitControls**: 마우스를 통한 카메라 제어
- **AxesHelper & GridHelper**: 3D 공간 시각화 도구

## 📝 라이센스

이 프로젝트는 학습 목적으로 제작되었습니다.
