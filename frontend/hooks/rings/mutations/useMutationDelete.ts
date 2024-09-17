﻿import { iRing } from "@/app/home/forgeRing/schemas/ring-schema";
import request, { iResponse } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

async function deleteRing(id: string) {
  const response: iResponse<iRing> = await request({
    path: `rings/delete/${id}`,
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!response.success) {
    toast.error("Erro ao banir o anel", {
      duration: 5000,
      description: response.message,
      closeButton: true,
    });
    return false;
  }

  return response.data;
}

export default function useMutationDelete() {
  return useMutation({
    mutationKey: ["deleteRing"],
    mutationFn: (id: string) => deleteRing(id),
    onSuccess: (data) => {
      if (data) {
        toast.success("Anel banido com sucesso", {
          duration: 5000,
          closeButton: true,
        });

        return data;
      }
    },
    onError: () => {
      toast.error("Erro ao banir o anel", {
        duration: 5000,
        closeButton: true,
      });

      return false;
    },
  });
}
