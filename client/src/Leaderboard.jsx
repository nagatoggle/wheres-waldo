import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Button } from '@mui/material';
import { formatDisplayTime } from './utils/timeFormat';
import { Link as RouterLink } from 'react-router';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const getLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard', { method: 'GET' });
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        setLeaderboard(result.leaderboard);

      } catch (err) {
        console.error(err.message);
      }
    }

    getLeaderboard();
  }, []);

  return (
    <>
      <TableContainer>
        <Table size='small' sx={{ maxWidth: 500, mx: 'auto' }} >

          <TableHead>
            <TableRow>
              <TableCell align='center'>順位</TableCell>
              <TableCell>名前</TableCell>
              <TableCell align='right'>時間</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {leaderboard.map((row) => (
              <TableRow
                key={row.rank}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component='th' scope='row' align='center'>{row.rank}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align='right'>{formatDisplayTime(row.durationMs)}</TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'center', my: 3 }}>
        <Button
          variant="outlined"
          component={RouterLink}
          to="/"
        >
          ゲーム説明画面に戻る
        </Button>
      </Box>
    </>
  );
}

