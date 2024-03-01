/** @format */

const loadData = async () => {
  const res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  const data = await res.json();
  const singleData = data.data.tools;
  //   console.log(singleData);
  displayData(singleData);
};

// display data here

const displayData = (data) => {
  data = data.slice(0, 6);
  const cardContainer = document.getElementById("card-container");
  data.forEach((universel) => {
    const features = universel.features;
    let featureHTML = "";
    features.forEach((feature) => {
      featureHTML += `<li>${feature}</li>`;
    });
    const div = document.createElement("div");
    div.classList = `card bg-base-100 shadow-xl`;

    div.innerHTML = `
        <figure><img src="${universel?.image}" alt="image" /></figure>
        <div class="card-body">
            <h2 class="card-title">Feature</h2>
            <ul style="list-style-type: disc;">${featureHTML}</ul>
            <p class = "font-semibold">${universel.name}</p>
            <div class="flex justify-between items-center">
                <div>
                    <i class="fa fa-calendar text-orange-400" aria-hidden="true"></i>
                    <span>${universel.published_in}</span>
                </div>
                <i onclick="modalOpen('${universel.id}')" class="fa fa-long-arrow-right cursor-pointer text-orange-400" aria-hidden="true"></i>
            </div>
        </div>
        `;
    cardContainer.appendChild(div);
  });
};

// show all btn

const showAllBtnHandler = () => {

  const showAllBtn = document.getElementById("show-all-btn");
  showAllBtn.classList.add("hidden");
  loadData();
};

//
const modalOpen = async (id) => {
  console.log("open modal", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  const data = await res.json();
  const Details = data.data;
  console.log(Details);
  const showDetails = document.getElementById("show-details");
  showDetails.innerHTML = `
    <dialog id="my_modal_3" class="modal">
    <div class="modal-box w-11/12 max-w-5xl">
        <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        
        <div class = "flex justify-between gap-2">
            
            <div id="content" class = "w-[50%]  border border-orange-500 p-2 rounded-lg">
                <p class = "text-start font-semibold">${Details.description}</p>
                <div class="flex justify-center items-center gap-2 mt-3">
                    <div id="price1" class="bg-slate-100 text-orange-600 p-2 rounded-lg">
                        <span class = "font-semibold mb-2">${
                          Details.pricing[0].plan
                        }</span>
                        <p>${Details.pricing[0].price}</p>
                    </div>
                    <div id="price1" class="bg-slate-100 text-orange-600 p-2 rounded-lg">
                        <span class = "font-semibold mb-2">${
                          Details.pricing[1].plan
                        }</span>
                        <p>${Details.pricing[1].price}</p>
                    </div>
                    <div id="price1" class="bg-slate-100 text-orange-600 p-2 rounded-lg">
                        <span class = "font-semibold mb-2">${
                          Details.pricing[2].plan
                        }</span>
                        <p>${Details.pricing[2].price}</p>
                    </div>
                </div>
                <div>
                      
                        
                </div>
            </div>
            <div id="img" class = "w-[45%] border border-gray-200 p-2">
                <img class = "w-full rounded" src="${
                  Details.image_link[0]
                }" alt="">
            </div>
        </div>
        
        <p class="py-4">Press ESC key or click on ✕ button to close</p>
    </div>
</dialog>
    `;
  my_modal_3.showModal();
};
loadData();
