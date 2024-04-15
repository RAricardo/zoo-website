import axios from "axios";
import { Animal } from "../types/Animal";

const API_BASE_URL = "https://65f394fe105614e654a0ac9d.mockapi.io/api/v1/";
const ANIMALS_ENDPOINT = "animals";

export const getAnimals = async (): Promise<Animal[]> => {
  try {
    const response = await axios.get<Animal[]>(
      `${API_BASE_URL}${ANIMALS_ENDPOINT}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching animals:", error);
    throw error;
  }
};

export const deleteAnimal = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_BASE_URL}${ANIMALS_ENDPOINT}/${id}`);
  } catch (error) {
    console.error(`Error deleting animal with ID ${id}:`, error);
    throw error;
  }
};

export const updateAnimal = async (
  id: string,
  updatedAnimal: Partial<Animal>
): Promise<Animal> => {
  try {
    const response = await axios.put<Animal>(
      `${API_BASE_URL}${ANIMALS_ENDPOINT}/${id}`,
      updatedAnimal
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating animal with ID ${id}:`, error);
    throw error;
  }
};
