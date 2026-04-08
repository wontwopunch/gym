import { randomUUID } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

export type ConsultationRecord = {
  id: string;
  name: string;
  phone: string;
  consultType: string;
  consultLabel: string;
  createdAt: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "consultations.json");

async function ensureFile(): Promise<ConsultationRecord[]> {
  try {
    await mkdir(DATA_DIR, { recursive: true });
    const raw = await readFile(DATA_FILE, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (x): x is ConsultationRecord =>
        typeof x === "object" &&
        x !== null &&
        typeof (x as ConsultationRecord).id === "string",
    );
  } catch {
    return [];
  }
}

async function saveAll(rows: ConsultationRecord[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(rows, null, 2), "utf-8");
}

export async function addConsultation(input: {
  name: string;
  phone: string;
  consultType: string;
  consultLabel: string;
}): Promise<ConsultationRecord> {
  const rows = await ensureFile();
  const record: ConsultationRecord = {
    id: randomUUID(),
    name: input.name,
    phone: input.phone,
    consultType: input.consultType,
    consultLabel: input.consultLabel,
    createdAt: new Date().toISOString(),
  };
  rows.unshift(record);
  await saveAll(rows);
  return record;
}

export async function listConsultations(
  page: number,
  pageSize: number,
): Promise<{ items: ConsultationRecord[]; total: number }> {
  const rows = await ensureFile();
  const total = rows.length;
  const start = (page - 1) * pageSize;
  const items = rows.slice(start, start + pageSize);
  return { items, total };
}

export async function deleteConsultation(id: string): Promise<boolean> {
  const rows = await ensureFile();
  const next = rows.filter((r) => r.id !== id);
  if (next.length === rows.length) return false;
  await saveAll(next);
  return true;
}
