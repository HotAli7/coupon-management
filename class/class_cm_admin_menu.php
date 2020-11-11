<?php

if (!defined('ABSPATH')) {
    exit;
}

class Class_CM_Admin_Menu
{
    private $cm_template_data;

    public function __construct()
    {
        require_once ('cm_templates.php');

        $this->cm_template_data = new CM_Templates();
    }

    public function create_cm_admin_menu() {

        $page_title = 'Dashboard'; //page title
        $menu_title = 'Coupon Management'; //menu title
        $capability = 'manage_options';
        $menu_slug = 'lfmaudio-cm'; //menu slug
        $function = array($this->cm_template_data, 'coupon_dashboard_template'); //function
        $menu_icon_name = 'dashicons-microphone';
        $menu_position = 10;
        add_menu_page($page_title, $menu_title, $capability, $menu_slug, $function, $menu_icon_name, $menu_position);

        $parent_slug = $menu_slug;
        $sub_page_title = 'Dashboard'; //page title
        $sub_menu_title = 'Dashboard'; //menu title
        $sub_capability = 'manage_options';
        $sub_menu_slug = 'lfmaudio-cm'; //menu slug
        $sub_function = array($this->cm_template_data, 'coupon_dashboard_template'); //function
        $sub_menu_icon_name = plugin_dir_url(__FILE__) . 'images/icon_wporg.png';
        $sub_menu_position = 1;
        add_submenu_page($parent_slug, $sub_page_title, $sub_menu_title, $sub_capability, $sub_menu_slug, $sub_function, $sub_menu_icon_name, $sub_menu_position);

        $parent_slug = $menu_slug;
        $sub_page_title = 'Coupons';
        $sub_menu_title = 'Coupons';
        $sub_capability = 'manage_options';
        $sub_menu_slug = 'cm-coupons';
        $sub_function = array($this->cm_template_data, 'coupon_template');;
        $sub_menu_icon_name = plugin_dir_url(__FILE__) . 'images/icon_wporg.png';
        $sub_menu_position = 2;
        add_submenu_page($parent_slug, $sub_page_title, $sub_menu_title, $sub_capability, $sub_menu_slug, $sub_function, $sub_menu_icon_name, $sub_menu_position);
    }

}