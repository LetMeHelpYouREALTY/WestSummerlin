import type { Metadata } from "next";
import PanoViewer from "./PanoViewer";

const WORLD_URL = "https://marble.worldlabs.ai/world/62a13b09-0470-4f5f-a61c-abf5f29428ad";

export const metadata: Metadata = {
  title: "3D Neighborhood Tour",
  description:
    "Look around an AI-generated 3D scene inspired by Summerlin West, Las Vegas, with Red Rock Canyon in the background.",
  openGraph: {
    title: "Summerlin West 3D Neighborhood Tour",
    images: [{ url: "/worlds/summerlin-west-og.jpg", width: 1200, height: 600 }],
  },
};

export default function ThreeDTourPage() {
  return (
    <>
      <h1>Summerlin West in 3D</h1>
      <p className="lede">
        Drag to look around a golden-hour street scene inspired by Summerlin West: stucco homes with
        tile roofs, desert landscaping, and the sandstone cliffs of Red Rock Canyon on the horizon.
      </p>

      <PanoViewer src="/worlds/summerlin-west-pano.jpg" alt="360° view of a Summerlin West-style street at golden hour" />

      <div className="actions">
        <a className="btn primary" href={WORLD_URL} target="_blank" rel="noopener noreferrer">
          Walk through the full 3D world
        </a>
      </div>

      <p className="note">
        This scene is an AI-generated illustration created with World Labs Marble. It is inspired by
        the look of Summerlin West and does not depict a specific street, home, or listing. Actual
        homes, views, and landscaping vary.
      </p>

      <section className="copy">
        <h2>About Summerlin West</h2>
        <p>
          Summerlin West is the newest part of the Summerlin master-planned community on the western
          edge of the Las Vegas Valley. Neighborhoods sit close to Red Rock Canyon National
          Conservation Area, with trails, parks, and mountain views throughout.
        </p>
      </section>
    </>
  );
}
