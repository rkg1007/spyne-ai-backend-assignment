import { Injectable } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';
import { DatabaseProvider } from 'src/common/providers/database.provider';

@Injectable()
export class AuthRepository {
  constructor(private readonly databaseProvider: DatabaseProvider) {}

  async getUser(email: string, phone: string) {
    let query = `SELECT * FROM users WHERE email = ? OR phone = ?`;
    let params = [email, phone];

    if (!email) {
      query = `SELECT * FROM users WHERE phone = ?`;
      params = [phone];
    } else if (!phone) {
      query = `SELECT * FROM users WHERE email = ?`;
      params = [email];
    }

    const results = await this.databaseProvider.query(query, params);
    return results[0];
  }

  async register(registerUserDto: any) {
    const { email, phone, password } = registerUserDto;
    const params = [email, phone, password];
    const query = `INSERT INTO users (email, phone, password) VALUES (?, ?, ?)`;
    const results = (await this.databaseProvider.query(
      query,
      params,
    )) as ResultSetHeader;
    return results.insertId;
  }
}
