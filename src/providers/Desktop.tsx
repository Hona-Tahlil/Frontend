import { type ReactNode } from "react";

export default function Desktop({ children }: { children: ReactNode }) {
  const width = window.innerWidth;
  return width >= 1024 ? <>{children}</> : null;
}
