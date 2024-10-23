<?php
// add scripts on map plugin
function add_rdat_scripts()
{

     $ikr_world_map_current_screen = get_current_screen();



      if( $ikr_world_map_current_screen->base == "toplevel_page_interactive-world-map-robin" ){
        wp_enqueue_script('from_submit', plugin_dir_url(__FILE__) . '../assets/js/ikrgeo-interactivity.js', array(),'1.0.1', true);

        wp_enqueue_script('featch_data_from_server',plugin_dir_url(__FILE__) . '../assets/js/your-custom.js');
 
        


    
        wp_localize_script(
            'from_submit',
            'your_ajax_object',
            array(
                'ajax_url' => admin_url('admin-ajax.php'),
                'action' => 'rdata_save_data_add'
            )
        );
      }
  
}


add_action('admin_enqueue_scripts', 'add_rdat_scripts');


// add style 
function add_world_map_enqueue_style()
{

    
    $ikr_world_map_current_screen = get_current_screen();



    if( $ikr_world_map_current_screen->base == "toplevel_page_interactive-world-map-robin" ){
    wp_enqueue_style('robingeo_enqueue_styel', plugin_dir_url(__FILE__) . '../assets/style/style.css', array(), '1.0.1','all');
    }
}

add_action('admin_enqueue_scripts', 'add_world_map_enqueue_style');




function rdata_add_admin_menu_page()
{


    ?>
    <div class="robingeo-container">

        <div class="map_container">
            <div class="map-img">

                <?php
                include_once ROBIN_DIR_PATH_WORLD . './views/world-map.php';
                // ?>
            </div>
            <div class="map-data-show">
                <?php
                include_once ROBIN_DIR_PATH_WORLD . './views/show-map-data.php';
                ?>
            </div>
        </div>


        <div class="input-form">
            <?php

            include_once ROBIN_DIR_PATH_WORLD . './views/from-data.php';
            ?>
        </div>
    </div>
    <?php












}



function rdata_save_data_add()
{
    global $wpdb;

    // Retrieve the form data
    $id = isset($_POST['id']) ? sanitize_text_field($_POST['id']) : '';

    $title = isset($_POST['title']) ? sanitize_text_field($_POST['title']) : '';
    $des = isset($_POST['des']) ? sanitize_text_field($_POST['des']) : '';
    $hov_color = isset($_POST['hovecolor']) ? sanitize_text_field($_POST['hovecolor']) : '';
    $fill_colors = isset($_POST['fillcolor']) ? sanitize_text_field($_POST['fillcolor']) : '';
    $click_color = isset($_POST['clickcolor']) ? sanitize_text_field($_POST['clickcolor']) : '';

    // Insert the data into the database
    $table_name = $wpdb->prefix . 'interactive_geo_maps';
    //  add data from data base 

    $wpdb->insert(
        $table_name,
        array(
            'map_id' => $id,
            'title' => $title,
            'map_des' => $des,
            'hov_color' => $hov_color,
            'fill_color' => $fill_colors,
            'click_color' => $click_color,
        )
    );

    // Return the response
    if ($wpdb->insert_id) {
        wp_send_json_success('Data saved successfully.');
    } else {
        wp_send_json_error('Failed to save form data.');
    }


    // Check if the number of rows is less than 7
    // $num_rows = $wpdb->get_var("SELECT COUNT(*) FROM $table_name");
    //  if ($num_rows < 9) {

    // } else {
    //     wp_send_json_error('All fields are full. Cannot add more data. To Add More data go to Prow');
    // }

    // Return the response
    //  wp_send_json_success('Data saved successfully.');
}
add_action('wp_ajax_rdata_save_data_add', 'rdata_save_data_add');
add_action('wp_ajax_nopriv_rdata_save_data_add', 'rdata_save_data_add');



//  get data from data base 
// AJAX callback to fetch data from the database
function rdata_fetch_data_from_database()
{
    global $wpdb;
    $table_name = $wpdb->prefix . 'interactive_geo_maps';

    // Retrieve data from the database
    $data = $wpdb->get_results("SELECT * FROM $table_name", ARRAY_A);

    // Return the response
    wp_send_json_success($data);
}
add_action('wp_ajax_rdata_fetch_data', 'rdata_fetch_data_from_database');
add_action('wp_ajax_nopriv_rdata_fetch_data', 'rdata_fetch_data_from_database');