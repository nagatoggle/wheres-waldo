import { Dialog, DialogTitle, DialogContent, Button, TextField, Stack } from '@mui/material';
import { useState } from 'react';
import { Link } from "react-router";
import { formatDisplayTime } from '../utils/timeFormat';

export default function Modal({ gameResult, isOpen, onClose, onRecordName }) {
  const { durationMs, rank, isRankedIn } = gameResult;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Game Result</DialogTitle>
      <DialogContent dividers>
        <p>かかった時間: {formatDisplayTime(durationMs)}</p>
        <p>あなたは{rank}位でした!</p>

        {isRankedIn && (
          <>
            <p>30位以内に入ったので名前を登録できます!</p>
            <Form onRecordName={onRecordName} />
          </>
        )}

        <Link to='/leaderboard'>ランキングを見る</Link>
      </DialogContent>
    </Dialog>
  );
}

function Form({ onRecordName }) {
  const [name, setName] = useState('');
  const [isSent, setIsSent] = useState(false);

  const internalSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await onRecordName(name);
      if (success) {
        setIsSent(true);
      }
    } catch (err) {
      console.error(`登録に失敗しました ${err}`);
    }
  };

  return (
    <form onSubmit={internalSubmit}>
      {!isSent && (
        <Stack direction='row' spacing={0.5}>
          <TextField
            label='Name'
            name='username'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button
            type='submit'
            variant="contained"
            disabled={!name.trim()}
          >
            Submit
          </Button>
        </Stack>
      )}

      {isSent && (
        <p><strong>{name}</strong>という名前で登録しました!</p>
      )}
    </form>
  );
}