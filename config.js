// config.js - NEXUS PRO V4.1
const NEXUS_CONFIG = {
    // 1. URL DE TU MOTOR MAESTRO (Tu URL de Apps Script)
    API_URL: "https://script.google.com/macros/s/AKfycbxXELd_IB-sQNUPEJCwlV9YY9j74tmltOL1vR924NYGjEeFArPWmTIC4eLlMeNlUz2ZQA/exec", 
    
    // 2. ID DE TU HOJA DE CÁLCULO (Sacado de tu link)
    shopId: "1eRwI9Q66yZ1eKfszZHY4Q905PqQQ3vGTq7jS7KTLNFA",

    // 3. RECUPERADORES DE DATOS
    getShopId: function() { 
        return this.shopId; // Ya no lo busca en el navegador, usa el de arriba fijo
    },
    getPin: () => localStorage.getItem('nexus_pin') || "1234",

    // 4. FUNCIÓN DE COMUNICACIÓN UNIVERSAL
    async call(action, data = {}) {
        const payload = {
            action: action,
            shopId: this.getShopId(),
            pin: this.getPin(),
            data: data
        };

        try {
            const response = await fetch(this.API_URL, {
                method: 'POST',
                body: JSON.stringify(payload)
            });
            return await response.json();
        } catch (error) {
            console.error("Error en conexión:", error);
            return { success: false, message: "Error al conectar con el Motor Maestro." };
        }
    }
};
