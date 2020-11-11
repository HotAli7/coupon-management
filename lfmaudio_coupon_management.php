<?php
/*
    Plugin Name: Coupon Management
    Description: To Manage Coupons in the websites of LFM Company
    Author: hotali7
    Version: 2.0
    Text Domain: cm
*/

if (!defined('ABSPATH'))
    exit;

if (! defined('CM_VERSION'))
    define('CM_VERSION', '2.0');
class LFMAudioCM
{
    public function __construct()
    {
        $this->define_constants();

        add_action( 'admin_menu', array($this, 'coupon_management_menu') );

        $this->cm_init();
        $this->cm_enqueue_assets();
    }

    protected function define_constants()
    {
        if (! defined('CM_BASE_FILE')) {
            define('CM_BASE_FILE', __FILE__);
        }
        if (! defined('CM_BASE_DIR')) {
            define('CM_BASE_DIR', dirname(CM_BASE_FILE));
        }
        if (! defined('CM_PLUGIN_URL')) {
            define('CM_PLUGIN_URL', plugin_dir_url(__FILE__));
        }
        if (! defined('CM_PLUGIN_DIR')) {
            define('CM_PLUGIN_DIR', plugin_dir_path(__FILE__));
        }
        if (! defined('CM_DIR_NAME')) { //Plugin Folder Name.
            define('CM_DIR_NAME', trim(dirname(plugin_basename(__FILE__)), '/'));
        }
    }

    // 	Creates voice talent management menu
    public function coupon_management_menu()
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        require_once('class/class_cm_admin_menu.php');

        $menu = new Class_CM_Admin_Menu();

        $menu->create_cm_admin_menu();
    }

    protected function cm_enqueue_assets()
    {
        $page_slug = isset($_REQUEST['page'])?$_REQUEST['page']:'';

        if ($page_slug == 'cm-coupons')
        {
            wp_deregister_style('wp-admin');
            wp_enqueue_script('cm_script', CM_PLUGIN_URL . 'assets/dist/main.min.js', ['jquery'], "", true);
//            wp_enqueue_style('cm_style', CM_PLUGIN_URL . 'assets/dist/main.css', []);
        }
    }

    /**
     *  Show Status of Voice Talents on Dashboard.
     */

    // 	Loads admin dashboard
    protected function cm_init ()
    {
        require_once('class/cm_templates.php');

        new CM_Templates();
    }
}

new LFMAudioCM();