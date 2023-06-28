import PropTypes from 'prop-types';
import { Box, ButtonBase } from '@mui/material';
import { Link } from 'react-router-dom';

export const DocSideNavItem = (props) => {
  const { active = false, disabled, external, icon, path, title } = props;
  const queryParams = new URLSearchParams(window.location.search)
  const sheetId = queryParams.get('sheet')

  const linkProps = path
    ? external
      ? {
        component: Link,
        to: path,
        target: '_blank'
      }
      : {
        component: Link,
        to: path
      }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: 'center',
          borderRadius: 1,
          display: 'flex',
          justifyContent: 'flex-start',
          pl: '16px',
          pr: '16px',
          py: '6px',
          textAlign: 'left',
          width: '100%',
          ...(active && {
            backgroundColor: 'rgba(99, 101, 241, 0.07)'
          }),
          '&:hover': {
            backgroundColor: 'rgba(99, 101, 241, 0.07)'
          }
        }}
        disableRipple
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: 'center',
              color: 'neutral.400',
              display: 'inline-flex',
              justifyContent: 'center',
              mr: 2,
              ...(active && {
                color: 'primary.main'
              })
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: 'neutral.400',
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: '24px',
            whiteSpace: 'nowrap',
            ...(active && {
              color: 'primary.main'
            }),
            ...(disabled && {
              color: 'neutral.500'
            })
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};

DocSideNavItem.propTypes = {
  active: PropTypes.bool,
  disabled: PropTypes.bool,
  external: PropTypes.bool,
  icon: PropTypes.node,
  path: PropTypes.string,
  title: PropTypes.string.isRequired
};
