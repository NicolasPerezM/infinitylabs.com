type ClassValue = string | number | bigint | boolean | null | undefined | ClassValue[];

/** Minimal class-name joiner (no dependency). */
export function cn(...values: ClassValue[]): string {
  const out: string[] = [];
  const push = (v: ClassValue) => {
    if (v === null || v === undefined || v === false || v === true || v === "") return;
    if (Array.isArray(v)) v.forEach(push);
    else out.push(String(v));
  };
  values.forEach(push);
  return out.join(" ");
}

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}
