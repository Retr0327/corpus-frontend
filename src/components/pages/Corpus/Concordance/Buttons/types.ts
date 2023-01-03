import { Dispatch, SetStateAction } from 'react';

export type HelperButtonProps = {
  showPos: boolean;
  setShowPos: Dispatch<SetStateAction<boolean>>;
};
