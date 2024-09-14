import { z } from "zod";

export const anelSchema = z.object({
	name: z.string().min(1, "O nome é obrigatório"),
	power: z.string().min(1, "O poder do anel é obrigatório"),
	bearer: z.string().min(1, "O nome do portador é obrigatório"),
	forgedBy: z.string().min(1, "O forjador do anel é obrigatório"),
	image: z.string().min(1, "A imagem é obrigatória").url("URL inválida"),
});

export type Anel = z.infer<typeof anelSchema>;
export type AnelDb = z.infer<typeof anelSchema> & { id: string };
