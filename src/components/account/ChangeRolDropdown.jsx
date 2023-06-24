import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

// Material UI
import {
  TextField, Button, ButtonGroup, ClickAwayListener, Grow,
  Paper, Popper, MenuItem, MenuList, Autocomplete,
  useTheme,
  Tooltip,
} from '@mui/material';
import { Box } from '@mui/system';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

// Context
import { useDialogContext } from '../../context/ui/DialogProvider';
import { useSnackbarContext } from '../../context/ui/SnackbarProvider';
import { useAuthContext } from '../../context/AuthProvider';
import { useNotificationContext } from '../../context/NotificationProvider';

// Api
import useUser from '../../api/user';

function getFilterOptions(options, selectedEmployee) {
  const filteredOptions = options.filter((option) => selectedEmployee.role !== option);
  return filteredOptions;
}

export default function ChangeRolDropdown({ handleEmployeeData, employeeData }) {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedEmployee, setSelectedEmployee] = useState({
    email: '',
  });
  const [autoCompleteInputValue, setAutoCompleteInputValue] = useState('');
  const anchorRef = useRef(null);
  const options = ['admin', 'employee', 'warehouseman', 'unemployed'];
  const [filteredOptions, setFilteredOptions] = useState(options);

  // context
  const { forceUpdateNotifications } = useNotificationContext();
  const { t } = useTranslation();
  const { handleDialog } = useDialogContext();
  const { verify, currentUser } = useAuthContext();
  const { handleSnackbar } = useSnackbarContext();
  const userApi = useUser();
  const theme = useTheme();

  const changeRole = async () => {
    try {
      const role = filteredOptions[selectedIndex];
      const { email } = selectedEmployee;
      await userApi.promote({ email, role });
      handleEmployeeData();
      await verify();
    } catch (e) {
      handleSnackbar({
        content: e.message,
        severity: 'error',
      });
    }
    // forceUpdateNotifications();
  };

  const checkBeforeChangeRole = () => {
    if (selectedEmployee.email === currentUser.email) {
      handleDialog({
        title: t('ChangeRole'),
        content: t('Are you sure you want to change your own role?'),
        confirmText: t('CHANGEROLE'),
        ifErrorText: t('RoleChangeFailed'),
        ifSuccessText: 'Successfully changed your own role',
        onConfirm: changeRole,
      });
      return false;
    }
    changeRole();
    return true;
  };

  const handleClick = () => {
    const showSnackbar = checkBeforeChangeRole();
    if (showSnackbar) {
      handleSnackbar({
        content: `Successfully changed role of ${selectedEmployee.email} to ${filteredOptions[selectedIndex]}`,
        severity: 'success',
      });
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setFilteredOptions(getFilterOptions(options, selectedEmployee));
  }, [selectedEmployee]);

  return (
    <>
      <h3>{t('ChangeRole')}</h3>
      <p>{t('ChangeTheRoleOfAnEmployeeOrAllowAnAccountToJoinTheCompany')}</p>
      <Box>
        <Autocomplete
          onChange={(event, employee) => {
            setSelectedEmployee(employee || {});
          }}
          inputValue={autoCompleteInputValue}
          onInputChange={(event, newAutoCompleteInputValue) => {
            setAutoCompleteInputValue(newAutoCompleteInputValue);
          }}
          options={employeeData}
          getOptionLabel={(option) => option.email}
          sx={
            {
              margin: 'auto',
              [theme.breakpoints.down('md')]: {
                width: '80%',
              },
              [theme.breakpoints.down('sm')]: {
                width: '90%',
              },
              [theme.breakpoints.up('md')]: {
                width: '50%',
              },
            }
          }
          renderInput={(params) => <TextField {...params} label="email" />}
        />
      </Box>
      <Tooltip title={selectedEmployee.email ? `Change ${selectedEmployee.email} role to ${filteredOptions[selectedIndex]}` : 'First select an email to change the role'} disabled={!selectedEmployee.email}>
        <ButtonGroup sx={{ m: 2 }} variant="contained" ref={anchorRef} aria-label="split button" disabled={!selectedEmployee.email}>
          <Button onClick={handleClick}>{filteredOptions[selectedIndex]}</Button>
          <Button
            size="small"
            aria-controls={open ? 'split-button-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
          >
            <ArrowDropDownIcon />
          </Button>
        </ButtonGroup>
      </Tooltip>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {filteredOptions.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}