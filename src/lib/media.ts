import fs from "node:fs";
import path from "node:path";

/** Server-only: which BankSphere media files exist in /public/projects/banksphere ? */
export function banksphereMedia(files: string[]) {
  const dir = path.join(process.cwd(), "public", "projects", "banksphere");
  const out: Record<string, boolean> = {};
  for (const f of files) out[f] = fs.existsSync(path.join(dir, f));
  return out;
}
