import { memo } from 'react';
import { Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { ReturnButton, PosController } from './Controls';
import { HelperButtonProps } from './types';

function HelperButtons(props: HelperButtonProps) {
  const { showPos, setShowPos } = props;
  const miniScreen = useMediaQuery('(max-width: 300px)');

  return (
    <Group spacing={miniScreen ? 'xs' : 30} mb={miniScreen ? 'xd' : 2}>
      <ReturnButton />
      <PosController setShowPos={setShowPos} showPos={showPos} />
    </Group>
  );
}

export default memo(HelperButtons);
