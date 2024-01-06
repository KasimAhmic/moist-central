import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const MONEY_GIVEAWAY_TABLE_NAME = 'money_giveaway';

export class InitialSetup1704510060959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const moneyGiveawayTable = new Table({
      name: MONEY_GIVEAWAY_TABLE_NAME,
      columns: [
        { name: 'id', type: 'text', isPrimary: true, isUnique: true, isNullable: false },
        { name: 'amount', type: 'real', isNullable: false },
        { name: 'platform', type: 'text', isNullable: false },
        { name: 'username', type: 'text', isNullable: false },
        { name: 'description', type: 'text', isNullable: false },
        { name: 'paypal_email', type: 'text', isNullable: false },
        { name: 'created_on', type: 'integer', isNullable: false },
      ],
      checks: [{ name: 'check_platform', expression: `platform IN ('twitch', 'youtube')` }],
      indices: [
        { name: 'id_idx', columnNames: ['id'] },
        { name: 'user_idx', columnNames: ['platform', 'username', 'paypal_email'] },
      ],
    });

    await queryRunner.createTable(moneyGiveawayTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(MONEY_GIVEAWAY_TABLE_NAME);
  }
}
