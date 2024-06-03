import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Home() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMouseEnter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleMenuLeave = (event) => {
    // Check if the mouse has entered the menu
    const menuElement = event.currentTarget;
    if (!menuElement.contains(event.relatedTarget)) {
      setAnchorEl(null);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Home</h1>
      <div>
        <Button
          onMouseEnter={handleMouseEnter}
          aria-controls="simple-menu"
          aria-haspopup="true"
        >
          All Categories
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMouseLeave}
          MenuListProps={{
            onMouseLeave: handleMenuLeave,
          }}
        >
          <MenuItem onClick={handleMouseLeave}>Biology</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Business</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Chemistry</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Computer Science</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Culinary</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Engineering</MenuItem>
          <MenuItem onClick={handleMouseLeave}>English</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Math</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Music</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Performing Arts</MenuItem>
          <MenuItem onClick={handleMouseLeave}>PE, Health, Driver's Ed</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Physics</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Psychology</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Social Studies</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Visual Arts</MenuItem>
          <MenuItem onClick={handleMouseLeave}>French</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Mandarin</MenuItem>
          <MenuItem onClick={handleMouseLeave}>Spanish</MenuItem>
        </Menu>
        <form method="POST">
          <label htmlFor="search">Search</label> <br />
          <input type="text" id="search"></input>
        </form>
      </div>

      <div>
        <p>Biology</p>
      </div>

      <div>
        <p>Business</p>
      </div>

      <div>
        <p>Chemistry</p>
      </div>

    </div>
  );
}
