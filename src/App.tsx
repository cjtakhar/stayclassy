// src/App.tsx
import React, { useState } from "react";
import heroImage from "./assets/classyai-lg.jpg";
import logoImage from "./assets/logo-nav.png";
import { LuMessageSquare } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://classy-contact-api.onrender.com";

const postMessage = async (payload: {
  email: string;
  message: string;
  source: "contact" | "chat";
  confirm_email_address?: string;
}) => {
  const res = await fetch(`${API_BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error("Failed to send message");
  }
};

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  // 🔔 Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success"
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000); // auto-hide after 4s
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = (data.get("email") as string) || "";
    const honeypot = (data.get("confirm_email_address") as string) || "";

    try {
      await postMessage({
        email,
        message: `New waitlist signup from: ${email}`,
        source: "contact",
        confirm_email_address: honeypot,
      });
      // ✅ Toast instead of alert
      showToast("You're on the Classy AI waitlist ✨", "success");
      form.reset();
    } catch (err) {
      console.error(err);
      showToast("Sorry, something went wrong. Please try again.", "error");
    }
  };

  const handleChatSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = (data.get("chatEmail") as string) || "";
    const message = (data.get("chatMessage") as string) || "";
    const honeypot = (data.get("confirm_email_address") as string) || "";

    try {
      await postMessage({
        email,
        message,
        source: "chat",
        confirm_email_address: honeypot,
      });
      // ✅ Toast instead of alert
      showToast("Message sent! We’ll get back to you soon 💌", "success");
      form.reset();
      setIsChatOpen(false);
    } catch (err) {
      console.error(err);
      showToast("Couldn’t send your message. Please try again.", "error");
    }
  };

  return (
    <div className="page">
      {/* NAV */}
      <header className="nav">
      <div className="nav-logo">
        <img src={logoImage} alt="Classy AI Logo" />
          Classy AI
          
        </div>
        <button
          className="nav-cta"
          onClick={() =>
            window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
          }
        >
          Get Early Access
        </button>
      </header>

      {/* HERO */}
      <main>
        <section
          className="hero"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="hero-overlay" />
          <div className="hero-content">
            <h1>Classy AI</h1>
            <h2>Elevate Your Intelligence</h2>
            <h3>Socrates v1.0</h3>
            <p className="hero-subtitle">
              An ethical AI learning platform designed to build reasoning — not replace it.
            </p>
            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Early Access
              </button>
              {<button 
                className="btn-secondary"
                onClick={() => window.open("https://arxiv.org/abs/2502.00341", "_blank", "noopener,noreferrer")}
              >
                Research
              </button>}
            </div>
          </div>
        </section>

        <section id="features" className="section">
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Socratic Method</h3>
              <p>Guided questions that help you understand complex concepts.</p>
            </div>
            <div className="feature-card">
              <h3>Ethical by Design</h3>
              <p>
                Built to amplify your ability to learn instead of providing answers.
              </p>
            </div>
            <div className="feature-card">
              <h3>Bounded Learning</h3>
              <p>
                Custom model trained to prevent hallucinations.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT – “halfway down” */}
        <section id="contact" className="contact-section">
          <div className="contact-inner">
            <h2>Join the list.</h2>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              {/* Honeypot field */}
              <input
                name="confirm_email_address"
                type="text"
                title="confirm_email"
                aria-hidden="true"
                tabIndex={-1}
                autoComplete="off"
                className="hidden-field"
              />
              <input
                name="email"
                type="email"
                placeholder="Email*"
                required
                className="contact-input"
              />
              <div className="contact-bottom-row">
                <label className="contact-checkbox">
                  <input type="checkbox" />
                  <span>Sign up for updates and more</span>
                </label>
                <button type="submit" className="contact-submit">
                  SEND
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} Classy AI™</span>
        <span>
          <p
            style={{ fontSize: "0.85rem", opacity: 0.65, marginBottom: "2rem" }}
          >
            Incubated at Harvard Innovation Labs
          </p>
        </span>
      </footer>

      {/* INTERCOM-LIKE CHAT BUBBLE */}
      <div className="chat-widget">
        {isChatOpen && (
          <div className="chat-panel">
            <div className="chat-header">
              <button
                className="chat-header-icon chat-header-back"
                type="button"
                aria-label="Close chat"
                onClick={() => setIsChatOpen(false)}
              >
                ←
              </button>
              <span>Contact Us</span>
              <button
                className="chat-header-icon chat-header-collapse"
                type="button"
                aria-label="Collapse chat"
                onClick={() => setIsChatOpen(false)}
              >
                ˅
              </button>
            </div>

            <div className="chat-hero">
              <div className="chat-avatar">
                <IoPersonCircleSharp size={60} />
              </div>
              <p className="chat-status">
                "We usually reply in a few minutes at this time of day."
              </p>
            </div>

            <div className="chat-body">
              <div className="chat-message-card">
                <p className="chat-message-text">
                  Let me know if you have any questions!
                </p>
                <button
                  type="button"
                  className="chat-quick-button"
                  onClick={() => {
                    const el = document.querySelector(
                      "input[name='chatMessage']"
                    ) as HTMLInputElement | null;
                    if (el) {
                      el.focus();
                    }
                  }}
                >
                  I have a question
                </button>

                <div className="chat-meta">Classy AI</div>
              </div>
            </div>

            <form
              className="chat-input-bar"
              onSubmit={handleChatSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                padding: "12px",
                background: "transparent",
              }}
            >
              {/* Message box */}
              <input
                name="chatMessage"
                type="text"
                className="chat-input-field chat-box"
                placeholder="Enter your question here"
                required
              />

              {/* Email box */}
              <input
                name="chatEmail"
                type="email"
                className="chat-input-field chat-box"
                placeholder="Your email so we can get back to you"
                required
              />

              {/* Buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: "4px",
                }}
              >
                <button
                  type="button"
                  className="chat-icon-button"
                  aria-label="Attach file"
                >
                  📎
                </button>
                <button
                  type="submit"
                  className="chat-send-button"
                  aria-label="Send"
                >
                  ➤
                </button>
              </div>
            </form>
          </div>
        )}

        <button
          className="chat-toggle"
          onClick={() => setIsChatOpen((o) => !o)}
          aria-label="Open chat"
        >
          <LuMessageSquare size={26} />
        </button>
      </div>

      {/* 🔔 Toast renderer */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.message}</div>
      )}
    </div>
  );
};

export default App;
