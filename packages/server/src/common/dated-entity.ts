import { ApiProperty } from '@nestjs/swagger';

import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

/**
 * Mixin for entities that need to track their creation and modification dates.
 */
export class DatedEntity {
  @Column({ name: 'created_on' })
  @ApiProperty({ type: 'number' })
  createdOn: number;

  @Column({ name: 'updated_on' })
  @ApiProperty({ type: 'number' })
  updatedOn: number;

  @BeforeInsert()
  setCreatedOn() {
    this.createdOn = Date.now();
    this.updatedOn = Date.now();
  }

  @BeforeUpdate()
  setUpdatedOn() {
    this.updatedOn = Date.now();
  }
}
