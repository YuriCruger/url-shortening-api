function createLinkDiv(originalLink, shortenedLink) {
  const newDiv = document.createElement('div');
  newDiv.className = 'bg-white flex flex-col rounded-lg shadow py-2 mb-6 md:flex-row md:items-center md:justify-between';

  newDiv.innerHTML = `
    <p class="px-4 text-very_dark_violet font-medium">${originalLink}</p>
    <div class="h-[1px] w-full bg-grayish_violet mt-2 mb-2 md:hidden"></div>
    <div class="px-4 md:flex md:items-center md:gap-4">
      <p class="text-cyan font-medium mb-2 md:mb-0">${shortenedLink}</p>
      <button class="bg-cyan w-full text-white font-bold py-2 rounded-lg hover:bg-blue_hover ease-in-out duration-300 md:px-10 copyButton">Copy</button>
    </div>
  `;

  document.getElementById('linksContainer').appendChild(newDiv);

  const copyButton = newDiv.querySelector('.copyButton');
  copyButton.addEventListener('click', function () {
    copyToClipboard(shortenedLink, copyButton);
  });
}

function copyToClipboard(text, copyButton) {
  const clipboard = navigator.clipboard;

  clipboard.writeText(text)
    .then(() => {
      if (copyButton.classList.contains('bg-cyan')) {
        copyButton.classList.add('bg-dark_violet');
        copyButton.textContent = 'Copied!';
      }
    })
    .catch(err => {
      console.error('Erro ao copiar para a área de transferência:', err);
    });
}

document.addEventListener('DOMContentLoaded', function () {
  const storedLinks = JSON.parse(localStorage.getItem('links')) || [];

  storedLinks.forEach(link => {
    createLinkDiv(link.original, link.shortened);
  });
});

document.getElementById('shortenButton').addEventListener('click', function () {
  const linkInputElement = document.getElementById('linkInput');
  const urlToShorten = linkInputElement.value;
  const apiUrl = `https://is.gd/create.php?format=json&url=${encodeURIComponent(urlToShorten)}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.shorturl) {
        const shortUrl = data.shorturl;
        createLinkDiv(urlToShorten, shortUrl);

        const storedLinks = JSON.parse(localStorage.getItem('links')) || [];
        storedLinks.push({ original: urlToShorten, shortened: shortUrl });
        localStorage.setItem('links', JSON.stringify(storedLinks));
      } else {
        console.error("Erro ao encurtar o link:", data.error || "Erro desconhecido");
      }
    })
    .catch(error => {
      console.error("Erro na solicitação:", error.message);
    });
});


function toggleDropdown() {
  const navigationElement = document.getElementById('navigation_section');
  const illustrationElement = document.getElementById('illustration_section');
  
  navigationElement.classList.toggle('max-md:hidden');
  illustrationElement.classList.toggle('hidden');
}



