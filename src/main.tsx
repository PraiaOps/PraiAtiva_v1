import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);

// Register service worker for PWA (if supported)
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('/sw.js').then(reg => {
			console.log('Service Worker registrado:', reg.scope);
		}).catch(err => {
			console.warn('Falha ao registrar Service Worker:', err);
		});
	});
}
