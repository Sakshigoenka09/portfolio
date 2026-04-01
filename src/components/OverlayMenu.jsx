import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './OverlayMenu.css';

export const OverlayMenu = ({ view, setView }) => {
  return (
    <div className="overlay-container">
      {/* Top Navigation Bar */}
      <header className="top-nav">
        <div className="logo" onClick={() => setView('home')}>
          Sakshi<span>.3D</span>
        </div>
        <nav className="nav-links">
          <button 
            className={view === 'about' ? 'active' : ''} 
            onClick={() => setView('about')}
          >
            About Me
          </button>
          <button 
            className={view === 'projects' ? 'active' : ''} 
            onClick={() => setView('projects')}
          >
            Projects
          </button>
          <button 
            className={view === 'contact' ? 'active' : ''} 
            onClick={() => setView('contact')}
          >
            Contact
          </button>
        </nav>
      </header>

      {/* Dynamic Content Overlay based on the current View */}
      <AnimatePresence mode="wait">
        {view !== 'home' && (
          <motion.div 
            key={view}
            className="content-overlay"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }} // delay allows the 3D camera to move first
          >
            <button className="close-btn" onClick={() => setView('home')}>
              &times; Back to Room
            </button>
            
            <div className="overlay-card">
              {view === 'about' && (
                <div>
                  <h2>About Me</h2>
                  <p>I am a passionate MERN stack developer stepping into the world of 3D web experiences.</p>
                  <p>I love building interactive applications and creating visual magic in the browser!</p>
                </div>
              )}
              {view === 'projects' && (
                <div>
                  <h2>My Work</h2>
                  <div className="project-grid">
                    <div className="project-item">Project 1</div>
                    <div className="project-item">Project 2</div>
                    <div className="project-item">Project 3</div>
                  </div>
                </div>
              )}
              {view === 'contact' && (
                <div>
                  <h2>Let's Connect</h2>
                  <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <textarea placeholder="Message" rows="4"></textarea>
                    <button type="submit">SEND</button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions when in Home View */}
      {view === 'home' && (
        <div className="instructions">
          Drag to explore • Click objects or menu to navigate
        </div>
      )}
    </div>
  );
};
