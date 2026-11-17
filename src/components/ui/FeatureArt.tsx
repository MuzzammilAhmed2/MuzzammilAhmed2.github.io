import type { Feature } from "@/data/content";

/**
 * Lightweight SVG illustrations for BankSphere features.
 * These are diagrams of the concept, not product screenshots — replaced automatically
 * when a real screenshot exists in /public/projects/banksphere/.
 */
const A = "var(--accent)";
const B = "var(--accent-2)";
const L = "var(--line)";
const M = "var(--muted)";
const T = "var(--text)";
const S = "var(--surface-2)";

function Box({ x, y, w, h, label, hi }: { x: number; y: number; w: number; h: number; label: string; hi?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={S} stroke={hi ? A : L} />
      <text x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle" fontSize="11" fill={hi ? A : T} fontFamily="var(--font-jetbrains)">
        {label}
      </text>
    </g>
  );
}

function Flow({ d, color = A }: { d: string; color?: string }) {
  return <path d={d} fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="4 8" className="flow-dash" />;
}

export default function FeatureArt({ art }: { art: Feature["art"] }) {
  switch (art) {
    case "decision":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Diagram: ID OCR, card checks and watchlist screening feed a risk score that routes to approve, officer review or resubmit">
          <Box x={16} y={40} w={104} h={40} label="ID-card OCR" />
          <Box x={16} y={130} w={104} h={40} label="Card checks" />
          <Box x={16} y={220} w={104} h={40} label="Watchlist" />
          <Flow d="M120 60 C150 60 150 150 170 150" />
          <Flow d="M120 150 L170 150" />
          <Flow d="M120 240 C150 240 150 150 170 150" />
          <circle cx={210} cy={150} r={38} fill={S} stroke={A} />
          <text x={210} y={146} textAnchor="middle" fontSize="10" fill={M} fontFamily="var(--font-jetbrains)">RISK</text>
          <text x={210} y={164} textAnchor="middle" fontSize="18" fill={A} fontFamily="var(--font-grotesk)">score</text>
          <Flow d="M248 150 C270 150 270 60 290 60" />
          <Flow d="M248 150 L290 150" color={B} />
          <Flow d="M248 150 C270 150 270 240 290 240" color={M} />
          <Box x={290} y={40} w={96} h={40} label="Approve" hi />
          <Box x={290} y={130} w={96} h={40} label="Officer review" />
          <Box x={290} y={220} w={96} h={40} label="Resubmit" />
        </svg>
      );
    case "detective":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Diagram: an officer question answered by the AI with numbered citations to evidence">
          <rect x={150} y={24} width={230} height={44} rx={14} fill={S} stroke={L} />
          <text x={166} y={51} fontSize="12" fill={T} fontFamily="var(--font-inter)">Why was this case flagged?</text>
          <rect x={20} y={88} width={290} height={110} rx={14} fill={S} stroke={A} />
          <rect x={36} y={108} width={220} height={8} rx={4} fill={M} opacity=".5" />
          <rect x={36} y={126} width={250} height={8} rx={4} fill={M} opacity=".5" />
          <rect x={36} y={144} width={180} height={8} rx={4} fill={M} opacity=".5" />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={36 + i * 52} y={166} width={44} height={20} rx={10} fill="none" stroke={A} />
              <text x={58 + i * 52} y={180} textAnchor="middle" fontSize="10" fill={A} fontFamily="var(--font-jetbrains)">[{i + 1}]</text>
            </g>
          ))}
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={30 + i * 120} y={222} width={108} height={58} rx={10} fill={S} stroke={L} />
              <text x={42 + i * 120} y={242} fontSize="10" fill={A} fontFamily="var(--font-jetbrains)">[{i + 1}] source</text>
              <rect x={42 + i * 120} y={252} width={80} height={6} rx={3} fill={M} opacity=".4" />
              <rect x={42 + i * 120} y={264} width={60} height={6} rx={3} fill={M} opacity=".4" />
            </g>
          ))}
        </svg>
      );
    case "challenge":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Diagram: officer challenges an AI conclusion and the AI defends or revises it">
          <rect x={20} y={30} width={240} height={60} rx={14} fill={S} stroke={L} />
          <text x={36} y={56} fontSize="10" fill={M} fontFamily="var(--font-jetbrains)">AI CONCLUSION</text>
          <text x={36} y={76} fontSize="13" fill={T} fontFamily="var(--font-inter)">Recommend: officer review</text>
          <rect x={140} y={115} width={240} height={60} rx={14} fill={S} stroke={B} />
          <text x={156} y={141} fontSize="10" fill={B} fontFamily="var(--font-jetbrains)">OFFICER CHALLENGE</text>
          <text x={156} y={161} fontSize="13" fill={T} fontFamily="var(--font-inter)">What evidence supports that?</text>
          <rect x={20} y={200} width={240} height={70} rx={14} fill={S} stroke={A} />
          <text x={36} y={226} fontSize="10" fill={A} fontFamily="var(--font-jetbrains)">DEFEND · OR · REVISE</text>
          <rect x={36} y={240} width={180} height={7} rx={3.5} fill={M} opacity=".5" />
          <rect x={36} y={254} width={130} height={7} rx={3.5} fill={M} opacity=".5" />
          <Flow d="M260 60 C320 60 320 100 320 115" color={B} />
          <Flow d="M140 145 C80 145 80 180 80 200" />
        </svg>
      );
    case "timemachine":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Diagram: a case timeline that can be replayed step by step">
          <line x1={30} y1={150} x2={370} y2={150} stroke={L} strokeWidth="2" />
          <line x1={30} y1={150} x2={250} y2={150} stroke={A} strokeWidth="2" />
          {["Submitted", "OCR", "Screened", "Scored", "Reviewed", "Decided"].map((s, i) => {
            const x = 30 + i * 68;
            const past = x <= 250;
            return (
              <g key={s}>
                <circle cx={x} cy={150} r={past ? 7 : 5} fill={past ? A : S} stroke={past ? A : M} />
                <text x={x} y={i % 2 ? 186 : 124} textAnchor="middle" fontSize="10" fill={past ? T : M} fontFamily="var(--font-jetbrains)">{s}</text>
              </g>
            );
          })}
          <rect x={232} y={60} width={36} height={22} rx={6} fill={A} />
          <text x={250} y={75} textAnchor="middle" fontSize="10" fill="var(--accent-ink)" fontFamily="var(--font-jetbrains)">t₅</text>
          <line x1={250} y1={82} x2={250} y2={140} stroke={A} strokeDasharray="3 4" />
          <g transform="translate(150 225)">
            <circle cx={0} cy={0} r={18} fill={S} stroke={L} />
            <path d="M6 -7 L-4 0 L6 7 Z" fill={T} />
            <circle cx={50} cy={0} r={22} fill={A} />
            <path d="M44 -9 L58 0 L44 9 Z" fill="var(--accent-ink)" />
            <circle cx={100} cy={0} r={18} fill={S} stroke={L} />
            <path d="M94 -7 L104 0 L94 7 Z" fill={T} />
          </g>
        </svg>
      );
    case "twin":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Diagram: knowledge graph linking customers, cases, rules and evidence">
          {[
            [200, 150, 200, 60], [200, 150, 90, 100], [200, 150, 310, 100], [200, 150, 100, 230], [200, 150, 300, 230],
            [90, 100, 200, 60], [310, 100, 300, 230], [100, 230, 300, 230],
          ].map(([a, b, c, d], i) => (
            <line key={i} x1={a} y1={b} x2={c} y2={d} stroke={i < 5 ? A : L} strokeOpacity={i < 5 ? 0.6 : 1} />
          ))}
          {[
            [200, 150, "Case", 30, true], [200, 60, "Rule", 24], [90, 100, "Customer", 31], [310, 100, "Regulation", 34],
            [100, 230, "Evidence", 31], [300, 230, "Officer", 28],
          ].map(([x, y, l, r, hi]) => (
            <g key={l as string}>
              <circle cx={x as number} cy={y as number} r={r as number} fill={S} stroke={hi ? A : B} />
              <text x={x as number} y={(y as number) + 3} textAnchor="middle" fontSize="9" fill={hi ? A : T} fontFamily="var(--font-jetbrains)">{l as string}</text>
            </g>
          ))}
        </svg>
      );
    case "fourEyes":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Diagram: a screening decision needs two independent approvals before it takes effect">
          <Box x={20} y={128} w={110} h={44} label="Screening hit" />
          <Flow d="M130 150 C160 150 160 80 190 80" />
          <Flow d="M130 150 C160 150 160 220 190 220" />
          <rect x={190} y={56} width={110} height={48} rx={10} fill={S} stroke={A} />
          <text x={245} y={77} textAnchor="middle" fontSize="10" fill={M} fontFamily="var(--font-jetbrains)">APPROVER 1</text>
          <text x={245} y={94} textAnchor="middle" fontSize="13" fill={A} fontFamily="var(--font-inter)">✓ approved</text>
          <rect x={190} y={196} width={110} height={48} rx={10} fill={S} stroke={A} />
          <text x={245} y={217} textAnchor="middle" fontSize="10" fill={M} fontFamily="var(--font-jetbrains)">APPROVER 2</text>
          <text x={245} y={234} textAnchor="middle" fontSize="13" fill={A} fontFamily="var(--font-inter)">✓ approved</text>
          <Flow d="M300 80 C330 80 330 150 340 150" />
          <Flow d="M300 220 C330 220 330 150 340 150" />
          <circle cx={360} cy={150} r={22} fill={A} />
          <text x={360} y={155} textAnchor="middle" fontSize="14" fill="var(--accent-ink)" fontFamily="var(--font-grotesk)">✓</text>
        </svg>
      );
    case "audit":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Diagram: hash-chained audit records with write-once checkpoints">
          {[0, 1, 2, 3].map((i) => {
            const x = 16 + i * 96;
            return (
              <g key={i}>
                <rect x={x} y={90} width={80} height={110} rx={10} fill={S} stroke={i === 3 ? A : L} />
                <text x={x + 10} y={112} fontSize="9" fill={M} fontFamily="var(--font-jetbrains)">BLOCK {i + 1}</text>
                <rect x={x + 10} y={122} width={60} height={6} rx={3} fill={M} opacity=".4" />
                <rect x={x + 10} y={134} width={44} height={6} rx={3} fill={M} opacity=".4" />
                <text x={x + 10} y={164} fontSize="9" fill={A} fontFamily="var(--font-jetbrains)">prev#</text>
                <text x={x + 10} y={186} fontSize="9" fill={T} fontFamily="var(--font-jetbrains)">{["9f2a…", "c41e…", "07bd…", "e8a3…"][i]}</text>
                {i < 3 && <path d={`M${x + 80} 145 L${x + 96} 145`} stroke={A} strokeWidth="2" />}
              </g>
            );
          })}
          <rect x={112} y={226} width={176} height={36} rx={18} fill="none" stroke={A} strokeDasharray="4 4" />
          <text x={200} y={249} textAnchor="middle" fontSize="10" fill={A} fontFamily="var(--font-jetbrains)">WRITE-ONCE CHECKPOINT</text>
          <text x={200} y={60} textAnchor="middle" fontSize="11" fill={M} fontFamily="var(--font-jetbrains)">edit any block → chain breaks</text>
        </svg>
      );
    case "redteam":
      return (
        <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label="Diagram: red-team, evaluation and automated test suites">
          {[
            ["Automated tests", 1],
            ["Evaluation suite", 1],
            ["Red-team suite", 1],
          ].map(([l, w], i) => (
            <g key={l as string}>
              <text x={24} y={70 + i * 62} fontSize="11" fill={T} fontFamily="var(--font-jetbrains)">{l as string}</text>
              <rect x={24} y={80 + i * 62} width={352} height={14} rx={7} fill={S} stroke={L} />
              <rect x={24} y={80 + i * 62} width={352 * (w as number)} height={14} rx={7} fill={i === 2 ? B : A} opacity=".25" />
            </g>
          ))}
          <text x={24} y={268} fontSize="34" fill={A} fontFamily="var(--font-grotesk)">1000+</text>
          <text x={140} y={266} fontSize="11" fill={M} fontFamily="var(--font-jetbrains)">automated tests</text>
        </svg>
      );
  }
}
