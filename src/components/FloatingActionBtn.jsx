import * as React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

export function FloatingActionBtn() {
  return (
      <Link to='/articles/upload'><Fab size="large" color="primary" aria-label="add">
        <AddIcon />
      </Fab>
      </Link>
  );
}