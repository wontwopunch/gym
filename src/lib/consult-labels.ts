export const CONSULT_LABELS: Record<string, string> = {
  health: "헬스 회원권 상담",
  pt: "PT(personal training) 상담",
  day: "헬스 일일권",
};

export function getConsultLabel(consultType: string): string | undefined {
  return CONSULT_LABELS[consultType];
}
