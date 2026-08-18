import DynamicViewer from "./components/dynamic-viewer";

interface PageProps {
  searchParams: Promise<{
    url?: string;
  }>;
}

export default async function Page({
  searchParams,
}: PageProps) {
  const params = await searchParams;

  const targetUrl = params.url;

  if (!targetUrl) {
    return (
      <main className="flex min-h-dvh items-center justify-center p-6">
        <section className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center shadow-2xl">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-2xl text-black">
            ↗
          </div>

          <h1 className="mt-6 text-2xl font-semibold">
            Dynamic Viewer
          </h1>

          <p className="mt-3 text-sm leading-6 text-white/50">
            No se proporcionó ninguna URL para mostrar.
          </p>
        </section>
      </main>
    );
  }

  return (
    <DynamicViewer targetUrl={targetUrl} />
  );
}