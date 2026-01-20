/*! coi-serviceworker v0.1.6 - Guido Zuidhof, licensed under MIT */
let coireg = window.navigator.serviceWorker;
if(coireg) {
    coireg.register(window.document.currentScript.src).then(r => {
        r.addEventListener("updatefound", () => window.location.reload())
        if(r.installing) console.log("Installing coi-serviceworker")
    });
    window.reload = () => window.location.reload();
}