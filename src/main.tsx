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

// Listen for messages from the Service Worker (e.g., new SW activated)
if (navigator.serviceWorker) {
	navigator.serviceWorker.addEventListener('message', (event) => {
		try {
			const data = event.data || {};
			if (data.type === 'SW_ACTIVATED') {
				console.log('Service Worker activated, cache:', data.cacheName);
				// Simple strategy: reload to pick up new assets
				// In production, consider prompting the user instead of hard reload
						if (confirm('Nova versão disponível. Deseja recarregar para atualizar?')) {
							window.location.reload();
						}
			}
		} catch (e) {
			console.error('Erro no listener do SW message:', e);
		}
	});
}
