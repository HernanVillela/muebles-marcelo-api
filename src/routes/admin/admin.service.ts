import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { GetUsers, UpdateUsers } from './dto/users.dto';
import { MueblesMarceloService } from 'src/database/muebles_marcelo/muebles_marcelo.service';
import { GetRoles, UpdateRoles } from './dto/roles.dto';
import { CreateMaterials, GetMaterials, UpdateMaterials } from './dto/materials.dto';

@Injectable()
export class AdminService {
    constructor(
        private readonly mueblesMarceloService : MueblesMarceloService
    ){}

    getUsers(params: GetUsers) {
        return this.mueblesMarceloService.getUsers(params)
        .catch(err => {
            throw new InternalServerErrorException('Error al encontrar el usuario.')
        })
    }

    async createUsers(params: GetUsers) {

        // validacion de nombre de usuario
        let userName = await this.mueblesMarceloService.getUsers({name: params.name})
        let userRole = await this.mueblesMarceloService.getRoles({id: params.role_id})
        let userEmail = await this.mueblesMarceloService.getUsers({email: params.email})

        if(userName.length > 0 || userEmail.length > 0 || userRole.length == 0){
            throw new ConflictException('Error en los datos proporcionados.')
        }

        return this.mueblesMarceloService.createUsers(params)
        .catch(err => {
            throw new InternalServerErrorException('Error al crear el usuario.')
        })
    }

    updateUsers(user_id: number, params: UpdateUsers) {
        return this.mueblesMarceloService.updateUsers(user_id, params)
        .then(result => {
            if(result[0] == 0){
                throw new NotFoundException('No se ha podido actualizar el usuario')
            }
        })
        .catch(err => {
            throw new InternalServerErrorException('Error al actualizar el usuario.')
        })
    }



    getRoles(params: GetRoles) {
        return this.mueblesMarceloService.getRoles(params)
        .catch(err => {
            throw new InternalServerErrorException('Error al encontrar el rol.')
        })
    }

    async createRoles(params: GetRoles) {
        let roles = await this.mueblesMarceloService.getRoles({name: params.name})

        if(roles.length > 0){
            throw new ConflictException('Error en los datos proporcionados.')
        }

        return this.mueblesMarceloService.createRoles(params)
        .catch(err => {
            throw new InternalServerErrorException('Error al crear el rol.')
        })
    }

    updateRoles(user_id: number, params: UpdateRoles) {
        return this.mueblesMarceloService.updateRoles(user_id, params)
        .then(result => {
            if(result[0] == 0){
                throw new NotFoundException('The record could not be updated')
            }
        })
        .catch(err => {
            throw new InternalServerErrorException('Error al actualizar el rol.')
        })
    }






    getMaterials(params: GetMaterials) {
        return this.mueblesMarceloService.getMaterials(params)
        .catch(err => {
            throw new InternalServerErrorException('Error al encontrar el rol.')
        })
    }

    async createMaterials(params: CreateMaterials) {
        let roles = await this.mueblesMarceloService.getMaterials({name: params.name})

        if(roles.length > 0){
            throw new ConflictException('Error en los datos proporcionados.')
        }

        return this.mueblesMarceloService.createMaterials(params)
        .catch(err => {
            throw new InternalServerErrorException('Error al crear el materiales.')
        })
    }

    updateMaterials(user_id: number, params: UpdateMaterials) {
        return this.mueblesMarceloService.updateMaterials(user_id, params)
        .then(result => {
            if(result[0] == 0){
                throw new NotFoundException('The record could not be updated')
            }
        })
        .catch(err => {
            throw new InternalServerErrorException('Error al actualizar el material.')
        })
    }
}
