import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [UsersModule, AuthModule, PostsModule],
  providers: [],
  controllers: [],
})
export class AppModule {}
