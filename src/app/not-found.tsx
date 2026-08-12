import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container section">
      <h1>Page introuvable</h1>
      <p style={{ marginTop: "var(--space-m)" }}>
        Cette page n&apos;existe pas ou a été déplacée.
      </p>
      <p style={{ marginTop: "var(--space-m)" }}>
        <Link href="/">Retour à l&apos;accueil</Link>
      </p>
    </section>
  );
}
