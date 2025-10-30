export const pixelBorderStyle = `
        .pixel-border {
          position: relative;
          border: 2px solid rgba(16, 185, 129, 0.7);
          box-shadow:
            0 0 0 2px rgba(16, 185, 129, 0.15) inset,
            0 0 8px rgba(16, 185, 129, 0.35),
            0 0 24px rgba(16, 185, 129, 0.15);
          image-rendering: pixelated;
        }
        @media print {
          .pixel-border { box-shadow: none; border-color: #222; }
          a { color: #000 !important; text-decoration: none !important; }
          main { background: #fff !important; }
        }
      `;
