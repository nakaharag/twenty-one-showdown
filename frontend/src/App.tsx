import Game from './components/Game';
import './index.css';

function App() {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col">
            <header className="bg-slate-800 py-6 shadow-lg border-b border-indigo-500/20">
                <h1 className="text-5xl font-extrabold text-center text-red-500">
                    Twenty-One Showdown
                </h1>
            </header>
            <main className="flex-grow flex items-center justify-center p-8">
                <div className="w-full max-w-6xl bg-white/5 backdrop-blur-sm border border-gray-200/20 rounded-2xl shadow-2xl p-10">
                    <Game apiUrl={apiUrl} />
                </div>
            </main>
        </div>
    );
}


export default App;
