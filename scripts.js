document.addEventListener('DOMContentLoaded', function () {
    // Desplazar la página al header al recargar
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Desplazamiento suave al inicio

    // Velocidad de escritura general
    const writingSpeed = 50; // Velocidad general (en milisegundos)

// Efecto de escritura para textos
const typeWriter = (element, text, i = 0) => {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), writingSpeed);
    } else {
        // Habilitar el desplazamiento después de que termine la escritura
        document.body.style.overflow = 'auto';
    }
};
    // Deshabilitar el desplazamiento inicialmente
    document.body.style.overflow = 'hidden';

    // Aplicar efecto de escritura al título con velocidad personalizada (120ms)
    const title = document.querySelector('.title');
    if (title) {
        const titleText = title.textContent;
        title.textContent = ''; // Limpiar el contenido inicial
        typeWriter(title, titleText, 0, 120); // Velocidad de 120ms
    }

    // Aplicar efecto de escritura al h2 con velocidad general (50ms)
    const h2 = document.querySelector('h2');
    if (h2) {
        const h2Text = h2.textContent;
        h2.textContent = ''; // Limpiar el contenido inicial
        typeWriter(h2, h2Text); // Usamos la velocidad general (50ms)
    }

    // Aplicar efecto de escritura a las notas y párrafos de las fotos
    const notes = document.querySelectorAll('.note, .polaroid p');
    notes.forEach(note => {
        const noteText = note.textContent;
        note.textContent = ''; // Limpiar el contenido inicial
        typeWriter(note, noteText); // Usamos la velocidad general (50ms)
    });

    // Configurar videos para que se reproduzcan automáticamente en bucle
    const videos = document.querySelectorAll('.polaroid video');
    videos.forEach(video => {
        video.setAttribute('autoplay', ''); // Autoreproducir
        video.setAttribute('loop', ''); // Reproducir en bucle
        video.setAttribute('muted', ''); // Silenciar siempre
        video.setAttribute('playsinline', ''); // Para móviles
        video.removeAttribute('controls'); // Eliminar controles de reproducción

        // Asegurar que el video esté silenciado
        video.muted = true;

        // Esperar a que el video esté listo y forzar la reproducción
        video.addEventListener('canplay', () => {
            video.play().catch(error => console.error('Error al reproducir video:', error));
        });

        // Asegurar que el video se reinicie si se detiene inesperadamente
        video.addEventListener('ended', () => {
            video.currentTime = 0;
            video.play();
        });
    });

    // Efecto de aparición suave para las imágenes
    const polaroids = document.querySelectorAll('.polaroid, .album-cover');
    polaroids.forEach((polaroid, index) => {
        polaroid.style.opacity = 1; // Inicialmente visibles
        polaroid.style.transition = 'opacity 1s ease-in-out'; // Transición suave
    });

    // Función para desaparecer y reaparecer elementos de forma suave
    const fadeInOutRandom = (elements) => {
        // Seleccionar algunos elementos de forma aleatoria
        const randomElements = Array.from(elements).sort(() => Math.random() - 0.5).slice(0, Math.floor(elements.length / 2));

        // Desaparecer los elementos seleccionados
        randomElements.forEach(element => {
            element.style.opacity = 0; // Desaparecer
            setTimeout(() => {
                element.style.opacity = 1; // Reaparecer
            }, 17000); // Tiempo entre desaparecer y reaparecer
        });
    };

    // Bucle para desaparecer y reaparecer algunos textos y fotos cada 15 segundos
    setInterval(() => {
        // Excluir la carta (#letter) del proceso de desaparición
        const textElements = document.querySelectorAll('.note, .polaroid p');
        const photos = document.querySelectorAll('.polaroid, .album-cover');

        // Desaparecer y reaparecer algunos textos (excluyendo la carta)
        fadeInOutRandom(textElements);

        // Desaparecer y reaparecer algunas fotos
        fadeInOutRandom(photos);
    }, 8000); // Cada 10 segundos
});
