import { Injectable } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';
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

  async follow(followerId: string, followeeId: string) {
    const query = `SELECT * FROM followers WHERE follower_id = ? AND followee_id = ?`;
    const params = [followerId, followeeId];
    const results = (await this.databaseProvider.query(
      query,
      params,
    )) as ResultSetHeader;
    return results.insertId;
  }
}
