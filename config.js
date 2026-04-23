// config.js - NEXUS PRO V4.1
const NEXUS_CONFIG = {
    // 1. URL DE TU MOTOR MAESTRO
    API_URL: "https://script.google.com/macros/s/AKfycbxXELd_IB-sQNUPEJCwlV9YY9j74tmltOL1vR924NYGjEeFArPWmTIC4eLlMeNlUz2ZQA/exec", 
    
    // 2. RECUPERADORES DE DATOS
    getShopId: () => localStorage.getItem('nexus_shop_id'),
    getPin: () => localStorage.getItem('nexus_pin') || "1234",

    // 3. FUNCIÓN DE COMUNICACIÓN UNIVERSAL
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