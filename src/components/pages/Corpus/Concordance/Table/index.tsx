import { memo, useMemo, useState } from 'react';
import { Concordance, Hit } from 'types/corpus';
import { Table as MantineTable, ScrollArea, Group, Text } from '@mantine/core';
import renderPos from './utils';
import MediaCard from './MediaCard';
import useStyles from './Table.styles';

type Props = { data: Concordance; showPos: boolean };

function Table(props: Props) {
  const { data, showPos } = props;
  const { cx, classes } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = useMemo(
    () =>
      data.hits.map((row, rowIndex) => (
        <tr key={`${row.docPid}-${rowIndex}`}>
          <td>
            <MediaCard docInfos={data.docInfos} docPid={row.docPid} />
          </td>
          {['left', 'center', 'right'].map((value, index) => {
            const key =
              value === 'center' ? 'match' : (value as keyof Pick<Hit, 'left' | 'match' | 'right'>);

            const textAlign: { [key in string]: any } = {
              left: 'right',
              center: 'center',
              right: 'left',
            };

            return (
              <td
                key={`${value}-${index}`}
                style={{
                  textAlign: textAlign[value],
                  wordWrap: 'break-word',
                  wordBreak: 'break-all',
                }}
              >
                {showPos ? renderPos(row[key].word, row[key].pos) : row[key].word.join('')}
              </td>
            );
          })}
        </tr>
      )),
    [data, showPos]
  );

  const columns = useMemo(
    () =>
      [
        { value: '', style: { width: '5%' } },
        { value: 'Before hit', position: 'right' },
        { value: 'Hit', position: 'center', style: { width: '15%' } },
        { value: 'After hit', position: 'left' },
      ].map((value, index) => (
        <th key={`${index}`} style={{ ...value.style }}>
          {value.position === undefined ? (
            value.value
          ) : (
            <Group position={value.position as 'right' | 'center' | 'left'}>
              <Text weight={500} size="md">
                {value.value}
              </Text>
            </Group>
          )}
        </th>
      )),
    []
  );

  return (
    <ScrollArea
      type="scroll"
      style={{ height: 550 }}
      onScrollPositionChange={({ x }) => setScrolled(x !== 0)}
    >
      <MantineTable
        highlightOnHover
        horizontalSpacing="md"
        verticalSpacing="xs"
        fontSize="lg"
        sx={{ tableLayout: 'fixed', minWidth: 700, cursor: 'pointer' }}
      >
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>{columns}</tr>
        </thead>
        <tbody>{rows}</tbody>
      </MantineTable>
    </ScrollArea>
  );
}

export default memo(Table);
