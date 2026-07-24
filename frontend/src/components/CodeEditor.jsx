function CodeEditor() {
  return (
    <div className="p-6">
      <label className="block text-white mb-2 font-semibold">
        Paste Your Code
      </label>

      <textarea
        rows="15"
        placeholder="Paste your code here..."
        className="w-full bg-slate-800 text-white border border-slate-600 rounded-lg p-4 font-mono resize-none"
      ></textarea>
    </div>
  );
}

export default CodeEditor;