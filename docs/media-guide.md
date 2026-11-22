# BankSphere AI media

Drop files into `public/projects/banksphere/` with these names, add the filename as `media` on the feature in `src/data/content.ts`, then rebuild (`npm run build`) or restart `npm run dev`.
The screenshot then replaces that feature's labelled diagram. In use today: `kyc.webp`, `detective.webp`, `audit.webp`, `demo.mp4`.

| File               | Shown for                                   |
|--------------------|---------------------------------------------|
| kyc.png            | 01 KYC decisions (OCR → checks → risk score) |
| detective.png      | 02 AI Compliance Detective                   |
| challenge.png      | 03 Challenge the AI                          |
| time-machine.png   | 04 Time Machine case replay                  |
| digital-twin.png   | 05 Regulatory Digital Twin & knowledge graph |
| four-eyes.png      | 06 Financial-crime screening, four-eyes      |
| audit.png          | 07 Tamper-evident audit trail                |
| tests.png          | 08 Red-team & evaluation suites              |
| demo.mp4           | Screen recording on the case-study page      |

Tips: 1600×1200 (4:3) PNG/WebP screenshots, top of the UI visible. Keep demo.mp4 under ~15 MB (H.264, 1080p).
Use synthetic data only.
