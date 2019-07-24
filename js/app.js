/***
PROJECT-5__Public-Api-Requests
*/

//selecting the gallery class and saving it in the constant galleryInfo
const galleryInfo = document.getElementById("gallery");

//selecting the search-container class and saving it in the constant searchContainer
const searchContainer = document.querySelector(".search-container");

//selecting the body class and saving it in the constant body
const body = document.querySelector("body");

//selecting the created card class and saving it in the constant card
const card = document.getElementsByClassName("card");

//selecting the created header-text-container class and saving it in the constant headerTextContainer
const headerTextContainer = document.querySelector(".header-text-container");



//  FETCH FUNCTION


function fetchData(url) {
  // fetch is returning a promise
  return fetch(url) 
    .then(checkStatus)
    // parse data into JSON
    .then(response => response.json()) 
    //mapping response data
    .then(data => data.results.map(data => data))
    // writing error to the consol if fetch fails to get data
    .catch(err => console.log(Error("Error fetching data", err))); 
}

fetchData("https://randomuser.me/api/?results=12&nat=us").then(setGalleryInfo);


//  CHECKSTATUS FUNCTION


function checkStatus(response) {
  // if statement to check the response from the promise
  if (response.ok) {
    // retuning resolved if promise is fullfilled
    return Promise.resolve(response); 
  } else {
    // returning reject if promise is not  fullfilled
    return Promise.reject(new Error(response.statusText)); 
  }
}


//  SETGALLERYINFO FUNCTION


function setGalleryInfo(people) {
  people.map((person, index) => {
    //creating  the element div and storing it in a constant cardDiv
    const cardDiv = document.createElement("div");
   cardDiv.className = "card";
    //appending the div to the gallery
    galleryInfo.append(cardDiv);
    //creating the html tags for cardDive
    cardDiv.innerHTML = `<div class="card-img-container">
      <img class="card-img" src="${person.picture.large}" alt="">
  </div>
  <div class="card-info-container">
<h3 id="name" class="card-name cap">${person.name.first} ${
      person.name.last
    }</h3>
      <p class="card-text">${person.email}</p>
      <p class="card-text cap">${person.location.city}, ${
      person.location.state
    }</p>
  </div>
  
  `;
  //Adding an event listener on the cardDiv
    cardDiv.addEventListener("click", () => {
      createModal(people, index);
    });
  });
}



//  SETGALLERYINFO FUNCTION


function createModal(people, index) {
  const person = people[index];
  //creating an element div and storing it in constant modalContainerDiv
  const modalContainerDiv = document.createElement("div");
  modalContainerDiv.className = "modal-container";
  galleryInfo.append(modalContainerDiv);
  const date = new Date(person.dob.date);
  //creating html tags for modalContainerDiv
  modalContainerDiv.innerHTML = `<div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
         <img class="modal-img" src="${person.picture.large}
                          
           " alt="profile picture">
     <h3 id="name" class="modal-name cap"> ${person.name.first} ${person.name.last}</h3>
            <p class="modal-text">${person.email}</p>
            <p class="modal-text cap">${person.location.city}</p>
               <hr>
            <p class="modal-text">${person.phone}</p>
            <p class="modal-text cap">${person.location.street}., ${person.location.state}, ${person.location.postcode}</p>
            <p class="modal-text">Birthday: ${date.toLocaleDateString( "en-US" )}</p>

            </div>

      <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">
          Prev
          </button>
        <button type="button" id="modal-next" class="modal-next btn">
          Next
          </button>

          </div>
                    
          </div>`;

  // closes modal when open
  //creating the modal close btn and adding a click event listener
  const CloseModalbutton = document.getElementById("modal-close-btn");
  CloseModalbutton.addEventListener("click", () => {
    //removing the modalContainerDiv
    modalContainerDiv.remove();
  });
  //creating tags for the modal next and prev
  const nextButton = document.getElementById("modal-next");
  const prevButton = document.getElementById("modal-prev");
  //creating an if statement for the nextButton and adding event listener to it
  if (index < people.length - 1) {
    nextButton.addEventListener("click", e => {
      modalContainerDiv.remove();
      createModal(people, index + 1);
    });
  } else {
    //else if statement for disabling the nextButton it index === 0
    nextButton.disabled = true;
  }
   //creating an if statement for the prevButton and adding event listener to it
  if (index > 0) {
    prevButton.addEventListener("click", e => {
      modalContainerDiv.remove();
      createModal(people, index - 1);
      nextButton.disabled = false;
    });
    //else if statement for disabling the prevButton it index === 0
  } else if (index === 0) {
    prevButton.disabled = true;
  }
}


//  SEARCHEMPLOYEE FUNCTION


function searchEmployee(cards, field) {
  cards.filter(card => {
    const person = card.querySelector("#name").innerHTML;
    console.log(person);
    if (person.toLowerCase().indexOf(field.value.toLowerCase()) > -1) {
      card.style.display = "";
     
    } else {
      card.style.display = "none";
    
    }
    
  });
}
// creating html tags for searchContainer
searchContainer.innerHTML = 
`<form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search Name Here!">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`;

const searchInput = document.getElementById("search-input");
searchInput.focus();
const searchButton = document.getElementById("search-submit");



//  EVENT LISTENERS


// Adding the click event listener on searrchButton
searchButton.addEventListener("click", e => {
  e.preventDefault();
  searchEmployee([...card], searchInput);
});
// Adding keyup event listener on searchInput
searchInput.addEventListener("keyup", e => {
  searchEmployee([...card], searchInput);
});

