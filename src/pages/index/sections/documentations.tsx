import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import TrashIcon from '@heroicons/react/24/solid/TrashIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { Scrollbar } from '../../../components/scrollbar';
import { useNavigate } from 'react-router-dom';
import { useDocumentationContext } from '../../../contexts/DocumentationContext';

export const OverviewLatestOrders = (props) => {
  const { docs = [], sx } = props;
  const navigate = useNavigate();
  const { deleteDocumentation } = useDocumentationContext();

  const handleSubmit = async (documentationId: string) => {
    await deleteDocumentation(documentationId)

    window.location.reload()
  }

  return (
    <Card sx={sx}>
      <CardHeader title="My Documentations" />

      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Documentation ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {docs.map((doc) => {
                return (
                  <TableRow hover key={doc.documentationId}>
                    <TableCell>
                      <Button
                        color="primary"
                        endIcon={
                          <SvgIcon fontSize="small">
                            <ArrowRightIcon />
                          </SvgIcon>
                        }
                        size="small"
                        variant="text"
                        onClick={() => { navigate(`/docs/overview/${doc.documentationId}`) }}
                      >
                        {doc.alias}
                      </Button>
                    </TableCell>
                    <TableCell>{doc.documentationId}</TableCell>
                    <TableCell>
                      <Button
                        color="inherit"
                        endIcon={
                          <SvgIcon fontSize="small">
                            <TrashIcon />
                          </SvgIcon>
                        }
                        size="small"
                        variant="text"
                        onClick={() => {
                          handleSubmit(doc.documentationId)
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
              {docs.length === 0 && <Typography>You dont have any documentations yet.</Typography>}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          }
          size="small"
          variant="text"
          onClick={() => { navigate('/createDoc') }}
        >
          Create Documentation
        </Button>
      </CardActions>
    </Card>
  )
};

OverviewLatestOrders.prototype = {
  orders: PropTypes.array,
  sx: PropTypes.object
};
