export interface WidgetProps {
  layoutId: string;
  hostUrl: string;
  includeScript?: boolean;
  embedRef?: React.RefObject<HTMLIFrameElement>;
}

export const SIGNATURE = 'vendy-message';

const Widget = (props: WidgetProps): JSX.Element => {
  const { layoutId, hostUrl, embedRef } = props;
  const affiliateModeMessage = () => {
    const payload = {
      SIGNATURE: SIGNATURE,
      messageType: 'affiliate-mode',
    };
    embedRef?.current && embedRef.current.contentWindow?.postMessage(payload, '*');
  };

  return (
    <iframe
      ref={embedRef}
      onLoad={affiliateModeMessage}
      id={`vendy-widget-${layoutId}`}
      src={`${hostUrl}/embed/${layoutId}`}
      data-host={hostUrl}
      data-wordpress={true}
      width={'100%'}
      height={'800px'}
      style={{ border: 'none' }}
    />
  );
};

export default Widget;
