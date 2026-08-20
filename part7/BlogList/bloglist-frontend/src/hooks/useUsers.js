import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import userService from "../services/users";

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userService.getAll,
  });
};
