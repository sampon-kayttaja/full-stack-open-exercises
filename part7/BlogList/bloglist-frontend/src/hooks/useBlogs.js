import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import blogService from "../services/blogs";

export const useBlogs = () => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: blogService.getAll,
  });
};

export const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.setQueryData(["blogs"], (old = []) => old.concat(newBlog));
    },
  });
};

export const useLikeBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, blog }) =>
      blogService.update(id, { ...blog, likes: blog.likes + 1 }),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs"], (old = []) =>
        old.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog)),
      );
    },
  });
};

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: blogService.remove,
    onSuccess: (_data, id) => {
      queryClient.setQueryData(["blogs"], (old = []) =>
        old.filter((b) => b.id !== id),
      );
    },
  });
};

export const useCommentBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }) => blogService.comment(id, comment),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blogs"], (old = []) =>
        old.map((b) => (b.id !== updatedBlog.id ? b : updatedBlog)),
      );
    },
  });
};
