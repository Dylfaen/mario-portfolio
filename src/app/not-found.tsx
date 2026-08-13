import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container section">
      <h1>Page not found</h1>
      <p style={{ marginTop: "var(--space-m)" }}>
        This page does not exist, or has moved.
      </p>
      <p style={{ marginTop: "var(--space-m)" }}>
        <Link href="/">Back to the films</Link>
      </p>
    </section>
  );
}
