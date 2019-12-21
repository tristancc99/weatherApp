let formEl = document.querySelectorAll(".form-group");
let submitEl = document.querySelector("button");
let key = "&APPID={b55b04a528beb1cfa6eff31754af547d}";
let url = "api.openweathermap.org";
console.log(formEl[0].children[1].children[0].children[0].children[0].checked);
console.log(formEl[0].children[1].children[1]);

function getInput(event) {
  if (formEl[0].children[1].children[0].children[0].children[0].checked) {
    console.log(formEl[0].children[1].children[1].value);
    let inputName = formEl[0].children[1].children[1].value;
    nameFetch(inputName);
  } else if (
    formEl[1].children[1].children[0].children[0].children[0].checked
  ) {
    console.log(formEl[1].children[1].children[1].value);
  } else if (
    formEl[2].children[1].children[0].children[0].children[0].checked
  ) {
    console.log(formEl[2].children[1].children[1].value);
  }
}

submitEl.addEventListener("click", getInput);

async function nameFetch(name) {}

async function zipFetch(zip) {}

async function coordFetch(coords) {}
