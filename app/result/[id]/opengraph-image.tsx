import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { personalities } from "@/lib/quiz-data";

export const runtime = "nodejs";
export const alt = "Your Coffee Personality";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const result = personalities.find((p) => p.id === id) ?? personalities[0];

  const imageData = await readFile(
    join(process.cwd(), "public", result.image.replace(/^\//, ""))
  );
  const imageSrc = `data:image/jpeg;base64,${imageData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageSrc}
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(74,52,35,0.1) 0%, rgba(74,52,35,0.9) 75%)",
          }}
        />
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            width: "100%",
            height: "100%",
            padding: "64px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#F4E4D4",
              marginBottom: 20,
            }}
          >
            What&apos;s Your Coffee Personality?
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              fontWeight: 700,
              color: "#FFF8EF",
              marginBottom: 16,
            }}
          >
            {result.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 40,
              color: "#E3C9A3",
            }}
          >
            {result.coffee}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
