
// API ACCESS KEY
const API_KEY = '?api_key=live_RKwCIlnGZgNLkaExllTLXIPm8xWlEMjBQ15TsiLfwxkXvgDNsQywqMYngbzRg54j';
const URL_LIST = 'https://api.thedogapi.com/v1/breeds?limit=20&page=0';
const URL_IMAGE = 'https://api.thedogapi.com/v1/images/';

async function initialLoad(){
  try {
    const response = await fetch(`${URL_LIST}${API_KEY}`);
    const data = await response.json();

    await getImageJson(data);
  } catch (err) {
    console.error(err);
  }
}


async function getImageJson(data){
  // Initialize an array to store image requests
  const imageRequests = [];

  // Filter data to include only items with reference_image_id
  const filteredData = data.filter(item => item.reference_image_id);

  // Create image requests for each item in filtered data
  for (const item of filteredData) {
      // Construct URL for fetching image
      const imageUrl = `${URL_IMAGE}${item.reference_image_id}${API_KEY}`;
      
      // Create image request and push it to the array
      const request = fetch(imageUrl).then(response => response.json());
      imageRequests.push(request);
  }
  // Execute image requests in batches of 5
  const batchSize = 5;
  const imageJson = [];
  for (let i = 0; i < imageRequests.length; i += batchSize) {
    const batch = imageRequests.slice(i, i + batchSize);
    const batchResponses = await Promise.all(batch).then((batchData)=>{
      renderArr(data, batchData)
    })
  } 
}

function renderArr(data, imgData){
  
  let cardsHTML='';
  for (let item of data) {
    if (item.reference_image_id) {
        let matchingImageData = imgData.find(imgItem => imgItem.id === item.reference_image_id);
        if (matchingImageData) {
            cardsHTML += render({
                ...item,
                ...matchingImageData
            });
        }
    }
  }

  document.getElementById("option-2-enhanced-results").innerHTML += cardsHTML;
}

async function searchbarEventHandler() {
  let input = document.getElementById("searchbar").value;
  input = input.toLowerCase();
  clearResults();
  let searchUrl = `https://api.thedogapi.com/v1/breeds/search?q=${input}&attach_image=1`;
  try {
    const response = await fetch(`${searchUrl}${API_KEY}`);
    const data = await response.json();

    await getImageJson(data);

  } catch (err) {
    console.error(err);
  }
}

function clearResults(){
  document.getElementById("option-2-enhanced-results").innerHTML = '';
}

function render(data) {
  return `
    <li class="card">
      <img src="${data.url}" alt="">
      <div class="card-content">
        <h3 class="header">${data.name}</h3>
      </div>
    </li>`;
}

initialLoad();

const searchbar = document.getElementById("searchbar");
searchbar.addEventListener("keyup", searchbarEventHandler);