import { memo } from 'react';
import Link from 'next/link';
import Route from '@config/routes';
import { Button } from '@mantine/core';
import { IconArrowBackUp } from '@tabler/icons';

function ReturnButton() {
  return (
    <Button
      component={Link}
      href={Route.home}
      variant="outline"
      leftIcon={<IconArrowBackUp size={14} />}
    >
      Back to Form
    </Button>
  );
}

export default memo(ReturnButton);
