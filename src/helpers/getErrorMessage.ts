import axios, { AxiosError } from "axios";

// Helper para extraer un mensaje de error seguro de una respuesta de Axios.
// Evita que el frontend se rompa cuando `error.response` no existe.
export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string }>;
    return axiosError.response?.data?.message ?? axiosError.message ?? "Error desconocido";
  }
  if (error instanceof Error) return error.message;
  return "Error desconocido";
}
