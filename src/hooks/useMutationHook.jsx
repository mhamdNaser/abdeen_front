import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useMutationHook = (mutationFn, key) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: key });
    },
  });

  return mutation;
};
