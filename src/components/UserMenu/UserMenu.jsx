import { useState } from 'react';
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { Link } from 'react-router-dom'


const UserMenu = () => {
  const { setIsAuth, setToken } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState(null);

  const logout = () => {
    setIsAuth(false)
    setToken('')
    localStorage.removeItem('access_token')
    localStorage.removeItem('currentPath')
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick} color="inherit">
        <Avatar src='https://cdn-icons-png.flaticon.com/512/3135/3135768.png'>
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link style={{ color: 'inherit' }} to='/profile'>
          <MenuItem onClick={handleClose}>Профіль</MenuItem>
        </Link>
        <Link style={{ color: 'inherit' }} to='/settings'>
          <MenuItem onClick={handleClose}>Налаштування</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            logout()
            handleClose()
          }}>
          Вийти
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
