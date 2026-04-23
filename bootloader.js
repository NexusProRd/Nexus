(function () {
    const BOOTLOADER_ID = "nexusBootloader";

    function createBootloader() {
        if (document.getElementById(BOOTLOADER_ID)) return;

        const loader = document.createElement("div");
        loader.id = BOOTLOADER_ID;

        loader.innerHTML = `
            <div class="nexus-loader-box">
                <div class="nexus-loader-logo">⚡</div>
                <h2 class="nexus-loader-title">Nexus Pro</h2>
                <p class="nexus-loader-text">Por favor espere...</p>
                <div class="nexus-loader-spinner"></div>
            </div>
        `;

        Object.assign(loader.style, {
            position: "fixed",
            inset: "0",
            background: "linear-gradient(180deg, #f8fafc 0%, #eef2ff 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: "99999",
            transition: "opacity 0.35s ease"
        });

        const style = document.createElement("style");
        style.innerHTML = `
            .nexus-loader-box {
                text-align: center;
                padding: 32px 24px;
                border-radius: 28px;
                background: rgba(255, 255, 255, 0.9);
                box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
                backdrop-filter: blur(10px);
                width: min(88vw, 320px);
            }

            .nexus-loader-logo {
                width: 72px;
                height: 72px;
                margin: 0 auto 16px;
                border-radius: 22px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 34px;
                background: linear-gradient(135deg, #00a884 0%, #00c2a8 100%);
                color: white;
                box-shadow: 0 12px 30px rgba(0, 168, 132, 0.25);
            }

            .nexus-loader-title {
                margin: 0;
                font-family: Poppins, sans-serif;
                font-size: 22px;
                font-weight: 800;
                color: #0f172a;
            }

            .nexus-loader-text {
                margin: 8px 0 18px;
                font-family: Poppins, sans-serif;
                font-size: 13px;
                color: #64748b;
            }

            .nexus-loader-spinner {
                width: 42px;
                height: 42px;
                margin: 0 auto;
                border: 4px solid rgba(0, 168, 132, 0.15);
                border-top-color: #00a884;
                border-radius: 999px;
                animation: nexusSpin 0.8s linear infinite;
            }

            @keyframes nexusSpin {
                to {
                    transform: rotate(360deg);
                }
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(loader);
    }

    function hideBootloader() {
        const loader = document.getElementById(BOOTLOADER_ID);
        if (!loader) return;

        loader.style.opacity = "0";

        setTimeout(() => {
            loader.remove();
        }, 400);
    }

    window.NexusBootloader = {
        createBootloader,
        hideBootloader
    };

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createBootloader);
    } else {
        createBootloader();
    }
})();

(function () {
    function waitForAdminReady() {
        let attempts = 0;
        const maxAttempts = 120;

        const interval = setInterval(() => {
            attempts++;

            const lista = document.getElementById("listaProductos");
            const tienda = document.getElementById("displayTienda");

            const listoPorContenido =
                lista &&
                (
                    lista.children.length > 0 ||
                    (lista.textContent && lista.textContent.trim() !== "")
                ) &&
                tienda &&
                tienda.textContent &&
                tienda.textContent.trim() !== "" &&
                tienda.textContent.trim() !== "Cargando...";

            if (listoPorContenido) {
                clearInterval(interval);
                setTimeout(() => {
                    if (window.NexusBootloader && window.NexusBootloader.hideBootloader) {
                        window.NexusBootloader.hideBootloader();
                    }
                }, 250);
                return;
            }

            if (attempts >= maxAttempts) {
                clearInterval(interval);
                setTimeout(() => {
                    if (window.NexusBootloader && window.NexusBootloader.hideBootloader) {
                        window.NexusBootloader.hideBootloader();
                    }
                }, 1200);
            }
        }, 150);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", waitForAdminReady);
    } else {
        waitForAdminReady();
    }

    window.addEventListener("load", function () {
        setTimeout(() => {
            if (window.NexusBootloader && window.NexusBootloader.hideBootloader) {
                window.NexusBootloader.hideBootloader();
            }
        }, 1800);
    });
})();