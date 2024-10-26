const ikrgooMap = document.querySelector(".svg_img_obj");

const tooltip = document.getElementById("tooltip");
const detail = document.getElementById("detail");

const form_inp = document.getElementById("rdata_from");

const map_id = document.getElementById("map_id");

const ikrTitle = document.getElementById("ikrTitle");

const ikrdes = document.getElementById("ikrdes");

const map_details = document.getElementById("map_details");

const plotId = document.getElementById("plotId");
const detail_name = document.getElementById("detail_name");
const detail_des = document.getElementById("detail_des");
const closebtn = document.getElementById("close");

const hovecolor = document.getElementById("hovecolor");
const fill_color = document.getElementById("fill_color");

const typeHovcolor = document.getElementById("typeHovcolor");
const filltype = document.getElementById("filltype");

const rdata_submit_form  = document.getElementById('rdata_submit_form');


//  get data on load

let tab = [];

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

  items.forEach((map_item, index) => {
    map_item.addEventListener("click", (ev) => {
   
      map_click_func(ev);
    })
  });

  
  function map_click_func (event){
    const ct = event.target;  
    // get dataset from the svg path 

    const data_set = ct.dataset;
       // get the id of  the clicked item
       const click_id = ct.id;

       // set the id of the click item id in input fild map_id
       map_id.value = click_id;

    if (Object.keys(data_set).length === 0) {
      ikrTitle.value = '';
      ikrdes.value = '';
      rdata_submit_form.value = "Submit"
  } else {
    // get the data from the dataset
    ikrTitle.value = data_set.title;
    ikrdes.value =  data_set.desc;
    hovecolor.value = data_set.hover;
    typeHovcolor.value = data_set.hover;

    fill_color.value = data_set.fill;
    filltype.value = data_set.fill;

    // change the submit button value 

    rdata_submit_form.value = "Edit"
    

  }



 
  }

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
  

  const setColorType = (element, setColorTypes) => {
    element.addEventListener("keyup", (ev) => {
      let colorValue = ev.target.value;
      checkHexCode(element, setColorTypes, colorValue);
      // Check if the input value is a valid hex color code
    });
  };

  setColorType(hovecolor, typeHovcolor);
  setColorType(fill_color, filltype);
 

  form_inp.addEventListener("submit", (subEv) => {
    subEv.preventDefault(); // Prevent default form submission



 const  change_color = ikrsvg.querySelector(`#${map_id.value}`);
    change_color.style.fill=fill_color.value;


    // check the value of the submit btn to change the edit or add mode

    if(rdata_submit_form.value == 'Edit'){

      // send request to edit the data 
      worldmp_makeAjaxRequestGlobal(
        form_inp,
        your_ajax_object.edit_data,
        (success) => {
          if (success) {
            console.log("Data successfully sent to the server.");
  
            // Fetch data from the database after the data is sent successfully
            featch_data_from_db();
          } else {
            console.log("Failed to send data.");
          }
        }
      );
    }else{
       // Create a FormData object to capture the form values
    
    worldmp_makeAjaxRequestGlobal(
      form_inp,
      your_ajax_object.action,
      (success) => {
        if (success) {
          console.log("Data successfully sent to the server.");

          // Fetch data from the database after the data is sent successfully
          featch_data_from_db();
        } else {
          console.log("Failed to send data.");
        }
      }
    );
    }


  

    // featch_data_from_db();
  });

  // get the data asynconalsy

  async function featch_data_from_db() {
    try {
      // fetch the data from the db
      const response = await world_map_fetchAjaxRequest(
        your_ajax_object.feacth,
        your_ajax_object.ajax_url
      );

      console.log(response)
      // check the  response status code

      if (response.length == 0) {
        console.log("No data found");
      } else {
        // set the color of  the map based on the data
        items.forEach((mapId) => {
          response.forEach((data) => {
            if (mapId.id == data.map_id) {
              const setColor = ikrsvg.querySelector(`#${mapId.id}`);
              setColor.setAttribute("data-fill", data.fill_color); 
              setColor.setAttribute("data-hover", data.hov_color); 
              setColor.setAttribute('data-title', data.title);
              setColor.setAttribute('data-desc', data.map_des);
              setColor.style.fill = `${data.fill_color}`;
            }
          });
        });

      // Array of objects for initial population
const mapData = [
  {
      "id": "37",
      "map_id": "wd_2",
      "title": "robin 24 hello 44 4",
      "map_des": "hood4",
      "hov_color": "#fc032f",
      "fill_color": "#0000ff",
      "click_color": "#0000FF"
  },
  {
      "id": "42",
      "map_id": "wd_5",
      "title": "w5",
      "map_des": "robin 5",
      "hov_color": "#31ce38",
      "fill_color": "#ff80ff",
      "click_color": ""
  }
];

// Function to populate the table
function populateTable(data) {
  const tableBody = document.querySelector('#mapTable tbody');
  tableBody.innerHTML = ''; // Clear existing rows

  data.forEach((item, ind) => {
      const row = document.createElement('tr');
      
      row.innerHTML = `
          <td>${ind + 1}</td>
          <td>${item.map_id}</td>
          <td>${item.title}</td>
          <td>${item.map_des}</td>
          <td style="background-color: ${item.hov_color};">${item.hov_color}</td>
          <td style="background-color: ${item.fill_color};">${item.fill_color}</td>
          <td style="background-color: ${item.click_color};">${item.click_color || 'N/A'}</td>
          <td>
              <button class="edit-btn btn btn-sm btn-primary" data-id="${item.map_id}">Edit</button>
              <button class="delete-btn btn btn-sm btn-danger" data-id="${item.map_id}">Delete</button>
          </td>
      `;
      
      tableBody.appendChild(row);
  });
}

// Show the modal with form data for adding or editing
function showModal(isEdit = false, data = {}) {
  document.getElementById("map_id").value = isEdit ? data.map_id : '';
  document.getElementById("ikrTitle").value = isEdit ? data.title : '';
  document.getElementById("ikrdes").value = isEdit ? data.map_des : '';
  document.getElementById("typeHovcolor").value = isEdit ? data.hov_color : '#0000FF';
  document.getElementById("filltype").value = isEdit ? data.fill_color : '#0000FF';
  document.getElementById("typeClickColor").value = isEdit ? data.click_color : '#0000FF';

  $('#dataModal').modal('show');
}

// Event listener for table actions
document.addEventListener('click', function(event) {
  const target = event.target;
  const id = target.getAttribute('data-id');
  
  if (target.classList.contains('edit-btn')) {
      const itemData = mapData.find(item => item.map_id === id);
      showModal(true, itemData);
  } else if (target.classList.contains('delete-btn')) {
      deleteEntry(id);
  }
});

// Save entry on form submit
document.getElementById('dataForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const id = document.getElementById("map_id").value;
  const title = document.getElementById("ikrTitle").value;
  const description = document.getElementById("ikrdes").value;
  const hoverColor = document.getElementById("typeHovcolor").value;
  const fillColor = document.getElementById("filltype").value;
  const clickColor = document.getElementById("typeClickColor").value;

  if (id) {
      // Handle edit case
      const entry = mapData.find(item => item.map_id === id);
      if (entry) {
          entry.title = title;
          entry.map_des = description;
          entry.hov_color = hoverColor;
          entry.fill_color = fillColor;
          entry.click_color = clickColor;
      }
  } else {
      // Handle add case
      mapData.push({
          id: String(mapData.length + 1),
          map_id: 'wd_' + (mapData.length + 1),
          title,
          map_des: description,
          hov_color: hoverColor,
          fill_color: fillColor,
          click_color: clickColor
      });
  }

  $('#dataModal').modal('hide');
  populateTable(mapData);
});

// Initial population of the table
populateTable(mapData);

      }
    } catch (err) {
      console.log(err);
    }
  }

  featch_data_from_db();
});
