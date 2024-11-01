import { __ } from '@wordpress/i18n';
import { Button, Placeholder } from '@wordpress/components';
import { VendyLogoSVG } from './vendyIcon';
import { BlockIcon } from '@wordpress/block-editor';

export interface EmbedPlaceholderProps {
  label: string;
  value: string;
  lock: boolean;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  onClick: () => void;
}

const EmbedPlaceholder = (props: EmbedPlaceholderProps): JSX.Element => {
  const { label, value, lock, onChange, onClick } = props;
  return (
    <Placeholder
      icon={<BlockIcon icon={VendyLogoSVG} showColors />}
      label={label}
      instructions={__('Paste the layout ID from Vendy to embed here. You can preview your layout using the toolbar.', 'alibitech-vendy')}
    >
      <form>
        <input
          className={'components-placeholder__input'}
          type={'url'} //should be 'text' but need to be url to inherit styles from placeholder component
          value={value || ''}
          placeholder={__('Enter a layout ID to embed here…', 'alibitech-vendy')}
          onChange={onChange}
          spellCheck={false}
          disabled={lock}
        />
        <Button variant={'primary'} onClick={onClick}>
          {lock ? __('Edit', 'alibitech-vendy') : __('Save', 'alibitech-vendy')}
        </Button>
      </form>
    </Placeholder>
  );
};

export default EmbedPlaceholder;
