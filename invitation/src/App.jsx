import { useState, useEffect, useRef } from "react";
import "./App.css";

// 👉 각 사람 입장코드 & 이름
const GUEST_CODES = {
  "OJY-2025": "지영",
  "OJS-2025": "지수",
  "CMS-2025": "명석",
  "KHJ-2025": "효주",
  "KKU-2025": "기욱"
};

function App() {
  // code: 코드 입력 화면
  // confirm: "초대되셨습니다! YES/NO" 팝업
  // noWait: NO 눌렀을 때 3초 기다리기
  // main: 실제 초대장 화면
  const [step, setStep] = useState("code");
  const [code, setCode] = useState("");
  const [guestName, setGuestName] = useState("");
  const [error, setError] = useState("");

  // 음악 재생용 ref
  const audioRef = useRef(null);

  // NO 선택 후 3초 뒤 자동 입장
  useEffect(() => {
    if (step === "noWait") {
      const timer = setTimeout(() => {
        setStep("main");
        playMusic();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  const playMusic = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch(() => {
          // 브라우저에서 막힐 수도 있으니 에러는 무시
        });
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    const trimmed = code.trim();
    const name = GUEST_CODES[trimmed];

    if (!name) {
      setError("입장코드가 올바르지 않아요. 다시 확인해 주세요!");
      return;
    }

    setGuestName(name);
    setError("");
    setStep("confirm");
  };

  const handleYes = () => {
    setStep("main");
    playMusic(); // YES 눌렀을 때 음악 시작
  };

  const handleNo = () => {
    setStep("noWait");
  };

  const isLocked = step !== "main";

  return (
    <div className="app-root">
      {/* 👉 파티 음악 (파일은 public/party.mp3 에 넣기) */}
      <audio ref={audioRef} src="/party.mp3" loop />

      {/* ====== 입장코드 입력 오버레이 ====== */}
      {step === "code" && (
        <div className="overlay">
          <div className="overlay-card">
            <h1 className="overlay-title">2025 송년의 밤 입장코드</h1>
            <p className="overlay-sub">
              각자 부여받은 <strong>개인 입장코드</strong>를 입력해 주세요.
            </p>
            <form onSubmit={handleCodeSubmit} className="code-form">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="[성 + 이름 스펠링]-2025 : KKU-2025"
                className="code-input"
              />
              {error && <p className="code-error">{error}</p>}
              <button type="submit" className="primary-btn">
                입장하기
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ====== YES/NO 팝업 ====== */}
      {step === "confirm" && (
        <div className="overlay">
          <div className="overlay-card">
            <p className="invite-text">
              <span className="invite-name">{guestName}</span>님,
            </p>
            <p className="invite-text main">
              2025년 송년의 밤에 초대되셨습니다!
              <br />
              참여하시겠어요?
            </p>
            <div className="invite-btn-row">
              <button className="primary-btn" onClick={handleYes}>
                YES
              </button>
              <button className="ghost-btn" onClick={handleNo}>
                NO
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====== NO → 필참 안내 ====== */}
      {step === "noWait" && (
        <div className="overlay">
          <div className="overlay-card">
            <p className="no-text">NO를 누르면 안돼요! 😤</p>
            <p className="no-sub">필참입니다! 3초 뒤 자동으로 입장합니다…</p>
          </div>
        </div>
      )}

      {/* ====== 실제 초대장 화면 ====== */}
      <div className={`page-wrap ${isLocked ? "blurred" : ""}`}>
        {/* 배경 파티클 */}
        <div className="particles">
          {Array.from({ length: 18 }).map((_, i) => (
            <span key={i} className={`particle p-${i + 1}`} />
          ))}
        </div>

        {/* 헤더 / 배너 영역 */}
        <header className="hero">
          {/* 상단 폭죽 & 색종이 아치 */}
          <div className="confetti-arc" />
          <div className="fireworks">
            <div className="firework fw-left" />
            <div className="firework fw-right" />
          </div>

          <div className="hero-inner">
            <div className="hero-badge fade-in delay-1">
              2025 YEAR-END PARTY
            </div>
            <h1 className="hero-title fade-in delay-2">
              2025년 송년의 밤
            </h1>

            <p className="hero-sub fade-in delay-3">
              저무는 한 해를 기억하며 여러분과 함께 즐거운 연말 파티를
              갖고자, <br>
              </br>{guestName && (
            <p className="invite-banner">
              <span className="invite-strong">{guestName}</span> 님을 초대합니다 🎉
            </p>)}
              <br className="mobile-only" /><br></br>
              맛있는 음식과 좋은 사람들, 그리고 배꼽이 빠지는 일정이 기다리고
              있으니  참석해 주세요!
            </p>

            <div className="hero-year-row fade-in delay-4">
              <span>잘 가!</span>
              <span className="big">2025</span>
              <span>어서 와!</span>
              <span className="big accent">2026</span>
            </div>
          </div>
        </header>

        <main className="card slide-up">
          {/* 기본 정보 */}
          <section>
            <h2 className="section-title">기본 정보</h2>
            <div className="info-grid">
              <div className="info-row">
                <div className="info-label">일시</div>
                <div className="info-value">
                  시작 : 2025.12.26 (금) 18:00
                  <br />
                  종료 : 2025.12.27 (토) 10:00
                </div>
              </div>
              <div className="info-row">
                <div className="info-label">장소</div>
                <div className="info-value">
                  서울시 마포구 공덕동 463번지,
                  <br />
                  마포현대하이엘오피스텔 1302호
                </div>
              </div>
              <div className="info-row">
                <div className="info-label">준비물</div>
                <div className="info-value">
                  <strong>체력<br></br>쓸모없는 선물{" "}</strong>
                  (25,000원 상당)
                </div>
              </div>
              <div className="info-row">
                <div className="info-label">드레스코드</div>
                <div className="info-value">편안한 복장</div>
              </div>
            </div>
          </section>

          {/* 일정 */}
          <section>
            <h2 className="section-title">파티 일정</h2>
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>시간</th>
                  <th>일정명</th>
                  <th>비고</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="schedule-time">18:00</td>
                  <td className="schedule-name">웰컴 드링크🍹</td>
                  <td className="schedule-note">
                    1회 무료 리필 <br></br>(2회부터 비용 발생)
                  </td>
                </tr>
                <tr>
                  <td className="schedule-time">18:10</td>
                  <td className="schedule-name">저녁 식사</td>
                  <td className="schedule-note">-</td>
                </tr>
                <tr>
                  <td className="schedule-time">19:00</td>
                  <td className="schedule-name">눈 가리고 칵테일 맞추기</td>
                  <td className="schedule-note">무알콜🤭</td>
                </tr>
                <tr>
                  <td className="schedule-time">19:30</td>
                  <td className="schedule-name">선물 옥션</td>
                  <td className="schedule-note">묻지마 입찰 금지</td>
                </tr>
                <tr>
                  <td className="schedule-time">20:30</td>
                  <td className="schedule-name">할리갈리</td>
                  <td className="schedule-note">
                    승부욕 과열 및 갈등 주의
                  </td>
                </tr>
                <tr>
                  <td className="schedule-time">21:30</td>
                  <td className="schedule-name">이상형 월드컵</td>
                  <td className="schedule-note">진정성 필요</td>
                </tr>
                <tr>
                  <td className="schedule-time">22:30</td>
                  <td className="schedule-name">악의 입에 손 넣기</td>
                  <td className="schedule-note">물릴 수 있으니 주의</td>
                </tr>
                <tr>
                  <td className="schedule-time">23:00</td>
                  <td className="schedule-name">보물찾기</td>
                  <td className="schedule-note">실내집기 파손 주의</td>
                </tr>
                <tr>
                  <td className="schedule-time">23:30~</td>
                  <td className="schedule-name">이야기 꽃 피우기</td>
                  <td className="schedule-note">재미 없으면 끊기</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Special Thanks to 최명석님 */}
          <section className="thanks-section">
            <div className="thanks-badge">SPECIAL THANKS</div>
            <p className="thanks-main">
              이번 송년의 밤 디자인과 타임테이블을 준비해주신{" "}
              <br></br>
              <span className="thanks-name">명석님</span>께
              <span className="mobile-only" /> 진심으로 감사합니다! 🎁
            </p>
            {/* <p className="thanks-sub">
              섬세한 계획 덕분에 모두가 더 편하고 즐거운 연말을 보낼 수 있게
              되었어요.
            </p> */}
          </section>

          <section className="footer">
            <p>
              ※ 기타 문의 사항은{" "}
              <strong>H/P 010-5140-0886</strong> 으로 연락 주세요.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
