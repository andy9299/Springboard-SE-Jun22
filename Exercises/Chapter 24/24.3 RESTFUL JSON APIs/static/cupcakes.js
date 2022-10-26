const BASE_URL = "http://127.0.0.1:5000/api";
const cupcakeList = document.getElementById("cupcakes-list");
const cupcakeForm = document.getElementById("add-cupcake-form");
const cupcakeFormFlavor = document.getElementById("form-flavor");
const cupcakeFormSize = document.getElementById("form-size");
const cupcakeFormRating = document.getElementById("form-rating");
const cupcakeFormImage = document.getElementById("form-image");
/** given a cupcake generate html */

function generateCupcakeHTML(cupcake) {
    return `
    <div data-cupcake-id=${cupcake.id} class="col-3">
        <img class="cupcake-img img-thumbnail"
            src="${cupcake.image}">
        <b>Flavor:</b> ${cupcake.flavor} <b>Size:</b> ${cupcake.size} <b>Rating:</b> ${cupcake.rating}
    </div>
  `;
}

/** display all cupcakes on page */

async function displayAllCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);
    cupcakeList.innerHTML = "";
    for (let cupcake of response.data.cupcakes) {
        cupcakeList.innerHTML += generateCupcakeHTML(cupcake);
    }
    return true;
}

displayAllCupcakes();

cupcakeForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    flavor = cupcakeFormFlavor.value;
    size = cupcakeFormSize.value;
    rating = cupcakeFormRating.value;
    image = (cupcakeFormImage.value.trim() == "") ? null : cupcakeFormImage.value.trim();

    const newCupcakeResp = await axios.post(`${BASE_URL}/cupcakes`, {
        flavor,
        rating,
        size,
        image
    });
    cupcakeList.innerHTML += generateCupcakeHTML(newCupcakeResp.data.cupcake);
    cupcakeForm.reset();
});