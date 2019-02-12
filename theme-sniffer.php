<?php
/**
 * Plugin Name: Theme Sniffer
 * Plugin URI:  https://github.com/WPTRT/theme-sniffer
 * Description: Theme Sniffer plugin which uses PHP_CodeSniffer for automatic theme checking.
 * Version:     0.2.0
 * Author:      WPTRT
 * Author URI:  https://make.wordpress.org/themes/
 * Text Domain: theme-sniffer
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @since   0.2.0 Added plugin factory
 * @since   0.1.0
 * @package Theme_Sniffer
 */

namespace Theme_Sniffer;

use Theme_Sniffer\Core\Plugin_Factory;

// If this file is called directly, abort.
defined( 'ABSPATH' ) || die();

// Include the autoloader so we can dynamically include the rest of the classes.
$autoloader = __DIR__ . '/vendor/autoload.php';

if ( is_readable( $autoloader ) ) {
	include_once $autoloader;
}

/**
* Plugin URL const
*/
define( 'PLUGIN_BASE_URL', plugin_dir_url( __FILE__ ) );
define( 'PLUGIN_BASENAME', plugin_basename( __FILE__ ) );

register_activation_hook(
	__FILE__,
	function() {
		Plugin_Factory::create()->activate();
	}
);

/**
 * The code that runs during plugin deactivation.
 *
 * @since 0.2.0
*/
register_deactivation_hook(
	__FILE__,
	function() {
		Plugin_Factory::create()->deactivate();
	}
);


Plugin_Factory::create()->register();