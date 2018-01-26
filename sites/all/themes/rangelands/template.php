<?php
/**
 * @file
 * The primary PHP file for this theme.
 */

function rangelands_vscc_element_white_icons($vars) {
    $image_vars = array(
        'path' => drupal_get_path('theme', 'rangelands') . '/images/png/vscc/' . $vars['element'] . '.png',
        'alt' => t($vars['element']),
        'title' => t($vars['element']),
    );
    return theme('image', $image_vars);
}