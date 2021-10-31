import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  findById(id: string) {
    return this.usersRepository.findOne(id);
  }

  /**
   * 保存一个用户信息
   */
  async saveUser(user: User) {
    return await this.usersRepository.save(user);
  }

  /**
   * 更新基础信息
   * @param user
   */
  async updateBaseUserInfo(user: User) {
    const oldUser = await this.usersRepository.findOneOrFail(user.id);
    return await this.usersRepository.save({
      ...oldUser,
      avatar: user.avatar,
      nickname: user.nickname,
    });
  }
}
