
export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to My App 🚀
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        This is the home page. Use the navigation bar to explore Signup, Login, Dashboard, and Profile.
      </p>
      <a
        href="/register"
        className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
      >
        Get Started
      </a>
    </div>
  );
}
