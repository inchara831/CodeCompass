function LanguageSelector() {
  return (
    <div className="p-6">
      <label className="block text-white mb-2 font-semibold">
        Programming Language
      </label>

      <select className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600">
        <option>C++</option>
        <option>Python</option>
        <option>Java</option>
        <option>JavaScript</option>
      </select>
    </div>
  );
}

export default LanguageSelector;