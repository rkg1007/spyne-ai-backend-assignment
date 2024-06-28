import { Injectable } from '@nestjs/common';
import { ResultSetHeader } from 'mysql2';
import { DatabaseProvider } from 'src/common/providers/database.provider';

@Injectable()
export class AuthRepository {
  constructor(private readonly databaseProvider: DatabaseProvider) {}

  async getUser(email: string, phone: string) {
    const query = `SELECT * FROM users WHERE email = ? OR phone = ?`;
    const results = await this.databaseProvider.query(query, [email, phone]);
    return results[0];
  }

  async register(registerUserDto: any) {
    const { email, phone, password } = registerUserDto;
    const query = `INSERT INTO users (email, phone, password) VALUES (?, ?, ?)`;
    const results = (await this.databaseProvider.query(query, [
      email,
      phone,
      password,
    ])) as ResultSetHeader;
    return results.insertId;
  }
}
