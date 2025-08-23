import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { MueblesMarceloService } from 'src/database/muebles_marcelo/muebles_marcelo.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly users : MueblesMarceloService
  ){}

  usersAll(createUserDto) {
    return this.users.findAll();
  }
}
