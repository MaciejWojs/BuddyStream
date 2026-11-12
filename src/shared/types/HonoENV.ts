export type JwtPayload = {
  sub: string;
};

export type ENV = {
  Variables: {
    'jwt-payload': JwtPayload | undefined;
  };
};
