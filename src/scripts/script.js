function feachSearchItems() {
  const xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
      if(xhr.status === 200) {
        let columns = document.querySelector('.product-container');
        columns.innerHTML = '';
        let emptyList = document.querySelector('.empty-list');
        emptyList.style.display = 'none';

        // Converte a resposta da API para objeto JavaScript
        let results = JSON.parse(xhr.responseText);

        // Itera sobre os resultados e cria os elementos dinamicamente
        results.forEach(result => {
          let itemDiv = document.createElement('div');
          itemDiv.classList.add('product');

          let imgSection = document.createElement('div');
          imgSection.classList.add('product-image');

          let img = document.createElement('img');
          img.src = result.image; // Supondo que a resposta da API tenha uma propriedade imageUrl
          img.alt = 'Foto do produto';
          imgSection.appendChild(img);

          let body = document.createElement('div');
          body.classList.add('product-details');

          let titleh2 = document.createElement('h2');
          titleh2.classList.add('product-name');
          titleh2.textContent = result.title; // Supondo que a resposta da API tenha uma propriedade title

          let rating = document.createElement('div');
          rating.classList.add('product-rating');

          let ratingSpan = document.createElement('span');
          ratingSpan.classList.add('star-rating');
          ratingSpan.textContent = result.stars; // Supondo que a resposta da API tenha propriedades rating e ratingsCount

          let ratingCount = document.createElement('span');
          ratingCount.classList.add('rating-count');
          ratingCount.textContent = '15 mil avaliações'; // Aqui, você precisa definir o texto para ratingCount, não para rating

          body.appendChild(titleh2);

          rating.appendChild(ratingSpan);
          rating.appendChild(ratingCount); // Estava atribuindo a rating em vez de ratingCount
          body.appendChild(rating); // Adiciona o elemento rating ao corpo

          itemDiv.appendChild(imgSection);
          itemDiv.appendChild(body);

          columns.appendChild(itemDiv);
        });
      } else {
        console.log('Failed to fetch results:', xhr.status);
      }
    }
  };



  let input = document.getElementById('input');
  let inputValue = input.value;

  let url = `http://localhost:3000/search?key=${inputValue}`;

  xhr.open('GET', url, true);
  xhr.send();
}
