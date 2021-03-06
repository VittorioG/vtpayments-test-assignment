"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permissions_entity_1 = require("./permissions.entity");
const permissions_service_1 = require("./permissions.service");
const user_permission_entity_1 = require("./user-permission.entity");
const permissions_resolver_1 = require("./permissions.resolver");
let PermissionsModule = class PermissionsModule {
};
PermissionsModule = __decorate([
    common_1.Global(),
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([permissions_entity_1.Permission, user_permission_entity_1.UserPermission])],
        providers: [permissions_service_1.PermissionsService, permissions_resolver_1.PermissionsResolver],
        exports: [permissions_service_1.PermissionsService],
    })
], PermissionsModule);
exports.PermissionsModule = PermissionsModule;
//# sourceMappingURL=permissions.module.js.map