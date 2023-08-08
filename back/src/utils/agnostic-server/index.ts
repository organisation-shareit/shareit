import { z } from 'zod';

type ResponseSchema = Record<number | string, z.ZodType>;

export type HandlerResult<Responses extends ResponseSchema> = {
  [Status in keyof Responses]: {
    status: Status;
    body: z.infer<Responses[Status]>;
  };
}[keyof Responses];

export type Handler<
  Payload extends z.ZodType,
  Metadata extends z.ZodType,
  Responses extends ResponseSchema,
> = (payload: z.infer<Payload>, metadata: z.infer<Metadata>) => Promise<HandlerResult<Responses>>;
