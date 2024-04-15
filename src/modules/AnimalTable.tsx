import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteAnimal, getAnimals, updateAnimal } from "../services/api";
import { Animal } from "../types/Animal";
import { useMemo, useState } from "react";
import {
  Button,
  Paper,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";
import AutocompleteFilter from "../components/Autocomplete";
import SortSelect from "../components/SortSelect";
import Spinner from "../components/Spinner";
import UpdateCheckupModal from "../components/UpdateCheckupModal";
import ToastNotification from "../components/ToastNotification";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
  borderBottom: `2px solid ${theme.palette.primary.dark}`,
}));

const AnimalTable = () => {
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [selectedAnimalId, setSelectedAnimalId] = useState<string | null>(null);
  const [deletingAnimalId, setDeletingAnimalId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>("");
  const [toastMessage, setToastMessage] =
    useState<string>("An error occurred!");
  const [openToast, setOpenToast] = useState(false);

  const {
    data: animals,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["getAnimals"],
    queryFn: getAnimals,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAnimal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAnimals"] });
    },
  });

  const updateMutation = useMutation<
    void,
    Error,
    { id: string; animal: Partial<Animal> }
  >({
    mutationFn: async ({ id, animal }) => {
      await updateAnimal(id, animal);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAnimals"] });
    },
  });

  const handleTypeChange = (
    event: React.ChangeEvent<{}>,
    value: string | null
  ) => {
    setFilter(value);
  };

  const handleSortByChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleOpenModal = (animalId: string) => {
    setSelectedAnimalId(animalId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedAnimalId(null);
    setOpenModal(false);
  };

  const handleOpenToast = (message: string) => {
    setToastMessage(message);
    setOpenToast(true);
  };

  const handleCloseToast = () => {
    setOpenToast(false);
  };
  const handleUpdateCheckup = async (newCheckupDate: Date | null) => {
    if (selectedAnimalId && newCheckupDate) {
      const currentDate = new Date();
      if (newCheckupDate < currentDate) {
        handleOpenToast(
          "Selected date cannot be earlier than the current date"
        );
        return;
      }

      try {
        await updateMutation.mutateAsync({
          id: selectedAnimalId,
          animal: {
            next_checkup: newCheckupDate.toISOString(),
          },
        });
      } catch (error) {
        handleOpenToast("Something has gone wrong while updating the date.");
      }
    }
  };

  const filteredAnimals = useMemo(() => {
    let filtered = animals || [];
    if (filter) {
      filtered = filtered.filter((animal) => animal.type === filter);
    }
    if (sortBy === "type") {
      filtered.sort((a, b) => a.type.localeCompare(b.type));
    } else if (sortBy === "age") {
      filtered.sort((a, b) => a.age - b.age);
    }
    return filtered;
  }, [animals, filter, sortBy]);

  return (
    <div>
      <div className="form-control">
        <AutocompleteFilter
          animals={animals || []}
          selectedType={filter}
          handleTypeChange={handleTypeChange}
        />
        <SortSelect sortBy={sortBy} handleSortByChange={handleSortByChange} />
      </div>
      {isPending && <Spinner />}
      {isError && <span>Error: {error.message}</span>}
      {!isPending && !isError && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Age</StyledTableCell>
                <StyledTableCell align="center">Next Checkup</StyledTableCell>
                <StyledTableCell align="center" colSpan={2}>
                  Actions
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredAnimals.map((animal) => (
                <TableRow key={animal.id}>
                  <TableCell align="center">{animal.type}</TableCell>
                  <TableCell align="center">{animal.name}</TableCell>
                  <TableCell align="center">{animal.age}</TableCell>
                  <TableCell align="center">
                    {new Date(animal.next_checkup)
                      .toISOString()
                      .substring(0, 10)}
                  </TableCell>
                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleOpenModal(animal.id)}
                      sx={{ marginRight: 2, minWidth: 128 }}
                    >
                      Update
                    </Button>
                    {deletingAnimalId === animal.id &&
                    deleteMutation.isPending ? (
                      <Spinner />
                    ) : (
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                          setDeletingAnimalId(animal.id);
                          deleteMutation.mutate(animal.id);
                        }}
                        sx={{ minWidth: 128 }}
                      >
                        Delete
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <UpdateCheckupModal
        open={openModal}
        onClose={handleCloseModal}
        onUpdate={handleUpdateCheckup}
      />
      <ToastNotification
        open={openToast}
        onClose={handleCloseToast}
        message={toastMessage}
      />
    </div>
  );
};

export default AnimalTable;
