import { z } from 'zod'

export const loginResponse = z.object({
    token: z.string(),
    instanceId: z.string(),
    message: z.string(),
})
export type LoginResponse = z.infer<typeof loginResponse>

export const createDocumentationResponse = z.object({
  token: z.string(),
  instanceId: z.string(),
  message: z.string(),
})
export type CreateDocumentationResponse = z.infer<typeof createDocumentationResponse>