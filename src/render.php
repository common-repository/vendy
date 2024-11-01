<?php
/**
 * PHP file to use when rendering the block type on the server to show on the front end.
 *
 * The following variables are exposed to the file:
 *     $attributes (array): The block attributes.
 *     $content (string): The block default content.
 *     $block (WP_Block): The block instance.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */
if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

$host = $attributes['hostUrl'];
$id = 'vendy-widget-'.$attributes['layoutId'];
$src = $host.'/embed/'.$attributes['layoutId'];

$script = '
	window.addEventListener("load", () => {
		const layoutId = "'.$attributes['layoutId'].'";
		document.getElementById(`vendy-widget-${layoutId}`).contentWindow.postMessage({
			SIGNATURE: "vendy-message",
			messageType: "affiliate-mode",
			widgetId: layoutId,
		}, "*");
	});
';

wp_register_script( 'atvendy_alibitech_vendy_affiliate_mode_message_script', '',);
wp_enqueue_script( 'atvendy_alibitech_vendy_affiliate_mode_message_script' );
wp_add_inline_script('atvendy_alibitech_vendy_affiliate_mode_message_script', $script, 'after');

?>
<iframe 
	id="<?php echo esc_attr($id)?>"
	src="<?php echo esc_url($src)?>"
	data-host="<?php echo esc_url($host)?>"
	width="100%"
	height="800px"
	style="border: none;"
></iframe>
