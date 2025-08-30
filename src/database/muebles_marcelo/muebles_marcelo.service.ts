import { Injectable } from '@nestjs/common';
import { UsersModel } from './schemas/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUsers } from 'src/routes/admin/dto/users.dto';
import { RolesModel } from './schemas/roles.model';

@Injectable()
export class MueblesMarceloService {
    constructor(
        @InjectModel(UsersModel,'muebles_marcelo')
        private readonly usersModel: typeof UsersModel,

        @InjectModel(RolesModel,'muebles_marcelo')
        private readonly rolesModel: typeof RolesModel
    ){}

    async getUsers(params) {
        let where : any = {}

        for(let index in params) {
            if(params[index]){
                where[index] = params[index]
            }
        }

        const response = await this.usersModel.findAll({where});
        return response;
    }

    async createUsers(params) {
        const response = await this.usersModel.create(params);
        return response;
    }

    async updateUsers(user_id: number, params: UpdateUsers) {
        const response = await this.usersModel.update(params, {
            where: { id: user_id },
        });
        return response;
    }




    async getRoles(params) {
        let where : any = {}

        for(let index in params) {
            if(params[index]){
                where[index] = params[index]
            }
        }

        const response = await this.rolesModel.findAll({where});
        return response;
    }

    async createRoles(params) {
        const response = await this.rolesModel.create(params);
        return response;
    }

    async updateRoles(user_id: number, params: UpdateUsers) {
        const response = await this.rolesModel.update(params, {
            where: { id: user_id },
        });
        return response;
    }

}
