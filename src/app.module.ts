import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ProductModule } from './product/product.module';
import { UploadController } from './upload/upload.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'nest-events',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    AuthModule,
    CommonModule,
    RoleModule,
    PermissionModule,
    ProductModule,
  ],
  controllers: [UploadController],
})
export class AppModule {}
