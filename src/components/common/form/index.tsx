import { memo } from 'react';
import { ControllerProps } from 'types/form';


function FormController(props: ControllerProps) {
  const { control } = props;

  switch (control) {
    case 'text-input':
      return <TextInput {...props} />;
    default:
      return null;
  }
}

export default memo(FormController);
