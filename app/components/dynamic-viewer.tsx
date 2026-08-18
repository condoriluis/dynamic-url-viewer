"use client";

import { useEffect, useState } from "react";

type ResourceType =
  | "pdf"
  | "image"
  | "video"
  | "audio"
  | "document"
  | "web"
  | "unknown";

interface ResolveResponse {
  success: boolean;
  url?: string;
  type?: ResourceType;
  contentType?: string | null;
  error?: string;
}

interface DynamicViewerProps {
  targetUrl: string;
}

export default function DynamicViewer({
  targetUrl,
}: DynamicViewerProps) {
  const [data, setData] =
    useState<ResolveResponse | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function resolve() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/resolve?url=${encodeURIComponent(
            targetUrl
          )}`
        );

        const result =
          (await response.json()) as ResolveResponse;

        if (!response.ok || !result.success) {
          throw new Error(
            result.error ??
              "No se pudo abrir el recurso"
          );
        }

        if (!cancelled) {
          setData(result);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudo cargar el contenido"
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    resolve();

    return () => {
      cancelled = true;
    };
  }, [targetUrl]);

  if (loading) {
    return (
      <main className="flex min-h-dvh items-center justify-center p-6">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="text-sm text-white/60">
            Cargando contenido...
          </p>
        </div>
      </main>
    );
  }

  if (error || !data?.url) {
    return (
      <main className="flex min-h-dvh items-center justify-center p-6">
        <section className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <div className="mb-4 text-4xl">
            ⚠️
          </div>

          <h1 className="text-lg font-semibold">
            No se pudo abrir el contenido
          </h1>

          <p className="mt-2 text-sm text-white/60">
            {error ??
              "La URL no es válida."}
          </p>
        </section>
      </main>
    );
  }

  const url = data.url;

  return (
    <main className="min-h-dvh bg-zinc-950">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/90 backdrop-blur-xl">
        <div className="mx-auto flex min-h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-black">
              ↗
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-medium">
                Dynamic Viewer
              </p>

              <p className="text-xs text-white/40">
                Contenido externo
              </p>
            </div>
          </div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-lg border border-white/10 px-3 py-2 text-xs font-medium text-white/80 transition hover:bg-white/10"
          >
            Abrir
          </a>
        </div>
      </header>

      <div className="flex min-h-dvh w-full items-center justify-center">
        {data.type === "pdf" && (
          <iframe
            src={url}
            title="Documento PDF"
            className="h-dvh w-full border-0 bg-white"
          />
        )}

        {data.type === "image" && (
          <div className="flex h-dvh w-full items-center justify-center bg-black">
            <img
              src={url}
              alt="Contenido"
              className="h-full w-full object-contain"
              loading="eager"
              decoding="async"
            />
          </div>
        )}

        {data.type === "video" && (
          <video
            src={url}
            controls
            playsInline
            preload="metadata"
            className="h-dvh w-full bg-black object-contain"
          >
            Tu navegador no soporta vídeo.
          </video>
        )}

        {data.type === "audio" && (
          <div className="flex h-dvh w-full items-center justify-center bg-zinc-950">
            <audio
              src={url}
              controls
              preload="metadata"
              className="w-full max-w-xl"
            />
          </div>
        )}

        {data.type === "document" && (
          <div className="flex h-dvh w-full flex-col items-center justify-center bg-zinc-950 text-center">
            <div className="text-5xl">📄</div>

            <h1 className="mt-4 text-xl font-semibold">
              Documento
            </h1>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Abrir documento
            </a>
          </div>
        )}

        {data.type === "web" && (
          <iframe
            src={url}
            title="Contenido web"
            className="h-dvh w-full border-0 bg-white"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-scripts allow-same-origin"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}

        {data.type === "unknown" && (
          <div className="flex h-dvh w-full flex-col items-center justify-center bg-zinc-950 text-center">
            <div className="text-5xl">📦</div>

            <h1 className="mt-4 text-xl font-semibold">
              Contenido externo
            </h1>

            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
            >
              Abrir contenido
            </a>
          </div>
        )}
      </div>
    </main>
  );
}