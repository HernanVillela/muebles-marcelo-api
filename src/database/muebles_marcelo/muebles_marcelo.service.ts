import { Injectable } from '@nestjs/common';
import { UsersModel } from './schemas/users.model';
import { InjectModel } from '@nestjs/sequelize';
import { UpdateUsers } from 'src/routes/admin/dto/users.dto';
import { RolesModel } from './schemas/roles.model';
import { UpdateRoles } from 'src/routes/admin/dto/roles.dto';
import { MaterialsModel } from './schemas/materials.model';

@Injectable()
export class MueblesMarceloService {
    constructor(
        @InjectModel(UsersModel,'muebles_marcelo')
        private readonly usersModel: typeof UsersModel,

        @InjectModel(RolesModel,'muebles_marcelo')
        private readonly rolesModel: typeof RolesModel,

        @InjectModel(MaterialsModel,'muebles_marcelo')
        private readonly materialsModel: typeof MaterialsModel
    ){}

    async getUsers(params) : Promise<UsersModel[]> {
        let where : any = {}

        for(let index in params) {
            if(params[index]){
                where[index] = params[index]
            }
        }

        return await this.usersModel.findAll({where, raw: true})
    }

    async createUsers(params) : Promise<UsersModel> {
        return await this.usersModel.create(params)
    }

    async updateUsers(user_id: number, params: UpdateUsers) : Promise<number[]> {
        const response = await this.usersModel.update(params, {
            where: { id: user_id },
        });
        return response;
    }




    async getRoles(params) : Promise<RolesModel[]> {
        let where : any = {}

        for(let index in params) {
            if(params[index]){
                where[index] = params[index]
            }
        }

        return await this.rolesModel.findAll({where, raw: true})
    }

    async createRoles(params) : Promise<RolesModel> {
        return await this.rolesModel.create(params)
    }

    async updateRoles(user_id: number, params: UpdateRoles) : Promise<number[]> {
        const response = await this.rolesModel.update(params, {
            where: { id: user_id },
        });
        return response;
    }





    async getMaterials(params) : Promise<MaterialsModel[]> {
        let where : any = {}

        for(let index in params) {
            if(params[index]){
                where[index] = params[index]
            }
        }

        return await this.materialsModel.findAll({where, raw: true})
    }

    async createMaterials(params) : Promise<MaterialsModel> {
        return await this.materialsModel.create(params)
    }

    async updateMaterials(user_id: number, params: UpdateRoles) : Promise<number[]> {
        const response = await this.materialsModel.update(params, {
            where: { id: user_id },
        });
        return response;
    }
}
