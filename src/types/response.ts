export type Response<Entity> = {
  isError: boolean;
  data?: Entity;
};
