import {
  ColProps,
  SwitchProps as MantineSwitchProps,
  SelectProps as MantineSelectProps,
  TextInputProps as MantineTextInputProps,
  MultiSelectProps as MantineMultiSelectProps,
  NumberInputProps as MantineNumberInputProps,
} from '@mantine/core';
import { ReactNode } from 'react';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export type Option = {
  label: any;
  value: any;
};

export interface Options {
  options: Option[];
}

export type Controlled<T> = { label: string | JSX.Element; name: string } & T;

export type TextInputProps = Controlled<MantineTextInputProps>;
export type NumberInputProps = Controlled<MantineNumberInputProps>;
export type SelectProps = Controlled<
  Omit<MantineSelectProps, 'data'> & {
    options: MantineSelectProps['data'];
  }
>;
export type MultiSelectProps = Controlled<
  Omit<MantineMultiSelectProps, 'data'> & {
    options: MantineMultiSelectProps['data'];
  }
>;
export type SwitchProps = Controlled<MantineSwitchProps>;

export type ControllerProps =
  | ({ control: 'text-input' } & TextInputProps)
  | ({ control: 'select' } & SelectProps)
  | ({ control: 'number-input' } & NumberInputProps)
  | ({ control: 'multi-select' } & MultiSelectProps)
  | ({ control: 'switch' } & SwitchProps);

export type FormControllerProps<TFieldValues extends FieldValues = FieldValues, TContext = any> = {
  controllers: {
    [key in keyof TFieldValues]: ControllerProps & { name: key } & {
      col?: ColProps;
      after?: ReactNode | ((ctx: UseFormReturn<TFieldValues, TContext>) => ReactNode);
    };
  };
};
