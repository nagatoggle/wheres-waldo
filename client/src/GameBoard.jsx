import { useState } from 'react';
import { Menu, MenuItem, Box } from '@mui/material';

export default function GameBoard({ charas, onSelect, boardUrl }) {
  const [anchorPos, setAnchorPos] = useState(null);
  const [clickCoords, setClickCoords] = useState({ x: 0, y: 0 });

  const handleClick = (event) => {
    event.preventDefault();

    setAnchorPos(
      anchorPos === null
        ? { mouseX: event.clientX, mouseY: event.clientY }
        : null,
    );

    const naturalPos = getNaturalCoords(event);
    setClickCoords(naturalPos);
  };

  const handleItemClick = (charaId) => {
    onSelect(charaId, clickCoords.x, clickCoords.y);
    handleClose();
  }

  const handleClose = () => {
    setAnchorPos(null);
  };

  return (
    <>
      <Box
        component='img'
        src={boardUrl}
        alt='game board'
        onClick={handleClick}
        sx={{
          display: 'block',
          width: '100%',
          cursor: 'crosshair',
        }}
      />

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
    </>
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

const getNaturalCoords = (evt) => {
  const rect = evt.currentTarget.getBoundingClientRect();

  const clickPos = {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  }

  const displaySize = {
    width: rect.width,
    height: rect.height
  }

  const naturalSize = {
    width: evt.currentTarget.naturalWidth,
    height: evt.currentTarget.naturalHeight
  }

  return {
    x: Math.round(clickPos.x * (naturalSize.width / displaySize.width)),
    y: Math.round(clickPos.y * (naturalSize.height / displaySize.height))
  }
}