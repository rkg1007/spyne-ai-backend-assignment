import { Inject, Injectable } from '@nestjs/common';
import { Pool, Connection } from 'mysql2/promise';

@Injectable()
export class DatabaseProvider {
  constructor(@Inject('DATABASE_POOL') private readonly pool: Pool) {}

  async query(sql: string, params: any[]) {
    const [results] = await this.pool.query(sql, params);
    return results;
  }

  async transaction(
    transactionFunction: (connection: Connection) => Promise<void>,
  ) {
    const connection = await this.pool.getConnection();
    try {
      await connection.beginTransaction();
      const result = await transactionFunction(connection);
      await connection.commit();
      return result;
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
