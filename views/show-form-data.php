<?php
function enqueue_scripts() {
    wp_enqueue_script('your-custom-js', plugin_dir_url(__FILE__) . '../js/your-custom.js', array('jquery'), '1.0', true);
    
    // Localize the script with the ajaxurl and action
    wp_localize_script('your-custom-js', 'your_ajax_object', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'action' => 'your_ajax_action'
    ));
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');

function your_ajax_callback() {
    global $wpdb;
    
    $show_all_Data = $wpdb->get_results(
        $wpdb->prepare(
            "SELECT * FROM wp_data_table",''
        ), ARRAY_A
    );
    
    // Convert the array to objects
    $data_as_objects = array_map(function($item) {
        return (object) $item;
    }, $show_all_Data);
    
    // Return the data as JSON
    wp_send_json($data_as_objects);
}
add_action('wp_ajax_your_ajax_action', 'your_ajax_callback');
add_action('wp_ajax_nopriv_your_ajax_action', 'your_ajax_callback');
?>
