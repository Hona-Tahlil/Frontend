import { getData, putData } from "./services";
import type { Sitter, SitterStatus } from "@/data/sitterConstants";

// ✅ بک‌اند عدد می‌دهد، فرانت رشته می‌خواهد:
export type BackendStatus = 1 | 2 | 3;

export type BackendSitter = {
  id: number;               // یا petSitterUserID / userId (طبق بک‌اند)
  name: string;
  email: string;
  status: BackendStatus;
};

// تبدیل عدد به رشته برای UI
export const mapStatusFromBackend = (s: BackendStatus): SitterStatus => {
  if (s === 1) return "pending";
  if (s === 2) return "accepted";
  return "rejected";
};

// تبدیل رشته UI به عدد برای API change-status
export const mapStatusToBackend = (s: SitterStatus): BackendStatus => {
  if (s === "pending") return 1;
  if (s === "accepted") return 2;
  return 3;
};

// ✅ 1) گرفتن لیست پت‌سیترها
export const getSittersService = async (): Promise<Sitter[]> => {
  // ⛔️ این endpoint را دقیقاً مطابق بک‌اند خودت بگذار
  // مثال:
  const res = await getData({ endPoint: `/v1/petsitters` });

  // فرض: res یک آرایه BackendSitter است
  const list = (res as BackendSitter[]).map((x) => ({
    id: x.id,
    name: x.name,
    email: x.email,
    status: mapStatusFromBackend(x.status),
  }));

  return list;
};

// ✅ 2) تغییر وضعیت پت‌سیتر
export const changeSitterStatusService = async (args: {
  petSitterUserID: number;
  status: BackendStatus;
}) => {
  return putData({
    endPoint: `/v1/petsitters/change-status`,
    data: args,
  });
};
