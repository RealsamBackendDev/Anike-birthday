# ANIKE — A Birthday Experience ❤️

A personal, romantic, single-page birthday website built with plain HTML, CSS, and JavaScript — no frameworks, no backend, no build step. Made by a boyfriend for his girlfriend, ANIKE.

## What's inside

Six connected experiences in one page:

1. **Welcome** — an intimate opening screen.
2. **Birthday Celebration** — with a tasteful, finite confetti burst.
3. **Our Story & Memories** — a four-card relationship timeline + a six-photo gallery with lightbox.
4. **The Couple's Quiz** — five playful multiple-choice questions with scoring, retake, and back/next controls.
5. **The Love Letter** — an animated envelope that opens to reveal the full letter.
6. **The Final Surprise** — a deep-burgundy closing with a replay button, confetti button, and "read your letter again".

Plus: progress dots, floating hearts, an optional music toggle (only if you supply an audio file), full mobile responsiveness, keyboard support, and reduced-motion support.

## Technologies

- HTML5
- CSS3 (custom properties, grid, flexbox, keyframe animations)
- Vanilla JavaScript (no libraries)

## How to run locally

1. Keep the folder structure exactly as it is:

```javascript
anike-birthday/
├── index.html
├── style.css
├── script.js
└── assets/
    ├── video/

    ├── images/
    └── audio/
```

2. Double-click `index.html` — it opens in your browser. That's it. No server, no npm, no build.

(If your browser is strict about local files, you can also run `python3 -m http.server` inside the folder and open `http://localhost:8000`.)

## How to add the six photographs

1. Take your favourite couple photos and resize/crop them (roughly 800×1000px or larger is plenty; keep each file under ~500 KB).
2. Rename them exactly:

```javascript
assets/images/memory-1.jpg
assets/images/memory-2.jpg
assets/images/memory-3.jpg
assets/images/memory-4.jpg
assets/images/memory-5.jpg
assets/images/memory-6.jpg
```

3. Refresh the page. Missing photos automatically show a graceful "Our next memory goes here. ♡" placeholder — nothing ever breaks.

## How to customise captions

Each photo's caption lives in two places in `index.html` (they're the same text):

- the `data-caption` attribute on the `<figure class="photo-card">`
- the `<figcaption>` inside it

Edit both to the same new text.

## How to edit the birthday messages, timeline, and letter

All the text is plain HTML in `index.html`:

- **Welcome / birthday / final messages**: inside sections 1, 2, and 6.
- **Timeline cards**: four `<article class="timeline-card">` blocks in section 3. Replace the general messages with your real memories (how you met, your first date, etc.).
- **Love letter**: the `<article class="letter-card">` block in section 5 — edit freely, keep the `<p>` tags.
- **Signature**: the `.letter-signature` paragraph.

## How to personalise the quiz

Open `script.js` and find the `QUIZ_QUESTIONS` array near the top. Each question looks like:

```js
{
  question: "What nickname do I call you?",
  options: ["ANIKE.", "My favourite human.", "My personal comedian.", "All of the above."],
  correct: 0, // index of the correct option (0 = first)
},
```

Edit the text, keep the same structure, and set `correct` to the position of the right answer (0-based). You can even add or remove questions — the progress bar and scoring adjust automatically.

## How to add your personal video message

1. Record a selfie video wishing her happy birthday and sharing a memory or two (30–90 seconds is perfect — keep it sincere, not rehearsed).
2. Export/compress it and save it as:

```javascript
assets/video/birthday-video.mp4
```

3. Reload the page — the video appears right after the birthday message (section 2), in a gold-framed player with standard controls.
4. If the file is missing, a graceful "Your video message goes here. 🎥♡" placeholder shows instead — nothing breaks.
5. Background music (if enabled) automatically pauses while the video plays, and the video pauses if she navigates away from the finale.

## How to add optional background music

1. Put an MP3 you have the rights to at `assets/audio/birthday-music.mp3` (e.g., a royalty-free track).
2. Reload the page — a music toggle appears in the bottom-right corner.
3. It never autoplays; ANIKE chooses to press play. If the file is missing, the button stays hidden and nothing errors.

## How to publish free with GitHub Pages

1. Create a free account at [github.com](https://github.com).
2. Click **New repository**, name it `anike-birthday`, set it to **Public**, create it.
3. Upload all project files (drag the folder contents into the "upload files" page, keeping the `assets/` structure).
4. Go to **Settings → Pages**.
5. Under **Source**, pick the `main` branch, `/ (root)` folder, and **Save**.
6. Wait 1–2 minutes, then visit `https://YOUR-USERNAME.github.io/anike-birthday/`.

Send her the link. 💌

## Accessibility & behaviour notes

- Fully keyboard navigable with visible focus states.
- Lightbox closes with the ✕ button, clicking the backdrop, or the **Escape** key.
- `prefers-reduced-motion` disables confetti, floating hearts, and animations.
- Refreshing the page always returns to the welcome screen.
- The Replay button resets the whole experience without reloading.

Made with love, a little code, and a lot of thought. ❤️