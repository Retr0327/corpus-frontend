import { memo } from 'react';
import { useRouter } from 'next/router';
import { SelectItem } from '@components/UI';
import FormikController from '@components/Form';
import { Form, Formik, FormikHelpers } from 'formik';
import { object, string, number, boolean } from 'yup';
import { Paper, Button, Grid, Group } from '@mantine/core';
import { FormValues } from './types';
import { mediaOptions, generatePostTypeOptions } from './options';

const CURRENT_YEAR = new Date().getFullYear();

function CorpusForm({ boards }: { boards: { [key in string]: any } }) {
  const router = useRouter();

  const initialValue: FormValues = {
    media: 'all',
    word: '',
    boards: '',
    postType: 'all',
    cqlEnable: false,
    start: CURRENT_YEAR,
    end: CURRENT_YEAR,
    windowSize: 10,
    fetchNumber: 20,
  };

  const validationSchema = object({
    media: string().required('Required').nullable(),
    word: string().required('Required'),
    cqlEnable: boolean(),
    boards: string().nullable(),
    start: number()
      .required('Required')
      .test('start', '起始年份不得晚於結束年份！', (start, context) => {
        const end = context.parent.end as number;
        if (start && start > end) {
          return false;
        }
        return true;
      }),
    end: number().required('Required'),
    postType: string().required('Required').nullable(),
    windowSize: number().required('Required'),
    fetchNumber: number().required('Required'),
  });

  const onSubmit = async (values: FormValues, actions: FormikHelpers<FormValues>) => {
    const {
      media,
      start,
      end,
      windowSize,
      word,
      boards: selectedBoards,
      postType,
      cqlEnable,
      fetchNumber,
    } = values;

    const base64 = window.btoa(
      `m=${media}&w=${encodeURIComponent(
        word
      )}&b=${selectedBoards}&p=${postType}&c=${cqlEnable}&s=${start}&e=${end}&win=${windowSize}&f=${fetchNumber}`
    );

    const e = encodeURIComponent(base64);
    const pushUrl = `/concordance?page=1&e=${e}`;
    router.push(pushUrl);
    actions.setSubmitting(false);
  };

  return (
    <Paper shadow="md" mt={20} p={45} radius="md" withBorder>
      <Formik initialValues={initialValue} onSubmit={onSubmit} validationSchema={validationSchema}>
        {(formik) => (
          <Form>
            <Grid justify="center" gutter="xl">
              <Grid.Col xs={12} sm={12} md={12} lg={12}>
                <Group>
                  <FormikController
                    control="select"
                    name="media"
                    label="Media"
                    itemComponent={SelectItem}
                    options={mediaOptions}
                    withAsterisk
                    placeholder="Pick Media"
                  />
                </Group>
              </Grid.Col>

              <Grid.Col xs={8} sm={8} md={8} lg={8}>
                <FormikController control="text-input" name="word" label="Word" withAsterisk />
              </Grid.Col>

              <Grid.Col xs={4} sm={4} md={4} lg={4} mt="auto">
                <FormikController
                  control="switch"
                  name="cqlEnable"
                  label="CQL enable"
                  onLabel="ON"
                  offLabel="OFF"
                  size="md"
                  color="teal"
                />
              </Grid.Col>

              {formik.values.media !== 'all' ? (
                <>
                  <Grid.Col xs={12} sm={12} md={6} lg={6}>
                    <FormikController
                      control="select"
                      name="boards"
                      label="看版"
                      options={boards[formik.values.media].map((value: string) => ({
                        label: value,
                        value,
                      }))}
                      withAsterisk
                      placeholder="Pick board"
                    />
                  </Grid.Col>

                  <Grid.Col xs={12} sm={12} md={6} lg={6}>
                    <FormikController
                      control="select"
                      name="board"
                      label="搜尋對象"
                      options={generatePostTypeOptions(formik.values.media)}
                      withAsterisk
                      placeholder="Pick board"
                    />
                  </Grid.Col>
                </>
              ) : (
                <Grid.Col xs={12} sm={12} md={12} lg={12}>
                  <FormikController
                    control="select"
                    name="postType"
                    label="搜尋對象"
                    options={generatePostTypeOptions(formik.values.media)}
                    withAsterisk
                    placeholder="Pick board"
                  />
                </Grid.Col>
              )}

              <Grid.Col xs={12} sm={12} md={6} lg={6}>
                <FormikController
                  control="number-input"
                  name="start"
                  label="Start year"
                  withAsterisk
                  min={1}
                  max={CURRENT_YEAR}
                />
              </Grid.Col>
              <Grid.Col xs={12} sm={12} md={6} lg={6}>
                <FormikController
                  control="number-input"
                  name="end"
                  label="End year"
                  withAsterisk
                  min={1}
                  max={CURRENT_YEAR}
                />
              </Grid.Col>

              <Grid.Col xs={12} sm={12} md={6} lg={6}>
                <FormikController
                  control="number-input"
                  name="windowSize"
                  label="視窗大小"
                  withAsterisk
                  min={5}
                  max={30}
                />
              </Grid.Col>

              <Grid.Col xs={12} sm={12} md={6} lg={6}>
                <FormikController
                  control="number-input"
                  name="fetchNumber"
                  label="每頁顯示筆數"
                  withAsterisk
                  min={10}
                  step={10}
                  max={100}
                />
              </Grid.Col>

              <Grid.Col xs={3.5} sm={2.5} md={2.5} lg={2.5} xl={2.5} mt={10}>
                <Button type="submit" loading={formik.isSubmitting} fullWidth>
                  {formik.isSubmitting ? 'Submitting' : 'Submit'}
                </Button>
              </Grid.Col>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  );
}

export default memo(CorpusForm);
