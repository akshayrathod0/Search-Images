const accessKey = "bpQz4LFyd2MsAf1CZYnrItaSaBwNRz-HUazNlRQi-2s";

const formElement = document.querySelector("form");  // to store form element
const inputElement = document.getElementById("search-image"); // to store input results
const searchResults = document.querySelector(".search-results"); // to store images 
const showMoreButton = document.getElementById("show-more-btn"); // to show more value of images

let inputData = "";  // to store all the input data whatver user searching
let page = 1;  // page number to track the page and default page number is 1

async function searchImages(){  // here we created async function because we will get response from unplash.com website api
    inputData = inputElement.value; // it holds the value from input tag or input section
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`; // to create dyanamic url that why we use back tik to get response from api 
     
    const response = await fetch(url) // it fetch the result from unplash.com api
    const data = await response.json();  // convert url response into json format

    const results = data.results; // we will get results from data variable and it store in result variable

    if(page === 1){
        searchResults.innerHTML = "";  // when page id is 1 then searchResult become empty
    }

    results.map((result) =>{
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add("search-result");  // adding search-result class on div tag
        const image = document.createElement('img');  // create image tag inside div tag
        image.src = result.urls.small;  // adding image with small size
        image.alt = result.alt_description;  // adding image desciption
        const imageLink = document.createElement('a');  // create ankor tag inside div tag
        imageLink.href = result.links.html;  // for adding image link
        imageLink.target = "_blank";
        imageLink.textContent = result.alt_description;

        imageWrapper.appendChild(image);    // adding image tag to div tag
        imageWrapper.appendChild(imageLink);  // adding a(ankor) tag to div tag
        searchResults.appendChild(imageWrapper);

    });
    page++;  // to increase the page number if user click on show more button
    if(page > 1){
        showMoreButton.style.display = "block"; // if our page number is greater than 1 the show show more button on the page 
    }
}
formElement.addEventListener("submit", (event) =>{ // here event type is submit because of if someone search image by pressing enter button or clicking on search button
    event.preventDefault();
    page = 1;
    searchImages()
})

showMoreButton.addEventListener("click", () =>{
    searchImages();
})