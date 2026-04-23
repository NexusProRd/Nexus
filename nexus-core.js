/**
 * NEXUS CORE V4.1 - El Cerebro Lógico
 */
const NexusCore = {
    
    async ejecutar(accion, datos = {}) {
        try {
            const resultado = await NEXUS_CONFIG.call(accion, datos);

            if (!resultado.success) {
                console.error("Error en Motor Maestro:", resultado.message);
                return { success: false, message: resultado.message };
            }

            return resultado;

        } catch (error) {
            console.error("Error crítico de conexión:", error);
            return { success: false, message: "No se pudo conectar con el Motor Maestro." };
        }
    },

    // Convierte imágenes para subirlas si es necesario
    archivoABase64: (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    }),

    // Formatea los precios a moneda dominicana
    formatearRD: (monto) => {
        return new Intl.NumberFormat('es-DO', {
            style: 'currency',
            currency: 'DOP',
        }).format(monto);
    }
};