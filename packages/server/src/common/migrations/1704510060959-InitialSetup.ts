import { MigrationInterface, QueryRunner, Table } from 'typeorm';

const GIVEAWAYS_TABLE = 'giveaways';
const GIVEAWAY_ENTRIES_TABLE = 'giveaway_entries';

export class InitialSetup1704510060959 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const giveawaysTable = new Table({
      name: GIVEAWAYS_TABLE,
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isUnique: true,
          isNullable: false,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        { name: 'name', type: 'text', isNullable: false },
        { name: 'type', type: 'text', isNullable: false },
        { name: 'open', type: 'boolean', isNullable: false },
        { name: 'minimum_amount', type: 'real', isNullable: true },
        { name: 'maximum_amount', type: 'real', isNullable: true },
        { name: 'items', type: 'json', isNullable: true },
        { name: 'created_on', type: 'integer', isNullable: false },
        { name: 'updated_on', type: 'integer', isNullable: false },
      ],
      indices: [
        { name: `${GIVEAWAYS_TABLE}_type_index`, columnNames: ['type'] },
        { name: `${GIVEAWAYS_TABLE}_open_index`, columnNames: ['open'] },
      ],
    });

    const giveawayEntriesTable = new Table({
      name: GIVEAWAY_ENTRIES_TABLE,
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isUnique: true,
          isNullable: false,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        { name: 'giveaway_id', type: 'integer', isNullable: false },
        { name: 'item', type: 'text', isNullable: true },
        { name: 'amount', type: 'real', isNullable: true },
        { name: 'description', type: 'text', isNullable: true },
        { name: 'platform', type: 'text', isNullable: false },
        { name: 'name', type: 'text', isNullable: false },
        { name: 'email', type: 'text', isNullable: false },
        { name: 'created_on', type: 'integer', isNullable: false },
        { name: 'updated_on', type: 'integer', isNullable: false },
      ],
      indices: [
        { name: `${GIVEAWAY_ENTRIES_TABLE}_giveaway_id_index`, columnNames: ['giveaway_id'] },
        { name: `${GIVEAWAY_ENTRIES_TABLE}_name_index`, columnNames: ['name'] },
        { name: `${GIVEAWAY_ENTRIES_TABLE}_email_index`, columnNames: ['email'] },
        { name: `${GIVEAWAY_ENTRIES_TABLE}_platform_index`, columnNames: ['platform'] },
      ],
      foreignKeys: [
        {
          name: `${GIVEAWAYS_TABLE}_id_fk`,
          referencedTableName: 'giveaways',
          referencedColumnNames: ['id'],
          columnNames: ['giveaway_id'],
          onDelete: 'CASCADE',
        },
      ],
    });

    await queryRunner.createTable(giveawaysTable);
    await queryRunner.createTable(giveawayEntriesTable);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(GIVEAWAY_ENTRIES_TABLE);
    await queryRunner.dropTable(GIVEAWAYS_TABLE);
  }
}
