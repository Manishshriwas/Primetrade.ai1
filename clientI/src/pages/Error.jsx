
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-6">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl text-gray-600 mb-6">Page Not Found</h2>
      <p className="text-gray-500 mb-8">
        Oops! The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Go Home
      </Link>
    </div>
  );
}
