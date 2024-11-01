/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
import { BlockConfiguration, registerBlockType } from '@wordpress/blocks';
import edit from './components/edit';
import save from './components/save';
import metadata from './block.json';
import { VendyLogoSVG } from './components/vendyIcon';

/**
 * Must define attributes for block here for proper typing and block.json['attributes']
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-attributes/
 */
export interface BlockAttributes {
  layoutId: string;
  hostUrl: string;
}

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
registerBlockType(metadata as BlockConfiguration<BlockAttributes>, {
  icon: VendyLogoSVG,
  edit,
  save,
});
