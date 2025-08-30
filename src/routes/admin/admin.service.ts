import { Injectable } from '@nestjs/common';
import { GetUsers, UpdateUsers } from './dto/users.dto';
import { MueblesMarceloService } from 'src/database/muebles_marcelo/muebles_marcelo.service';

@Injectable()
export class AdminService {
    constructor(
        private readonly mueblesMarceloService : MueblesMarceloService
    ){}

    getUsers(params: GetUsers) {
        return this.mueblesMarceloService.getUsers(params);
    }

    createUsers(params) {
        return this.mueblesMarceloService.createUsers(params);
    }

    updateUsers(user_id: number, params: UpdateUsers) {
        return this.mueblesMarceloService.updateUsers(user_id, params)
    }



    getRoles(params: GetUsers) {
        return this.mueblesMarceloService.getRoles(params);
    }

    createRoles(params) {
        return this.mueblesMarceloService.createRoles(params);
    }

    updateRoles(user_id: number, params: UpdateUsers) {
        return this.mueblesMarceloService.updateRoles(user_id, params)
    }
}
