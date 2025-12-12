const express = require('express');
const app = express();
const port = 3000;

// Penting untuk bisa baca data dari POST
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Frame utama (pertanyaan quiz)
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

        <!-- SEMENTARA: post_url lokal (nanti diganti Vercel) -->
        <meta name="fc:frame:post_url" content="http://127.0.0.1:3000/api/vote" />
      </head>
      <body>
        <h1>Prediksi Liverpool vs Arsenal pekan ini?</h1>
        <p>Pilih jawaban langsung dari Frame di Warpcast.</p>
      </body>
    </html>
  `;
  res.send(html);
});

// Endpoint untuk menerima vote (simulasi)
app.post('/api/vote', (req, res) => {
  // Di Frames, tombol yang diklik biasanya dikirim sebagai "untrustedData.buttonIndex"
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
        <meta name="fc:frame:post_url" content="http://127.0.0.1:3000/frame" />
      </head>
      <body>
        <h1>Hasil Vote</h1>
        <p>Pilihanmu: ${pilihan}</p>
        <p>(Ini baru simulasi lokal, nanti di Warpcast tombol akan mengirim data sebenarnya.)</p>
      </body>
    </html>
  `;
  res.send(html);
});

// Jalankan server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
