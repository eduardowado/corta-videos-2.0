const coep = "require-corp";
const coop = "same-origin";

if (typeof window === "undefined") {
    // ESTA ES LA PARTE QUE FALTABA (EL CEREBRO DEL SISTEMA)
    self.addEventListener("install", () => self.skipWaiting());
    self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

    self.addEventListener("fetch", function (event) {
        if (event.request.cache === "only-if-cached" && event.request.mode !== "same-origin") return;
        
        event.respondWith(
            fetch(event.request)
            .then((response) => {
                if (response.status === 0) return response;
                const newHeaders = new Headers(response.headers);
                newHeaders.set("Cross-Origin-Embedder-Policy", coep);
                newHeaders.set("Cross-Origin-Opener-Policy", coop);
                return new Response(response.body, { status: response.status, statusText: response.statusText, headers: newHeaders });
            })
        );
    });
} else {
    // PARTE DE REGISTRO
    if (window.navigator.serviceWorker) {
        window.navigator.serviceWorker.register(window.document.currentScript.src).then(
            (registration) => { console.log("✅ Llave activada con éxito"); },
            (err) => { console.log("❌ Fallo en la llave:", err); }
        );
    }
}
