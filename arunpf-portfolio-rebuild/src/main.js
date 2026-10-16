import { createClient } from '@supabase/supabase-js';
import './style.css';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabaseReady = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && !SUPABASE_URL.includes('YOUR-PROJECT'));
const supabase = supabaseReady ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY) : null;

// Replace these examples with Arun's real work. Use images you own or have permission to display.
const projects = [
  {
    number: '01',
    type: 'ARCHITECTURAL VISUALIZATION',
    title: 'Contemporary Residence',
    description: 'Replace this description with the real brief, design decisions, and tools used.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85',
    tools: 'AutoCAD · SketchUp · Lumion'
  },
  {
    number: '02',
    type: 'CAD / TECHNICAL DRAWING',
    title: 'Residential Floor Plan',
    description: 'Add details about the actual drawing set, dimensions, and drafting standards.',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
    tools: 'AutoCAD · Drafting'
  },
  {
    number: '03',
    type: '3D MODELING',
    title: 'Interior Concept',
    description: 'Describe the real model, materials, lighting setup, and rendering workflow.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    tools: 'Blender · 3D Visualization'
  }
];

const projectCards = projects.map((p) => `
  <article class="project-card">
    <div class="project-image"><img src="${p.image}" alt="${escapeHTML(p.title)}" loading="lazy" /></div>
    <div class="project-meta"><span>${p.number}</span><span>${escapeHTML(p.type)}</span></div>
    <h3>${escapeHTML(p.title)}</h3>
    <p>${escapeHTML(p.description)}</p>
    <div class="project-tools">${escapeHTML(p.tools)}</div>
  </article>
`).join('');

document.querySelector('#app').innerHTML = `
  <header class="site-header">
    <a class="brand" href="#home" aria-label="Arun home"><span class="brand-mark">A.</span><span>ARUN<span class="brand-light"> / DESIGN</span></span></a>
    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false">☰</button>
    <nav class="nav-links" aria-label="Main navigation">
      <a href="#about">About</a><a href="#expertise">Expertise</a><a href="#work">Selected work</a><a class="nav-contact" href="#contact">Let's talk <span>↗</span></a>
    </nav>
  </header>

  <main>
    <section id="home" class="hero section-wrap">
      <div class="hero-copy">
        <p class="eyebrow"><span class="status-dot"></span> CAD · ARCHITECTURE · 3D VISUALIZATION</p>
        <h1>Ideas shaped<br/>into <em>spaces.</em></h1>
        <p class="hero-intro">I’m Arun, a design-focused creator exploring architecture, technical drafting, and 3D visualization. Replace this intro with your own experience and services.</p>
        <div class="hero-actions"><a class="button button-gold" href="#work">Explore selected work <span>↘</span></a><a class="text-link" href="#contact">Start a project <span>↗</span></a></div>
        <div class="hero-footnote"><span>BASED IN INDIA</span><span>AVAILABLE FOR SELECT PROJECTS</span></div>
      </div>
      <div class="hero-visual">
        <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=90" alt="Modern architectural interior visualization" />
        <div class="image-caption"><span>FORM / LIGHT / MATERIAL</span><span>01 — 03</span></div>
        <div class="hero-stamp"><span>DESIGN</span><strong>WITH<br/>INTENT.</strong></div>
      </div>
    </section>

    <section id="about" class="about section-wrap section-pad">
      <div class="section-kicker"><span>01 / ABOUT</span><span>THE DESIGN APPROACH</span></div>
      <div class="about-grid">
        <h2>Thoughtful design.<br/><em>Clear execution.</em></h2>
        <div><p class="large-copy">I turn ideas into clear drawings and compelling visual stories — from technical CAD work to architectural concepts and 3D scenes.</p><p class="muted-copy">Update this section with Arun’s real background, education, process, and strengths. Keep every claim accurate and make sure the portfolio showcases genuine work.</p></div>
      </div>
    </section>

    <section id="expertise" class="expertise section-wrap section-pad">
      <div class="section-kicker"><span>02 / EXPERTISE</span><span>TOOLS & SERVICES</span></div>
      <div class="expertise-grid">
        <article><span class="service-number">01</span><h3>CAD Drafting</h3><p>Technical drawings, floor plans, elevations, dimensions, and drawing cleanup.</p><span class="service-line">AUTOCAD / TECHNICAL DOCUMENTATION</span></article>
        <article><span class="service-number">02</span><h3>Architecture</h3><p>Concept development, spatial planning, presentation layouts, and design studies.</p><span class="service-line">PLANNING / PRESENTATION</span></article>
        <article><span class="service-number">03</span><h3>3D Visualization</h3><p>3D modeling, materials, lighting, composition, and presentation renders.</p><span class="service-line">MODELING / RENDERING</span></article>
      </div>
    </section>

    <section id="work" class="work section-wrap section-pad">
      <div class="section-kicker"><span>03 / SELECTED WORK</span><span>PROJECTS & STUDIES</span></div>
      <div class="work-heading"><h2>Selected <em>projects.</em></h2><p>Replace sample content with your real CAD drawings, models, and renders.</p></div>
      <div class="project-grid">${projectCards}</div>
    </section>

    <section id="contact" class="contact section-wrap section-pad">
      <div class="section-kicker"><span>04 / CONTACT</span><span>HAVE A PROJECT IN MIND?</span></div>
      <div class="contact-grid">
        <div><h2>Let’s make<br/>something <em>meaningful.</em></h2><p class="muted-copy">Share a little about your project and I’ll get back to you.</p><p class="contact-note">Please replace the sample details with Arun’s real contact information before publishing.</p></div>
        <form id="contact-form" class="contact-form">
          <label for="name">Your name</label><input id="name" name="name" autocomplete="name" required maxlength="100" placeholder="Name" />
          <label for="email">Email address</label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254" placeholder="you@example.com" />
          <label for="project-type">What do you need?</label><select id="project-type" name="project_type"><option>CAD drafting</option><option>Architecture</option><option>3D modeling / rendering</option><option>Other</option></select>
          <label for="message">Project details</label><textarea id="message" name="message" rows="4" required minlength="10" maxlength="5000" placeholder="Tell me about your project..."></textarea>
          <div class="honeypot" aria-hidden="true"><label for="company">Leave this field empty</label><input id="company" name="company" tabindex="-1" autocomplete="off" /></div>
          <button class="button button-gold submit-button" type="submit">Send project enquiry <span>↗</span></button>
          <p id="form-status" class="form-status" role="status" aria-live="polite"></p>
        </form>
      </div>
    </section>
  </main>
  <footer class="site-footer"><a class="brand" href="#home"><span class="brand-mark">A.</span><span>ARUN<span class="brand-light"> / DESIGN</span></span></a><span>CAD · ARCHITECTURE · 3D</span><a href="#home">BACK TO TOP ↑</a><span>© <span id="year"></span> ARUN</span></footer>

  <dialog id="admin-dialog" class="admin-dialog">
    <form method="dialog" class="dialog-top"><h2>Portfolio inbox</h2><button class="icon-button" aria-label="Close">×</button></form>
    <div id="admin-content"><p class="muted-copy">Admin access is available at the private URL hash #admin. Do not share that URL publicly.</p>
      <form id="admin-login-form" class="admin-login"><label for="admin-email">Admin email</label><input id="admin-email" type="email" required autocomplete="username" /><label for="admin-password">Password</label><input id="admin-password" type="password" required autocomplete="current-password" /><button class="button button-gold" type="submit">Sign in</button><p id="admin-status" class="form-status" role="status"></p></form>
    </div>
  </dialog>
`;

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

document.querySelector('#year').textContent = new Date().getFullYear();
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.textContent = open ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => {
  navLinks.classList.remove('is-open'); menuToggle.setAttribute('aria-expanded', 'false'); menuToggle.textContent = '☰';
}));

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  if (data.company) { formStatus.textContent = 'Thanks. Your message has been submitted.'; form.reset(); return; }
  if (!supabase) {
    formStatus.textContent = 'Contact form is not configured yet. Please try again later.';
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true; button.textContent = 'Sending…'; formStatus.textContent = '';
  try {
    const { data: result, error } = await supabase.functions.invoke('contact-notification', { body: {
      name: data.name, email: data.email, project_type: data.project_type, message: data.message
    }});
    if (error) throw error;
    if (!result?.ok) throw new Error(result?.error || 'Message could not be sent.');
    formStatus.textContent = result.emailSent
      ? 'Thank you — your enquiry has been sent.'
      : 'Your enquiry was saved, but email notification failed. Please try again later.';
    if (result.ok) form.reset();
  } catch (err) {
    console.error('Contact submission failed:', err);
    formStatus.textContent = 'Sorry, your message could not be sent. Please try again later.';
  } finally {
    button.disabled = false; button.innerHTML = 'Send project enquiry <span>↗</span>';
  }
});

// Private admin panel: authentication is enforced by Supabase; database policies still matter.
const adminDialog = document.querySelector('#admin-dialog');
const adminContent = document.querySelector('#admin-content');
if (location.hash === '#admin') adminDialog.showModal();
window.addEventListener('hashchange', () => { if (location.hash === '#admin' && !adminDialog.open) adminDialog.showModal(); });
document.querySelector('#admin-login-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const status = document.querySelector('#admin-status');
  if (!supabase) { status.textContent = 'Supabase is not configured.'; return; }
  const email = document.querySelector('#admin-email').value.trim();
  const password = document.querySelector('#admin-password').value;
  status.textContent = 'Signing in…';
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) { status.textContent = 'Sign-in failed. Check your credentials and Supabase Auth settings.'; return; }
  await renderInbox();
});
async function renderInbox() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  const { data: messages, error } = await supabase.from('contact_messages')
    .select('id, name, email, project_type, message, created_at')
    .order('created_at', { ascending: false }).limit(100);
  if (error) {
    adminContent.innerHTML = `<p class="form-status">Could not load messages. Check the table's RLS policies and admin account.</p><button id="signout" class="button button-outline">Sign out</button>`;
    document.querySelector('#signout').addEventListener('click', async () => { await supabase.auth.signOut(); location.reload(); });
    return;
  }
  adminContent.innerHTML = `<div class="inbox-toolbar"><p>${messages.length} recent message(s)</p><button id="signout" class="button button-outline">Sign out</button></div>` +
    (messages.length ? messages.map((m) => `<article class="inbox-message"><div class="inbox-meta"><strong>${escapeHTML(m.name)}</strong><span>${escapeHTML(new Date(m.created_at).toLocaleString())}</span></div><a href="mailto:${encodeURIComponent(m.email)}">${escapeHTML(m.email)}</a><p class="project-tools">${escapeHTML(m.project_type || 'General enquiry')}</p><p>${escapeHTML(m.message)}</p></article>`).join('') : '<p class="muted-copy">No messages yet.</p>');
  document.querySelector('#signout').addEventListener('click', async () => { await supabase.auth.signOut(); location.reload(); });
}
