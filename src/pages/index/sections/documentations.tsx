import { Button, Box, Card, Checkbox, SvgIcon, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography, Stack } from '@mui/material'
import { Scrollbar } from '../../../components/scrollbar'
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon'
import TrashIcon from '@heroicons/react/24/solid/TrashIcon'
import { useNavigate } from 'react-router-dom'
import { useDocumentationContext } from '../../../contexts/DocumentationContext'
import DocumentPlusIcon from '@heroicons/react/24/solid/DocumentPlusIcon'

export const CustomersTable = (props) => {
  const navigate = useNavigate()
  const { deleteDocumentation } = useDocumentationContext()

  const { count = 0, items = [], onDeselectAll, onDeselectOne, onPageChange = () => {}, onRowsPerPageChange, onSelectAll, onSelectOne, page = 0, rowsPerPage = 0, selected = [] } = props
  const selectedSome = selected.length > 0 && selected.length < items.length
  const selectedAll = items.length > 0 && selected.length === items.length

  const handleSubmit = async (documentationId: string) => {
    await deleteDocumentation(documentationId)
  }

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', flexDirection: 'row'}}>
        <Typography variant="h4" sx={{ marginRight: 5}}>My Documentations</Typography>
        <Button
          color="primary"
          startIcon={
            <SvgIcon fontSize="small">
              <DocumentPlusIcon />
            </SvgIcon>
          }
          size="medium"
          variant="outlined"
          onClick={() => {
            navigate('/createDoc')
          }}
        >
          Create Documentation
        </Button>
      </Box>

      <Card>
        <Scrollbar>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedAll}
                      indeterminate={selectedSome}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onSelectAll?.()
                        } else {
                          onDeselectAll?.()
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>Alias</TableCell>
                  <TableCell>Documentation ID</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((doc) => {
                  const isSelected = selected.includes(doc.documentationId)

                  return (
                    <TableRow hover key={doc.documentationId} selected={isSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isSelected}
                          onChange={(event) => {
                            if (event.target.checked) {
                              onSelectOne?.(doc.documentationId)
                            } else {
                              onDeselectOne?.(doc.documentationId)
                            }
                          }}
                        />
                      </TableCell>
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
                          onClick={() => {
                            navigate(`/documentation/overview/${doc.documentationId}`)
                          }}
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
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={count}
          onPageChange={onPageChange}
          onRowsPerPageChange={onRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Card>
    </Stack>
  )
}
