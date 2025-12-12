const express = require('express');
const app = express();

// Penting untuk baca data POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Frame utama
app.get('/frame', (req, res) => {
  const html = `
    <html>
      <head>
        <title>Quiz Liga Inggris</title>

        <meta property="og:title" content="Quiz Liga Inggris" />
        <meta property="og:description" content="Prediksi Liverpool vs Arsenal pekan ini!" />

        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:button:1" content="Liverpool Menang" />
        <meta name="fc:frame:button:2" content="Seri" />
        <meta name="fc:frame:button:3" content="Arsenal Menang" />

        <!-- post_url pakai domain Vercel-mu -->
        <meta name="fc:frame:post_url" content="https://farcaster-quiz-frame-self.vercel.app/api/vote" />
      </head>
      <body>
        <h1>Prediksi Liverpool vs Arsenal pekan ini?</h1>
        <p>Pilih jawaban langsung dari Frame di Warpcast.</p>
      </body>
    </html>
  `;
  res.send(html);
});

// Endpoint vote
app.post('/vote', (req, res) => {
  const buttonIndex =
    req.body?.untrustedData?.buttonIndex ||
    req.body?.buttonIndex ||
    'unknown';

  let pilihan = 'Tidak diketahui';
  if (buttonIndex === 1 || buttonIndex === '1') pilihan = 'Liverpool Menang';
  if (buttonIndex === 2 || buttonIndex === '2') pilihan = 'Seri';
  if (buttonIndex === 3 || buttonIndex === '3') pilihan = 'Arsenal Menang';

  const html = `
    <html>
      <head>
        <title>Hasil Vote</title>

        <meta property="og:title" content="Hasil Vote Quiz Liga Inggris" />
        <meta property="og:description" content="Pilihanmu: ${pilihan}" />

        <meta name="fc:frame" content="vNext" />
        <meta name="fc:frame:button:1" content="Vote Lagi" />
        <meta name="fc:frame:post_url" content="https://farcaster-quiz-frame-self.vercel.app/api/frame" />
      </head>
      <body>
        <h1>Hasil Vote</h1>
        <p>Pilihanmu: ${pilihan}</p>
      </body>
    </html>
  `;
  res.send(html);
});

// Export untuk Vercel
module.exports = app;
