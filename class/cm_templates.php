<?php

if (!defined('ABSPATH')) {
    exit;
}

class CM_Templates
{
    public function __construct()
    {

    }

    /**
     *  Show Status of Voice Talents on Dashboard.
     */

    function coupon_dashboard_template()
    {
        // check user capabilities
        if (!current_user_can('manage_options')) {
            return;
        }

        include(CM_BASE_DIR . '/templates/dashboard.php');
    }

    /**
     *  Show List of Voice Talents on Voice Talent Page.
     */

    function coupon_template()
    {
        // check user capabilities
        if (!current_user_can('manage_options')) {
            return;
        }

        include(CM_BASE_DIR . '/templates/coupon.php');
    }
}