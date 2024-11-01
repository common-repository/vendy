/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import { BlockSaveProps } from '@wordpress/blocks';
import { View } from '@wordpress/primitives';
import { BlockAttributes } from '../index';
import Widget, { WidgetProps } from './widget';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * The return value of Save should match the final render.php output,
 * Or else wordpress validations will complain.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @param {Object} props            Properties passed to the function.
 * @param {Object} props.attributes Available block attributes.
 *
 * @return {JSX.Element} Element to render.
 */

const Save = (props: BlockSaveProps<BlockAttributes>): JSX.Element => {
  const blockProps = useBlockProps.save();

  return (
    <View {...blockProps}>
      <Widget {...props.attributes} />
    </View>
  );
};

export default Save;
