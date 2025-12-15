export type SitterStatus = "pending" | "accepted" | "rejected";

export type Sitter = {
  id: number;
  name: string;
  email: string;
  status: SitterStatus;
};


export const initialSitters: Sitter[] = [
  { id: 1, name: "علی رضایی", email: "ali@gmail.com", status: "pending" },
  { id: 2, name: "نگار احمدی", email: "negar@gmail.com", status: "accepted" },
  { id: 3, name: "مریم کاظمی", email: "maryam@gmail.com", status: "rejected" },
];

export const statusLabel: Record<SitterStatus, string> = {
  pending: "در حال انتظار",
  accepted: "قبول شده",
  rejected: "رد شده",
};

export const statusColor: Record<SitterStatus, string> = {
  pending: "text-yellow-600 bg-yellow-100",
  accepted: "text-green-600 bg-green-100",
  rejected: "text-red-600 bg-red-100",
};
