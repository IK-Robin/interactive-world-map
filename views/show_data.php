<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body">
      <form action="" id="rdata_from">

 <?php wp_nonce_field('w_map_form_action', 'w_map_form_nonce'); ?>

     <div id="data-entries">
         <div class="data-entry">
             <label for="id">Map ID</label>
             <input type="text" name="id" class="scratch-data-id" id="map_id" />
             <label for="title">Title</label>
             <input type="text" name="title" placeholder="Insert your title" id="ikrTitle" />
             <label for="des">Description</label>
             <input type="text" name="des" id="ikrdes" placeholder="Insert your description" />
             <label for="hovecolor">Hover Color</label>
             <input type="color" id="typeHovcolor"  value="#0000FF" />

             <input type="text" name="hovecolor" id="hovecolor" value="#0000FF"/>
             
             <label for="fill_color">Fill Color</label>
             <input type="color" id="filltype" value="#0000FF" />

             <input type="text" name="fillcolor" id="fill_color" value="#0000FF" />
             
             <label for="clickColor"> click color</label>
             <input type="color" id="typeClickColor"  value="#0000FF" />

             <input type="text" value="#0000FF" name="clickcolor" id="clickColor" />
             
         


         </div>
     </div>



      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit " class="btn btn-primary">Save changes</button>
        

        </form>
      </div>
    </div>
  </div>
</div>