import { ReactNode } from "react";

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  try {
    return <> {children} </>;
  } catch (err) {
    if (process.env.NEXT_ENV === "development") {
      return <code> {JSON.stringify(err, null, 5)} </code>;
    }
    return null;
  }
}
