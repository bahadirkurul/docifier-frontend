import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography,
  } from "@mui/material";
  
  
  const avatarStyle = {
    backgroundColor: "#3f51b5",
    height: 56,
    width: 56,
  };
  
  const courseListStyle = {
    border: "1px solid #ccc",
    borderRadius: "4px",
    padding: "8px",
    margin: "16px 0",
  };
  
  export const AccountProfile = ({ auth }) => {
  
    return (
      <Card
        style={{
          height: "100%",
        }}
      >
        <CardContent>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar style={avatarStyle}>SK</Avatar>
            <Typography gutterBottom variant="h5">
              {'B'} {'K'}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {'BU'}
            </Typography>
            <Typography color="text.secondary" variant="body2">
              {'ID'}
            </Typography>
          </Box>
        </CardContent>
  
        <CardContent>
          <Typography variant="h6">Courses</Typography>
          <Box style={courseListStyle}>
  
          </Box>
        </CardContent>
      </Card>
    );
  };
  