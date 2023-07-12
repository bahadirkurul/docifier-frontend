import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material'
// import { OverviewLatestOrders } from '../sections/overview/documentations';
import { useCallback, useState, useMemo } from 'react'
import { useDocumentationContext } from '../../contexts/DocumentationContext'
import { CustomersTable } from './sections/documentations'
import { applyPagination } from '../../utils/apply-pagination'
import { useSelection } from '../../hooks/use-selection'

const useDocumentations = (data, page, rowsPerPage) => {
  return useMemo(
    () => {
      return applyPagination(data, page, rowsPerPage);
    },
    [data, page, rowsPerPage]
  );
};

const useDocumentationIds = (documentations) => {
  return useMemo(
    () => {
      return documentations.map((documentation) => documentation.documentationId);
    },
    [documentations]
  );
};

const Homepage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { userDocumentations } = useDocumentationContext()
  const documentations = useDocumentations(userDocumentations, page, rowsPerPage);
  const documentationIds = useDocumentationIds(documentations);
  const documentationsSelection = useSelection(documentationIds as any);

  const handlePageChange = useCallback(
    (event, value) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <Box
      component="main"
      sx={{
        backgroundColor: 'background.default',
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} md={12} lg={12}>
            <CustomersTable
              count={userDocumentations.length}
              items={documentations as any}
              onDeselectAll={documentationsSelection.handleDeselectAll}
              onDeselectOne={documentationsSelection.handleDeselectOne}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              onSelectAll={documentationsSelection.handleSelectAll}
              onSelectOne={documentationsSelection.handleSelectOne}
              page={page}
              rowsPerPage={rowsPerPage}
              selected={documentationsSelection.selected}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Homepage

