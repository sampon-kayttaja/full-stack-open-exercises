import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";
import loginService from "../services/login";
import persistentUserService from "../services/persistentUser";

const getStoredUser = () => {
  const loggedUserJSON = persistentUserService.getUser();
  if (!loggedUserJSON) return null;
  const user = JSON.parse(loggedUserJSON);
  blogService.setToken(user.token);
  return user;
};

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getStoredUser,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      persistentUserService.saveUser(user);
      blogService.setToken(user.token);
      queryClient.setQueryData(["user"], user);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    persistentUserService.removeUser();
    blogService.setToken(null);
    queryClient.setQueryData(["user"], null);
  };
};
