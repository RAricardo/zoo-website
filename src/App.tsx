import Box from "@mui/material/Box";
import "./styles.css";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PetsIcon from "@mui/icons-material/Pets";
import AnimalTable from "./modules/AnimalTable";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="body">
      <Container>
        <Box sx={{ maxWidth: "800px", margin: "auto", marginY: 10 }}>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h2" component="h1" gutterBottom>
              Zoo
              <Box component="span" color="primary.main">
                <PetsIcon fontSize="large" />
              </Box>
              Animals
            </Typography>
          </Box>

          <QueryClientProvider client={queryClient}>
            <AnimalTable />
          </QueryClientProvider>
        </Box>
      </Container>
    </div>
  );
}

export default App;
