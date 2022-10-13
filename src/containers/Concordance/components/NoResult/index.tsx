import Link from 'next/link';
import { Button, Container, Group, Title } from '@mantine/core';
import useStyles from './NoResult.styles';

function NoResult() {
  const { classes } = useStyles();

  return (
    <Container className={classes.root}>
      <Title className={classes.title}>No Result</Title>
      <Group position="center">
        <Link href="/" passHref>
          <Button component="a" variant="outline">
            Back to Form
          </Button>
        </Link>
      </Group>
    </Container>
  );
}

export default NoResult;
