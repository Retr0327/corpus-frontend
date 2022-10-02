import { memo } from 'react';
import { ControllerProps } from 'types';
import {
  Select,
  Switch,
  TextInput,
  RadioGroup,
  MultiSelect,
  NumberInput,
  CheckboxGroup,
} from './FormikComponents';

function FormikController(props: ControllerProps) {
  const { control } = props;

  switch (control) {
    case 'select':
      return <Select {...props} />;
    case 'switch':
      return <Switch {...props} />;
    case 'text-input':
      return <TextInput {...props} />;
    case 'radio-group':
      return <RadioGroup {...props} />;
    case 'multi-select':
      return <MultiSelect {...props} />;
    case 'number-input':
      return <NumberInput {...props} />;
    case 'checkbox-group':
      return <CheckboxGroup {...props} />;
    default:
      return null;
  }
}

export default memo(FormikController);
