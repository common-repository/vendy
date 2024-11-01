import { __ } from '@wordpress/i18n';
import { BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { Icon, gallery } from '@wordpress/icons';
export interface ToolbarProps {
  onClick: () => void;
  disabled: boolean;
}

const Toolbar = (props: ToolbarProps) => {
  const { onClick, disabled } = props;

  return (
    <BlockControls>
      <ToolbarGroup>
        <ToolbarButton icon={<Icon icon={gallery} />} label={__('Toggle Preview', 'alibitech-vendy')} onClick={onClick} disabled={disabled} />
      </ToolbarGroup>
    </BlockControls>
  );
};

export default Toolbar;
