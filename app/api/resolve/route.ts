import { NextRequest, NextResponse } from "next/server";
import { validateTargetUrl } from "../../../lib/security";
import { detectResourceType } from "../../../lib/url";

export async function GET(request: NextRequest) {
  try {
    const target =
      request.nextUrl.searchParams.get("url");

    if (!target) {
      return NextResponse.json(
        {
          success: false,
          error: "Falta el parámetro url",
        },
        {
          status: 400,
        }
      );
    }

    const url = validateTargetUrl(target);

    let contentType: string | null = null;

    try {
      const response = await fetch(url.toString(), {
        method: "HEAD",
        redirect: "follow",
        signal: AbortSignal.timeout(5000),
        headers: {
          "User-Agent": "DynamicURLViewer/1.0",
        },
      });

      contentType =
        response.headers.get("content-type");
    } catch {
      // Algunos servidores no soportan HEAD.
      // Usaremos la extensión de la URL como fallback.
    }

    const type = detectResourceType(
      url.toString(),
      contentType
    );

    return NextResponse.json(
      {
        success: true,
        url: url.toString(),
        type,
        contentType,
      },
      {
        headers: {
          "Cache-Control":
            "public, max-age=60, s-maxage=300",
        },
      }
    );
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "No se pudo procesar la URL";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      {
        status: 400,
      }
    );
  }
}