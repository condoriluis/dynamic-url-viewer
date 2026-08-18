const BLOCKED_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "0.0.0.0",
  "::1",
  "metadata.google.internal",
]);

const PRIVATE_IPV4 = [
  /^10\./,
  /^127\./,
  /^169\.254\./,
  /^192\.168\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
];

export function validateTargetUrl(input: string): URL {
  if (!input || typeof input !== "string") {
    throw new Error("URL inválida");
  }

  if (input.length > 4096) {
    throw new Error("URL demasiado larga");
  }

  let url: URL;

  try {
    url = new URL(input);
  } catch {
    throw new Error("La URL no es válida");
  }

  if (!["http:", "https:"].includes(url.protocol)) {
    throw new Error(
      "Solo se permiten URLs HTTP y HTTPS"
    );
  }

  const hostname = url.hostname.toLowerCase();

  if (BLOCKED_HOSTS.has(hostname)) {
    throw new Error("Host no permitido");
  }

  if (
    hostname.endsWith(".local") ||
    hostname.endsWith(".internal")
  ) {
    throw new Error("Host no permitido");
  }

  if (PRIVATE_IPV4.some((regex) => regex.test(hostname))) {
    throw new Error("Dirección privada no permitida");
  }

  return url;
}