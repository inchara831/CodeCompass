function ResultsPanel() {
  return (
    <div className="bg-slate-800 m-6 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">
        Analysis Results
      </h2>

      <div className="mb-5">
        <h3 className="text-blue-400 font-semibold">📄 Summary</h3>
        <p className="text-gray-300">
          Your code summary will appear here.
        </p>
      </div>

      <div className="mb-5">
        <h3 className="text-blue-400 font-semibold">📚 Concepts Used</h3>
        <p className="text-gray-300">
          Concepts detected by AI will appear here.
        </p>
      </div>

      <div className="mb-5">
        <h3 className="text-blue-400 font-semibold">⚡ Time Complexity</h3>
        <p className="text-gray-300">
          Complexity will appear here.
        </p>
      </div>

      <div>
        <h3 className="text-blue-400 font-semibold">💾 Space Complexity</h3>
        <p className="text-gray-300">
          Complexity will appear here.
        </p>
      </div>
    </div>
  );
}

export default ResultsPanel;