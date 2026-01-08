import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../assets/classyai-lg.jpg";
import logoImage from "../assets/logo-nav.png";

const STORAGE_KEY = "classyai_startup_story";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://classy-contact-api.onrender.com";

const sendStoryToEmail = async (story: string) => {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: "classy@stayclassy.ai",
      message: `Startup Story Submission:\n\n${story}`,
      source: "story",
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to send story");
  }
};

const StartupStoryPage: React.FC = () => {
  const [isSending, setIsSending] = useState(false);

  const [story, setStory] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved || "";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, story);
  }, [story]);

  return (
    <div className="page">
      <header className="nav">
        <div className="nav-logo">
          <img src={logoImage} alt="Classy AI Logo" />
          Classy AI
        </div>

        <Link to="/" className="nav-cta">
          ← Back
        </Link>
      </header>

      <main>
        <section
          className="hero"
          style={{ backgroundImage: `url(${heroImage})`, minHeight: "100vh" }}
        >
          <div className="hero-overlay" />

          <div className="hero-content">
            <h2>Our Story</h2>

            {/* READABLE STORY */}
            <div className="story-narrative">
              <p className="story-lead">
                We are living in a world of extraordinary possibility.
              </p>

              <p>
                Scientific progress is accelerating faster than at any moment in
                human history. AI systems can read millions of research papers
                in hours, uncovering patterns in genomics, climate, and
                materials science that would take humans centuries to find.
              </p>

              <p>
                Entire fields from drug discovery to climate modeling are
                advancing not by small steps, but by extraordinary leaps. For
                the first time, humanity has tools that can operate at a scale
                and complexity no individual mind ever could.
              </p>

              <p>By every measure, this should be a golden age of learning.</p>

              <hr className="story-divider" />

              {/* <p className="story-section-title">The Reality</p> */}

              <p>
                But inside classrooms and lecture halls, a new paradigm is
                emerging. Students are watching AI do the work for them.
              </p>

              <ul className="story-list">
                <li>It synthesizes literature instantly.</li>
                <li>Solves math and science problems step by step.</li>
                <li>Writes and rewrites essays in seconds.</li>
                <li>Generates clean, working code on demand.</li>
              </ul>

              <p>Learning has become optional.</p>

              <hr className="story-divider" />

              {/* <p className="story-section-title">The Human Cost</p> */}

              <p>A deeper question begins to surface:</p>

              <p className="story-question">
                If AI can do everything, what role will I have in the future?
              </p>

              <p>
                Students are no longer just anxious about grades. We are
                losing confidence in a future that includes us. Losing faith
                that effort matters and losing hope that the slow friction of understanding has
                value in a world optimized for speed.
              </p>

              <p className="story-closing">
                This is the true crisis.
              </p>
            </div>

            {/* DRAFT AREA */}
            <div className="hero-content">
              <h2>Your Story </h2>
              <p>Draft your narrative here. It auto-saves in this browser.</p>

              <div className="story-card">
                <textarea
                  className="story-textarea"
                  value={story}
                  onChange={(e) => setStory(e.target.value)}
                  placeholder="Write your story here..."
                />

                <div className="story-meta">
                  <span>{story.length.toLocaleString()} characters</span>

                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setStory("")}
                    >
                      Clear
                    </button>

                    <button
                      type="button"
                      className="btn-primary"
                      disabled={!story.trim() || isSending}
                      onClick={async () => {
                        try {
                          setIsSending(true);
                          await sendStoryToEmail(story);
                          alert("Story sent to classy@stayclassy.ai ✨");
                        } catch (err) {
                          console.error(err);
                          alert("Failed to send story. Please try again.");
                        } finally {
                          setIsSending(false);
                        }
                      }}
                    >
                      {isSending ? "Sending…" : "Send"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StartupStoryPage;
