<!-- Bootstrap Modal for Add/Edit Form -->
<div class="modal fade" id="dataModal" tabindex="-1" role="dialog" aria-labelledby="dataModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="dataModalLabel">Add / Edit Entry</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="dataForm">
                    <input type="hidden" id="map_id" name="id" />
                    <label for="title">Title</label>
                    <input type="text" name="title" placeholder="Insert your title" id="ikrTitle" required />
                    
                    <label for="des">Description</label>
                    <input type="text" name="des" id="ikrdes" placeholder="Insert your description" required />
                    
                    <label for="hovecolor">Hover Color</label>
                    <input type="color" id="typeHovcolor" name="hovecolor" value="#0000FF" required />

                    <label for="fill_color">Fill Color</label>
                    <input type="color" id="filltype" name="fillcolor" value="#0000FF" required />
                    
                    <label for="clickColor">Click Color</label>
                    <input type="color" id="typeClickColor" name="clickcolor" value="#0000FF" required />

                    <button type="submit" class="btn btn-primary mt-3" id="saveEntryBtn">Save</button>
                </form>
            </div>
        </div>
    </div>
</div>

<!-- Table for Displaying Entries -->
<table id="mapTable" border="1" class="table mt-4">
    <thead>
        <tr>
            <th>#</th>
            <th>Map ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Hover Color</th>
            <th>Fill Color</th>
            <th>Click Color</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <!-- Rows will be populated by JavaScript -->
    </tbody>
</table>