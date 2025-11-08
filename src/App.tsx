import { CanvasContainer } from "@/components/Canvas/CanvasContainer";
import { PropertiesPanel } from "@/components/Panels/PropertiesPanel";
import { Toolbar } from "@/components/Toolbar/Toolbar";

function App() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
      <header className="px-6 py-4 border-b border-gray-700 bg-gray-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Photo Editor
            </span>
          </h1>
        </div>
      </header>
      <Toolbar />
      <main className="flex flex-grow overflow-hidden">
        <div className="flex-grow flex items-center justify-center p-4 bg-gray-900">
          <CanvasContainer />
        </div>
        <PropertiesPanel />
      </main>
    </div>
  );
}

export default App;
