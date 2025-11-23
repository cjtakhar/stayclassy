// src/App.tsx
import React, { useState } from "react";
import heroImage from "./assets/classyai-lg.jpg";

const CONTACT_EMAIL = "you@example.com"; // 👈 change this

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
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
          <a href="#contact">Contact</a>
        </nav>
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
            <p>
              Ethical AI that teaches you how to think, not what to think. Learn
              computer science the Classy way.
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
                Join the Waitlist
              </button>
              <button className="btn-secondary">View Demo</button>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" className="section">
          <h2>Why Classy AI</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <h3>Socratic Tutoring</h3>
              <p>
                Guided questions that help you actually understand algorithms
                and data structures.
              </p>
            </div>
            <div className="feature-card">
              <h3>Ethical by Design</h3>
              <p>
                Built to avoid cheating and instead amplify your ability to
                learn.
              </p>
            </div>
            <div className="feature-card">
              <h3>Developer Friendly</h3>
              <p>
                Integrate with your existing study workflows, notes, and problem
                sets.
              </p>
            </div>
          </div>
        </section>

        {/* CONTACT – “halfway down” */}
        <section id="contact" className="contact-section">
          <div className="contact-inner">
            <h2>Contact Us</h2>
            <p className="contact-subtitle">Drop us a line!</p>

            <form className="contact-form" onSubmit={handleContactSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="contact-input"
              />
              <input
                name="email"
                type="email"
                placeholder="Email*"
                required
                className="contact-input"
              />
              <textarea
                name="message"
                placeholder="Message"
                rows={6}
                className="contact-textarea"
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
              <span>Chat with Classy AI</span>
              <button
                className="chat-close"
                onClick={() => setIsChatOpen(false)}
              >
                ×
              </button>
            </div>
            <form className="chat-form" onSubmit={handleChatSubmit}>
              <input
                name="chatEmail"
                type="email"
                placeholder="Your email (optional)"
                className="chat-input"
              />
              <textarea
                name="chatMessage"
                placeholder="Type your message..."
                rows={3}
                className="chat-textarea"
                required
              />
              <button type="submit" className="chat-submit">
                Send
              </button>
            </form>
          </div>
        )}

        <button
          className="chat-toggle"
          onClick={() => setIsChatOpen((o) => !o)}
          aria-label="Open chat"
        >
          💬
        </button>
      </div>
    </div>
  );
};

export default App;
