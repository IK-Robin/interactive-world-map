const ikrgooMap = document.querySelector(".svg_img_obj");

const tooltip = document.getElementById("tooltip");
const detail = document.getElementById("detail");

const form_inp = document.getElementById("rdata_from");

const map_id = document.getElementById("map_id");

const ikrTitle  =document.getElementById('ikrTitle');

const ikrdes  =document.getElementById('ikrdes');


const map_details = document.getElementById("map_details");

const plotId = document.getElementById("plotId");
const detail_name = document.getElementById("detail_name");
const detail_des = document.getElementById("detail_des");
const closebtn = document.getElementById("close");


const hovecolor = document.getElementById("hovecolor");
const fill_color = document.getElementById("fill_color");
const clickColor = document.getElementById("clickColor");

const typeHovcolor = document.getElementById("typeHovcolor");
const filltype = document.getElementById("filltype");
const typeClickColor = document.getElementById("typeClickColor");



 
//  get data on load 








let tab = [];
console.log("robin");
// console.log(closebtn)
ikrgooMap.addEventListener("load", (irkcontent) => {
  // get the svg
  const ikrsvgDocc = ikrgooMap.contentDocument;
  const ikrsvg = ikrsvgDocc.querySelector("svg");

  let items = ikrsvg.querySelectorAll("rect,path", "circle", "polygon");

  items.forEach((ev, ind) => {
    let ids = ev.id;
    let id = {
      id: ids,
    };
    tab.push(id);
  });
  
  // select the svg path
  // console.log(tab)

 // map the item to  the dom and  add event listener


  items.forEach((map_item,index ) =>{

 map_item.addEventListener('click',(ev) =>{

  const ct = ev.target;

  // get the id of  the clicked item
  const click_id = ct.id;
  
  // set the id of the click item id in input fild map_id
  map_id.value = click_id;





 });





  });


  // add form submition  event listener 









  // work with form data and changet the color  of the item  based on the selected color input 
  function updateColor() {
    var textInput = document.getElementById("hovecolor");
    var colorInput = document.getElementById("typeHovcolor");

    // Get the value from the text input
    var colorValue = textInput.value;
    colorInput.value = colorValue;
    // Check if the input value is a valid hex color code
  }

  const colorTypes = (element, value) => {
    element.addEventListener("change", (ev) => {
      value.value = ev.target.value;
    });
  };

  const checkHexCode = (element, tColor, value) => {
    var isValidHex = /^#[0-9A-F]{6}$/i.test(value);

    if (isValidHex) {
      // Prepend the "#" symbol to the input value
      value = value;
      console.log(value);
      // Set the color input value
      tColor.value = value;
      element.style.backgroundColor = "#fff";
    } else {
      console.log("Not a valid hex color code");

      element.style.backgroundColor = "red";
    }
  };

  // set the color on input filde if the clore is change
  colorTypes(typeHovcolor, hovecolor);
  colorTypes(filltype, fill_color);
  colorTypes(typeClickColor, clickColor);

  const setColorType = (element, setColorTypes) => {
    element.addEventListener("keyup", (ev) => {
      let colorValue = ev.target.value;
      checkHexCode(element, setColorTypes, colorValue);
      // Check if the input value is a valid hex color code
    });
  };

  setColorType(hovecolor, typeHovcolor);
  setColorType(fill_color, filltype);
  setColorType(clickColor, typeClickColor);















  form_inp.addEventListener("submit", (subEv) => {
      subEv.preventDefault(); // Prevent default form submission
  
      // Create a FormData object to capture the form values



      worldmp_makeAjaxRequestGlobal(form_inp,your_ajax_object.action,(success) =>{


        if (success) {
          console.log("Data successfully sent to the server.");

          // Fetch data from the database after the data is sent successfully
          featch_data_from_db();
      } else {
          console.log("Failed to send data.");
      }

      });
     
      // featch_data_from_db();


  });


  // get the data asynconalsy 

  async function featch_data_from_db() {
        
    try{

      // fetch the data from the db 
      const response = await world_map_fetchAjaxRequest(your_ajax_object.feacth, your_ajax_object.ajax_url);
      console.log(response)
      


    }catch (err){
      console.log(err);
    }

  }

  featch_data_from_db();

})