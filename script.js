let flickerOccurred = false;

const switchTheme = () => {
  const rootElem = document.documentElement;
  const currentTheme = rootElem.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  rootElem.setAttribute("data-theme", newTheme);

  const logo = document.getElementById("logo");
    logo.style.order = '2';
    const newLogoSrc = getImageUrl('--logo-image');
    logo.src = newLogoSrc;
};


const playButton = document.querySelector(".play-button");
const mainContent = document.querySelector("main");
const gameWindow = document.querySelector(".card-game");

function flicker() {
    // Randomly change the background color to black or white
    document.body.style.backgroundColor = Math.random() > 0.5 ? 'black' : 'white';
    document.body.style.filter = 'grayscale(100%)';
}
const cardBackside = '--back-card-image';
const logoImage = '--logo-image';
const frontImageVariables = [
    '--axe-image', '--candlestick-image', '--cleaver-image', '--hammer-image',
    '--hex-image', '--knife-image', '--lead-pipe-image', '--poison-image',
    '--revolver-image', '--rope-image', '--saw-image', '--syringe-image',
    '--axe-image', '--candlestick-image', '--cleaver-image', '--hammer-image',
    '--hex-image', '--knife-image', '--lead-pipe-image', '--poison-image',
    '--revolver-image', '--rope-image', '--saw-image', '--syringe-image'
];

function getImageUrl(variable) {
    const style = getComputedStyle(document.documentElement);
    return style.getPropertyValue(variable).trim();
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function setupGame() {
    mainContent.innerHTML = '';

    shuffle(frontImageVariables);

    const cardGame = document.createElement("div");
    cardGame.className = "card-game";
    mainContent.appendChild(cardGame);

    setTimeout(() => {
      cardGame.scrollIntoView({ behavior: "smooth" });
  }, 100);

    for (let i = 0; i < 24; i++) {
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";
        mainContent.appendChild(cardContainer);
        const card = document.createElement('div');
        card.className = "card";
        cardContainer.appendChild(card);
        cardGame.appendChild(cardContainer);

        const frontside = document.createElement('img');
        frontside.className = "front";
        frontside.src = getImageUrl(cardBackside);
        card.appendChild(frontside);

        const backside = document.createElement('img');
        backside.className = "back";
        backside.src = getImageUrl(frontImageVariables[i]);
        card.appendChild(backside);
    }

    const cards = document.querySelectorAll('.card');
    let rotatedCards = [];
    let matchedPairs = [];

    cards.forEach(card => {
      card.addEventListener('click', () => {
      if (rotatedCards.includes(card) || matchedPairs.includes(card)) {
      return;
      }

      if (rotatedCards.length < 2) {
        card.classList.add('rotate');
        rotatedCards.push(card);
      }

      if (rotatedCards.length === 2) {
        let image1 = rotatedCards[0].querySelector('img.back');
        let image2 = rotatedCards[1].querySelector('img.back');

        if (image1.src !== image2.src) {
          setTimeout(() => {
            rotatedCards.forEach(rotated => rotated.classList.remove('rotate'));
            rotatedCards = [];
          }, 750);
        } else {
          matchedPairs.push(...rotatedCards);
          rotatedCards = [];

          matchedPairs.forEach(matchedCard => {
            matchedCard.style.pointerEvents = 'none';
          });

          if (matchedPairs.length === 24) {
            endGame(true);
        }
        }
      }
      if (matchedPairs.length === 4 && !flickerOccurred) {
        flickerOccurred = true; 
        switchTheme();

        const flickerInterval = setInterval(flicker, 300);
        
        setTimeout(() => {
            clearInterval(flickerInterval);
            document.body.style.backgroundColor = 'black';
            cardGame.style.display = "none";
            document.body.style.filter = 'none';
            showImages();
        }, 2500);

        function showImages() {
          const imageContainer = document.createElement('div');
          imageContainer.id = 'imageContainer';
          imageContainer.style.position = 'absolute';
          imageContainer.style.top = '50%';
          imageContainer.style.left = '50%';
          imageContainer.style.transform = 'translate(-50%, -50%)';
          imageContainer.style.display = 'flex';
          imageContainer.style.gap = '0';
          imageContainer.style.marginTop = "20rem"

          const img1 = document.createElement('img');
          img1.src = './assets/evil-computer.png';
          img1.style.width = '21.25rem';
          img1.style.height = 'auto';
          img1.className = 'evil-comp';

          const img2 = document.createElement('img');
          img2.src = './assets/evil-speech.png';
          img2.style.width = '21.25rem';
          img2.style.height = 'auto';
          img2.className = 'evil-speech';

          imageContainer.appendChild(img1);
          imageContainer.appendChild(img2);
          document.body.appendChild(imageContainer);

          setTimeout(() => {
            showMoreImages();
            document.getElementById('continueButton').style.display = 'block';
        }, 3000);
        }
        function showMoreImages() {
          const imageContainer = document.getElementById('imageContainer');
          document.querySelector("img.evil-comp").style.display = "none";
          document.querySelector("img.evil-speech").style.display = "none";
          const img3 = document.createElement('img');
          img3.src = './assets/angry-computer.png'; 
          img3.style.width = '21.25rem';
          img3.style.height = 'auto';
          img3.className = 'angry-comp';
      
          const img4 = document.createElement('img');
          img4.src = './assets/more-evil-speech.png'; 
          img4.style.width = '21.25rem';
          img4.style.height = 'auto';
          img4.className = 'more-evil-speech';
      
          imageContainer.appendChild(img3);
          imageContainer.appendChild(img4);
          
          const continueButton = document.createElement('button');
          continueButton.className = 'continue-button';
          continueButton.innerText = 'Continue';
          continueButton.style.marginTop = '6.8rem';
          mainContent.appendChild(continueButton);

          continueButton.addEventListener('click', () => { 
            imageContainer.style.display = "none";
            continueButton.style.display = "none";
            document.querySelector('.card-game').style.display = "grid";
          
            setTimeout(() => {
              cardGame.scrollIntoView({ behavior: "smooth" });
          }, 100);
             
            setTimeout(() => {
                const mockImage = document.createElement('img');
                mockImage.className = 'mock-image';
                mockImage.src = './assets/evil-computer.png';
                mockImage.style.height = '30rem';
                mockImage.style.order = '1';
                document.querySelector('header').appendChild(mockImage);
                
                cards.forEach(card => {
                    const backside = card.querySelector('.back');
                    backside.src = backside.src.slice(0, -10) + ".png";
        
                    const frontside = card.querySelector('.front');
                    frontside.src = frontside.src.slice(0, -10) + ".png";
        
                    backside.src = '/assets/' + backside.src.split('/').pop(); 
                    frontside.src = '/assets/' + frontside.src.split('/').pop();
                });
                
                startTimer();
            }, 2000); 
        });
    }
    

    function startTimer() {
      let timeRemaining = 70;
      const timerDisplay = document.createElement('div');
      timerDisplay.id = 'timerDisplay';
      timerDisplay.innerText = `Time Remaining: ${timeRemaining}s`;
      mainContent.appendChild(timerDisplay);
  
      // Use a standard interval instead of a custom property
      const timerInterval = setInterval(() => {
          timeRemaining--;
          timerDisplay.innerText = `Time Remaining: ${timeRemaining}s`;
          if (timeRemaining === 0 || matchedPairs.length === 24) {
              clearInterval(timerInterval);
              checkGameResult();
          }
      }, 1000);
  }
  
  function checkGameResult() {
      if (matchedPairs.length === 24) {
          endGame(true); // Success
      } else {
          endGame(false); // Failure
      }
  }
  
  function endGame(success) {
      const timerDisplay = document.getElementById('timerDisplay');
      if (timerDisplay) {
          timerDisplay.remove();
      }
  
      const cardGame = document.querySelector('.card-game');
      if (cardGame) {
          cardGame.style.display = 'none';
      }
  
      const endScreen = document.createElement('div');
      endScreen.id = 'endScreen';
      endScreen.style.display = 'flex';
      endScreen.style.flexDirection = 'column';
      endScreen.style.alignItems = 'center';
      endScreen.style.justifyContent = 'center';
      endScreen.style.position = 'absolute';
      endScreen.style.top = '50%';
      endScreen.style.left = '50%';
      endScreen.style.transform = 'translate(-50%, -50%)';
      document.body.appendChild(endScreen);
  
      const img1 = document.createElement('img');
      img1.src = success ? './assets/sad-computer.png' : './assets/mocking-computer.png';
      img1.style.width = '21.25rem';
      img1.style.height = 'auto';
      img1.style.marginTop = '29.75rem';
      endScreen.appendChild(img1);
  
      const message = document.createElement('p');
      message.className = "end-message";
      message.innerText = success ? 'Fine... You win... You matched all the pairs!' : 'Game over, Loser! You did not match all the pairs.';
      endScreen.appendChild(message);
      document.querySelector('.mock-image').style.display = 'none';
  
      const retryButton = document.createElement('button');
      retryButton.innerText = 'Play Again';
      retryButton.className = 'continue-button';
      retryButton.addEventListener('click', () => {
          document.body.removeChild(endScreen);
          setupGame();
          startTimer();
          matchedPairs = []; // Reset matched pairs
          
      });
      endScreen.appendChild(retryButton);
  }
      } 
    });
    
  });

}

playButton.addEventListener("click", () => {
    playButton.style.display = "none";
    setupGame(); 
});

