const audio = document.getElementById('player');

audio.volume = 0.25;

// Restaura o tempo salvo
const savedTime = localStorage.getItem('audioTime');
const wasPlaying = localStorage.getItem('audioPlaying') === 'true';

if (savedTime) {
    audio.currentTime = parseFloat(savedTime);
}

// Tenta reproduzir automaticamente se o navegador permitir
if (wasPlaying) {
    audio.play().catch((error) => {
        console.warn("Autoplay bloqueado pelo navegador:", error);
        // Cria uma mensagem para o usuário se não permitir
        const playButton = document.createElement('button');
        playButton.textContent = "Seu navegador não permite autoplay, clique aqui para reativar o áudio.";
        playButton.style.position = "fixed";
        playButton.style.top = "50%";
        playButton.style.left = "50%";
        playButton.style.transform = "translate(-50%, -50%)";
        playButton.style.zIndex = "1000";
        // Estilo do botão
        playButton.style.padding = "50px 50px";
        playButton.style.fontSize = "30px";
        playButton.style.backgroundColor = "#902345";
        playButton.style.color = "#1c003d";
        playButton.style.border = "none";
        playButton.style.borderRadius = "250px";
        playButton.style.cursor = "pointer";
        playButton.style.boxShadow = "0px 30px 30px #380237";
        playButton.style.fontWeight = "bold";
        playButton.style.transition = "background-color 0.3s";

        playButton.addEventListener('mouseover', () => {
            playButton.style.backgroundColor = "#fc74ab"; // Cor quando o mouse passa sobre o botão
        });
        playButton.addEventListener('mouseout', () => {
            playButton.style.backgroundColor = "#902345"; // Cor padrão ao tirar o mouse
        });

        document.body.appendChild(playButton);

        // Reproduz o áudio quando o botão for clicado
        playButton.addEventListener('click', () => {
            audio.play();
            playButton.remove(); // Remove o botão depois de reproduzir
        });
    });
}

// Salva o estado do áudio antes de sair da página
window.addEventListener('beforeunload', () => {
    localStorage.setItem('audioTime', audio.currentTime);
    localStorage.setItem('audioPlaying', !audio.paused);
});
