// src/data/sitterConstants.ts

export type SitterStatus = "pending" | "accepted" | "rejected";

// Extend the Sitter type to include properties like gender, birthDate, etc.
export type Sitter = {
  id: number;
  name: string;
  email: string;
  status: SitterStatus;
  requestedAt: string;
  gender: string;
  birthDate: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  services: string;
  bio: string;
};

export const initialSitters: Sitter[] = [
  { 
    id: 1, 
    name: "علی رضایی", 
    email: "ali@gmail.com", 
    status: "pending", 
    requestedAt: "1403/10/01 - 12:30", 
    gender: "مرد", 
    birthDate: "2000/5/15", 
    phone: "09123456789", 
    province: "تهران", 
    city: "تهران", 
    address: "خیابان ولیعصر", 
    services: "سگ‌ها، گربه‌ها — نگهداری، پیاده‌روی", 
    bio: "پت‌سیتر با تجربه"
  },
  { 
    id: 2, 
    name: "نگار احمدی", 
    email: "negar@gmail.com", 
    status: "accepted", 
    requestedAt: "1403/10/02 - 09:15", 
    gender: "زن", 
    birthDate: "1995/7/25", 
    phone: "09123456780", 
    province: "تهران", 
    city: "تهران", 
    address: "خیابان انقلاب", 
    services: "سگ‌ها، گربه‌ها — نگهداری، پیاده‌روی", 
    bio: "پت‌سیتر با تجربه"
  },
  { 
    id: 3, 
    name: "مریم کاظمی", 
    email: "maryam@gmail.com", 
    status: "rejected", 
    requestedAt: "1403/10/03 - 18:45", 
    gender: "زن", 
    birthDate: "1992/11/30", 
    phone: "09123456781", 
    province: "تهران", 
    city: "تهران", 
    address: "خیابان ولیعصر", 
    services: "سگ‌ها، گربه‌ها — نگهداری، پیاده‌روی", 
    bio: "پت‌سیتر با تجربه"
  },
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
