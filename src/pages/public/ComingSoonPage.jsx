import { Link, useLocation } from "react-router-dom";

function ComingSoonPage() {
  const location = useLocation();

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-green-600">
          AllGeo Solutions
        </p>

        <h1 className="mt-3 text-4xl font-bold text-[#082D57]">
          Page Coming Soon
        </h1>

        <p className="mt-4 text-slate-600">Route: {location.pathname}</p>

        <Link
          to="/"
          className="mt-6 inline-block font-semibold text-[#082D57] hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default ComingSoonPage;
