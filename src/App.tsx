// src/App.tsx
import React, { useState } from "react";
import heroImage from "./assets/classyai-lg.jpg";
import { LuMessageSquare } from "react-icons/lu";
import { IoPersonCircleSharp } from "react-icons/io5";

const CONTACT_EMAIL = "cjtakhar@gmail.com";

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const sendEmail = (subject: string, body: string) => {
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get("name") as string) || "";
    const email = (data.get("email") as string) || "";
    const message = (data.get("message") as string) || "";

    const subject = `New message from Classy AI contact form`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    sendEmail(subject, body);
    form.reset();
  };

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const email = (data.get("chatEmail") as string) || "";
    const message = (data.get("chatMessage") as string) || "";

    const subject = `New message from Classy AI chat bubble`;
    const body = `From chat widget\nEmail: ${email}\n\nMessage:\n${message}`;

    sendEmail(subject, body);
    form.reset();
    setIsChatOpen(false);
  };

  return (
    <div className="page">
      {/* NAV */}
      <header className="nav">
        <div className="nav-logo">Classy AI</div>
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
            <h1>Elevate Your Intelligence</h1>
            <h3>Socrates v1.0</h3>
            <p>Ethical AI that teaches you how to think. Not what to think.</p>
            <div className="hero-actions">
              <button
                className="btn-primary"
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Join the Waitlist
              </button>
              {/* <button className="btn-secondary">View Demo</button> */}
            </div>
          </div>
        </section>

        
        <section id="features" className="section">
          <h2 className="section-title">
            <a
              href="https://innovationlabs.harvard.edu/"
              target="_blank"
              rel="noopener noreferrer"
              className="unstyled-link"
              style={{
                color: "inherit",
                textDecoration: "none",
              }}  
            >
              Built at Harvard Innovation Labs
            </a>
          </h2>
          <div className="feature-grid">
            <div className="feature-card">
              
              <h3>Socratic Tutoring</h3>
              <p>
                Guided questions that help you understand complex concepts
                instead of just answering for you.
              </p>
            </div>
            <div className="feature-card">
              <h3>Ethical by Design</h3>
              <p>
                Built to increase critical thinking and amplify your ability to
                learn not replace it.
              </p>
            </div>
            <div className="feature-card">
              <h3>Machine Learning </h3>
              <p>
                Powered by a custom Llama-3.2-3B model trained in house using
                Tinker by Thinking Machines Lab.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT – “halfway down” */}
        <section id="contact" className="contact-section">
          <div className="contact-inner">
            <h2>Get on the list</h2>
            <p className="contact-subtitle">Supercharge your learning.</p>

            <form className="contact-form" onSubmit={handleContactSubmit}>
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
                  <span>Sign up for our email list for updates and more.</span>
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
        <span>© {new Date().getFullYear()} Classy AI</span>
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
                      el.value = "I have a question about…";
                      el.focus();
                    }
                  }}
                >
                  I have a question
                </button>
                <div className="chat-meta">Classy AI · 1:05 PM</div>
              </div>
            </div>

            <form className="chat-input-bar" onSubmit={handleChatSubmit}>
              <input
                name="chatMessage"
                type="text"
                className="chat-input-field"
                placeholder="Enter your question or message here"
                required
              />
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
                aria-label="Send message"
              >
                ➤
              </button>
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
    </div>
  );
};

export default App;
