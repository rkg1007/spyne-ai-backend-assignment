import { Injectable } from '@nestjs/common';
import { DatabaseProvider } from 'src/common/providers/database.provider';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseProvider: DatabaseProvider) {}

  async findAll(search: string = '') {
    let query = 'SELECT id, name, email, phone FROM users';
    let params = [];

    if (search) {
      query = `SELECT id, name, email, phone FROM users WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?`;
      params = [`%${search}%`, `%${search}%`, `%${search}%`];
    }

    return this.databaseProvider.query(query, params);
  }
}
