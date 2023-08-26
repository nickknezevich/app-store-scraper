import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { User } from '@prisma/client';


@Injectable({ scope: Scope.REQUEST })
export class UserProvider {
  get user(): User {
    return this.req.user;
  }

  constructor(@Inject(REQUEST) private readonly req) {}
}