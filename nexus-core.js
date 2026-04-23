/**
 * NEXUS CORE V4.1 - El Cerebro Lógico
 * Este archivo centraliza la comunicación entre tu web y el Motor Maestro.
 */

const NexusCore = {
    
    /**
     * Envía una orden al Motor Maestro (Apps Script)
     * @param {string} accion - Ejemplo: 'uploadPhoto', 'getProducts', 'confirmOrder'
     * @param {object} datos - Los datos que necesita la acción
     */
    async ejecutar(accion, datos = {}) {
        // Usamos la función call de NEXUS_CONFIG para centralizar la seguridad
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

    /**
     * Convierte un archivo de imagen (File) a una cadena Base64
     * Vital para enviar fotos a Google Drive por el "túnel" de datos.
     */
    archivoABase64: (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    }),

    /**
     * Aplica el tema visual de forma dinámica
     * Se usa tanto en Admin como en Index.
     */
    aplicarTema: (tema) => {
        const temasValidos = ['emerald', 'midnight', 'sunset'];
        const claseTema = temasValidos.includes(tema) ? `theme-${tema}` : 'theme-emerald';
        
        // Limpiamos temas anteriores y aplicamos el nuevo
        document.body.classList.remove('theme-emerald', 'theme-midnight', 'theme-sunset');
        document.body.classList.add(claseTema);
        
        // Guardamos preferencia en local
        localStorage.setItem('nexus_theme', tema);
    }
};