/**
 * Wordpress block-editor docs
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { View } from '@wordpress/primitives';
import { useEffect, useState, useRef } from 'react';
import EmbedPlaceholder from './placeholder';
import { BlockEditProps } from '@wordpress/blocks';
import { BlockAttributes } from '../index';
import Toolbar from './toolbar';
import Widget, { SIGNATURE, WidgetProps } from './widget';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {JSX.Element} Element to render.
 */
const Edit = ({ attributes, setAttributes }: BlockEditProps<BlockAttributes>): JSX.Element => {
  const blockProps = useBlockProps();
  const { layoutId, hostUrl } = attributes;
  const [preview, setPreview] = useState(false);
  const [lock, setLock] = useState(false);
  const [value, setValue] = useState('');
  const embedRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (layoutId) {
      setValue(layoutId);
      setLock(true);
    }
  }, []);

  useEffect(() => {
    lock && setAttributes({ layoutId: value });
  }, [lock]);

  const widgetProps: WidgetProps = {
    ...attributes,
    embedRef,
  };

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (!embedRef?.current) {
        return;
      }

      const widgetMessage = event.data;

      if (
        event.origin === hostUrl &&
        widgetMessage['widgetId'] === layoutId &&
        widgetMessage['SIGNATURE'] === SIGNATURE &&
        widgetMessage['messageType'] === 'resize'
      ) {
        embedRef.current.style.width = '100%';
        const newHeight = widgetMessage.newSize.height;
        if (newHeight) {
          embedRef.current.style.height = `${newHeight}px`;
        }
      }
    };

    window.addEventListener('message', messageHandler);

    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <>
      <Toolbar
        disabled={!lock}
        onClick={() => {
          setPreview(!preview);
        }}
      />
      <View {...blockProps}>
        {preview ? (
          <Widget {...widgetProps} />
        ) : (
          <EmbedPlaceholder
            label={__('Vendy Layout', 'alibitech-vendy')}
            value={value}
            lock={lock}
            onChange={(e) => {
              setValue(e.currentTarget.value);
            }}
            onClick={() => {
              value && setLock(!lock);
            }}
          />
        )}
      </View>
    </>
  );
};

export default Edit;
