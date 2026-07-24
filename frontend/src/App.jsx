import { useState } from "react";
import axios from "axios";
import { FaMoon, FaUpload } from "react-icons/fa";

function App() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Upload code file
  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      setMessage(e.target.result);
    };

    reader.readAsText(file);
  };

  // Ask AI
  const askAI = async () => {
    if (!message.trim()) {
      alert("Please enter a question or paste your code.");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        {
          text: message,
        }
      );

      setResult(response.data.response);
    } catch (error) {
      console.log(error);
      setResult("❌ Error connecting to AI.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-4xl font-bold text-purple-300">
          Code Compass
        </h1>

        <button className="flex items-center gap-2 bg-purple-700 px-5 py-2 rounded-full hover:bg-purple-600 transition">
          <FaMoon />
          Dark Mode
        </button>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center mt-8">

        <div className="relative w-28 h-28 flex items-center justify-center">

          <div className="absolute w-28 h-28 rounded-full bg-purple-500 blur-3xl opacity-30"></div>

          <div className="relative w-24 h-24 rounded-full bg-black border-4 border-purple-500 flex justify-center items-center gap-4 shadow-xl">
            <div className="w-2 h-6 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-6 bg-cyan-400 rounded-full animate-pulse"></div>
          </div>

        </div>

        <h2 className="text-5xl font-bold mt-8 text-center">
          Meet Your AI Coding Assistant
        </h2>

        <p className="text-gray-400 mt-4 text-center">
          Ask programming questions, paste code, or upload a file.
        </p>

      </div>

      {/* Main Card */}
      <div className="flex justify-center mt-12 mb-12">

        <div className="w-4/5 max-w-4xl bg-[#15151d] rounded-3xl p-8 shadow-2xl">

          <h2 className="text-3xl font-bold text-center mb-8">
            Ask Anything About Programming
          </h2>

          <textarea
            rows={14}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Examples:

• What is recursion?

• Write Binary Search in Java.

• Explain this Python code:

def add(a,b):
    return a+b

• Why am I getting NullPointerException?

• Explain time complexity of Merge Sort.`}
            className="w-full p-5 rounded-xl bg-[#09090B] border border-purple-600 outline-none font-mono text-white"
          />

          {/* Buttons */}
          <div className="flex justify-center gap-4 mt-8">

            <label className="cursor-pointer bg-gray-700 hover:bg-gray-600 px-6 py-4 rounded-2xl font-bold flex items-center gap-2">
              <FaUpload />
              Upload File
              <input
                type="file"
                accept=".py,.java,.cpp,.c,.js,.ts,.txt"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>

            <button
              onClick={askAI}
              disabled={loading}
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-12 py-4 rounded-2xl text-lg font-bold hover:scale-105 transition disabled:opacity-50"
            >
              {loading ? "🤖 Thinking..." : "🚀 Ask AI"}
            </button>

          </div>

        </div>

      </div>

      {/* Loading */}
      {loading && (
        <div className="w-4/5 max-w-4xl mx-auto mb-8">
          <div className="bg-[#15151d] rounded-3xl p-8 text-center text-purple-300 text-xl">
            🤖 AI is thinking...
          </div>
        </div>
      )}

      {/* AI Response */}
      {result && (
        <div className="w-4/5 max-w-4xl mx-auto mb-12 bg-[#15151d] rounded-3xl p-8 shadow-xl">

          <h2 className="text-3xl font-bold text-purple-300 mb-6">
            🤖 AI Response
          </h2>

          <div className="bg-black rounded-xl p-6 whitespace-pre-wrap leading-8 text-gray-300 overflow-x-auto">
            {result}
          </div>

        </div>
      )}

    </div>
  );
}

export default App;