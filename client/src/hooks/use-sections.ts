import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

export function useSections() {
  return useQuery({
    queryKey: [api.sections.list.path],
    queryFn: async () => {
      const res = await fetch(api.sections.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch sections");
      return api.sections.list.responses[200].parse(await res.json());
    },
  });
}
