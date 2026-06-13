# Miffy Coding Mate

## 주요 기능

* Claude Code, Codex, Gemini CLI 등 다중 에이전트 연동
* idle / thinking / working / worried / happy / surprised / sleeping / waking 상태 애니메이션
* 8포즈 시트를 자동 분할하고 배경을 투명화하여 APNG로 생성
* idle 상태에서 마우스 커서를 따라보는 눈동자 SVG
* 작업 세션 수에 따른 애니메이션 단계 변화
* 클릭, 더블클릭, 드래그 반응
* 화면 가장자리 mini mode
* 완료·권한 요청·오류 알림과 사운드
* 첫 실행 시 운영체제 로그인 자동 시작 등록
* 설정에서 `로그인할 때 시작`을 언제든 끌 수 있음
* Windows, macOS, Linux 빌드 지원

## 폴더 구조

```text
miffy-coding-mate/
├─ artwork/source/miffy-pose-sheet.png   # 원본 4x2 포즈 시트
├─ artwork/processed/                    # 투명 PNG 중간 결과
├─ themes/miffy/                         # 실제 기본 테마
│  ├─ theme.json
│  └─ assets/*.apng, *.svg
├─ scripts/build-miffy-theme.py          # 시트 분할·투명화·APNG 생성
├─ scripts/project-health-check.js       # 프로젝트 상태 점검
├─ scripts/setup-windows.ps1             # Windows 초기 설정
├─ scripts/setup-unix.sh                 # macOS/Linux 초기 설정
└─ src/                                  # Electron 애플리케이션
```

## Windows에서 소스 코드로 실행

### 1. 준비물

* Windows 10 또는 Windows 11
* Git
* Node.js 20 이상
* PowerShell

### 2. 설치

```powershell
git clone https://github.com/devCharlotte/my-gpt.git
cd my-gpt
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-windows.ps1
```

### 3. 실행

```powershell
npm start
```

첫 실행이 완료되면 다음 로그인부터 **Miffy Coding Mate가 자동으로 실행**됩니다. 자동 실행을 끄려면 앱의 `Settings → General → Startup → Start at login`을 끄면 됩니다.

## Windows 설치 파일 만들기

다음 명령 하나로 의존성 설치, 검사, sidecar 다운로드, x64 설치 파일 생성을 수행할 수 있습니다.

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\setup-windows.ps1 -BuildInstaller
```

또는 각 단계를 직접 실행할 수 있습니다.

```powershell
npm install
npm run check
npm run fetch:sidecars -- --target windows-x64
npm run build:win:x64
```

완성된 설치 파일은 `dist/` 폴더에 생성됩니다.

## macOS/Linux에서 실행

```bash
git clone https://github.com/devCharlotte/my-gpt.git
cd my-gpt
bash scripts/setup-unix.sh
npm start
```

Linux에서는 `~/.config/autostart/miffy-coding-mate.desktop`을 사용해 로그인 자동 시작을 등록합니다.
