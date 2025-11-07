import { CanvasContainer } from "@/components/Canvas/CanvasContainer";
import { PropertiesPanel } from "@/components/Panels/PropertiesPanel";
import { Toolbar } from "@/components/Toolbar/Toolbar";

function App() {
  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex flex-col">
      <header className="p-4 border-b bg-white">
        <h1 className="text-2xl font-bold">Photo Editor</h1>
      </header>
      <Toolbar />
      <main className="flex flex-grow">
        <div className="flex-grow flex items-center justify-center">
          <CanvasContainer />
        </div>
        <PropertiesPanel />
      </main>
    </div>
  );
}

export default App;
