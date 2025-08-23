import { Injectable } from '@nestjs/common';
import { UsersModel } from './schemas/users.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class MueblesMarceloService {
    constructor(
        @InjectModel(UsersModel,'muebles_marcelo')
        private readonly usersModel: typeof UsersModel
    ){}

    async findAll() {
        const response = await this.usersModel.findAll();
        return response;
    }
}
