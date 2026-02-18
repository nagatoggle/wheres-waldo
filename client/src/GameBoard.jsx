import { useState } from 'react';
import { Menu, MenuItem, Box } from '@mui/material';
import Pin from './components/Pin';

export default function GameBoard({ charas, foundCharas, onSelect, boardUrl }) {
  const [anchorPos, setAnchorPos] = useState(null);
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    event.preventDefault();

    setAnchorPos(
      anchorPos === null
        ? { mouseX: event.clientX, mouseY: event.clientY }
        : null,
    );

    const percentCoords = getPercentCoords(event);
    setClickCoords(percentCoords);
  };

  const handleItemClick = (charaId) => {
    onSelect(charaId, clickCoords.x, clickCoords.y);
    handleClose();
  }

  const handleClose = () => {
    setAnchorPos(null);
  };

  return (
    <div
      style={{
        position: 'relative',
        display: 'inline-block',
        lineHeight: 0,
      }}
    >
      <Box
        component='img'
        src={boardUrl}
        alt='game board'
        onClick={handleClick}
        sx={{
          display: 'block',
          width: 'auto',
          maxWidth: 'none',
          cursor: 'crosshair',
        }}
      />

      {foundCharas.map(fc => (
        <Pin
          key={fc.id}
          label={fc.id}
          xPercent={fc.x}
          yPercent={fc.y}
        />
      ))}

      <Menu
        open={anchorPos !== null}
        onClose={handleClose}
        anchorReference='anchorPosition'
        anchorPosition={
          anchorPos !== null
            ? { top: anchorPos.mouseY, left: anchorPos.mouseX }
            : undefined
        }
        aria-hidden={false}
      >
        <CharacterMenuItems charas={charas} onItemClick={handleItemClick} />
      </Menu>
    </div>
  );
}

function CharacterMenuItems({ charas, onItemClick }) {
  return (
    <>
      {charas
        .filter(c => !c.isFound)
        .map(c => (
          <MenuItem key={c.id} onClick={() => onItemClick(c.id)}>
            {c.name}
          </MenuItem>
        ))
      }
    </>
  );
}

const getPercentCoords = (event) => {
  const rect = event.currentTarget.getBoundingClientRect();

  return {
    x: ((event.clientX - rect.left) / rect.width) * 100,
    y: ((event.clientY - rect.top) / rect.height) * 100
  };
}