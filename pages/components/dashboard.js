// components/Dashboard.js
export default function Dashboard({ fetchData, data }) {
  const { msg, secret } = data;
  return (
    <div className="mt-6 p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold mb-2 text-gray-800">Dashboard</h3>
      {/* <div
        className={`text-sm mt-2 ${
          tokenPresent ? "text-green-500" : "text-red-500"
        }`}>
        {tokenPresent ? "Token Present" : "No Token Present"}
      </div> */}
      <div className="text-gray-800 mt-4">
        <p>{msg}</p>
        <p>{secret}</p>
      </div>
      <button
        onClick={fetchData}
        className="w-full mt-4 bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition-colors">
        Get Data
      </button>
    </div>
  );
}
