import { memo } from 'react';
import { ControllerProps } from 'types/form';
import { Select, Switch, TextInput } from './components';

function FormController(props: ControllerProps) {
  const { control } = props;

  switch (control) {
    case 'select':
      return <Select {...props} />;
    case 'switch':
      return <Switch {...props} />;
    case 'text-input':
      return <TextInput {...props} />;
    default:
      return null;
  }
}

export default memo(FormController);
