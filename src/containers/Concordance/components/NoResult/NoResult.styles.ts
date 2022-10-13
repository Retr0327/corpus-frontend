import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: 10,
    paddingBottom: 10,
  },

  title: {
    fontWeight: 400,
    marginBottom: theme.spacing.md,
    textAlign: 'center',
    [theme.fn.smallerThan('sm')]: {
      fontSize: 28,
      textAlign: 'center',
    },
  },
}));

export default useStyles;
