const emojis = ['🎮', '🎮', '🎲', '🎲', '🎯', '🎯', '🎪', '🎪', '🎨', '🎨', '🎭', '🎭', '🎪', '🎪', '🎯', '🎯'];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    const shuffledEmojis = shuffleArray([...emojis]);
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';

    shuffledEmojis.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.value = emoji;
        card.dataset.index = index;
        card.addEventListener('click', flipCard);
        gameContainer.appendChild(card);
    });
}

function flipCard() {
    if (flippedCards.length === 2 || this.classList.contains('flipped')) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        setTimeout(checkMatch, 800);
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.value === card2.dataset.value;

    if (match) {
        matchedPairs++;
        if (matchedPairs === emojis.length / 2) {
            setTimeout(() => {
                alert(`🎉 Congratulations! You won in ${moves} moves! 🎉`);
            }, 300);
        }
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.textContent = '';
        card2.textContent = '';
    }

    flippedCards = [];
}

function restartGame() {
    const gameContainer = document.getElementById('gameContainer');
    gameContainer.innerHTML = '';
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    document.getElementById('moves').textContent = '0';
    createBoard();
}

document.addEventListener('DOMContentLoaded', createBoard);
document.getElementById('restart').addEventListener('click', restartGame);