import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>Summerlin West, Las Vegas</h1>
      <p className="lede">
        Master-planned living on the western edge of Las Vegas, with Red Rock Canyon and the
        Spring Mountains as the backdrop.
      </p>
      <div className="actions">
        <Link className="btn primary" href="/3d-tour">
          Explore the 3D neighborhood tour
        </Link>
      </div>
    </>
  );
}
