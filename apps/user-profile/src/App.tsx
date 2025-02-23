function App() {
  return (
    <div className="container mx-auto">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
              <svg
                className="w-16 h-16 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">John Doe</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                john.doe@example.com
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Member Since
              </label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                January 1, 2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
