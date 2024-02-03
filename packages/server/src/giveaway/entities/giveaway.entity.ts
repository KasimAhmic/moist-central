import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { DatedEntity } from '../../common/dated-entity';

@Entity({ name: 'giveaways' })
export class Giveaway extends DatedEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'type' })
  type: string;

  @Column({ name: 'open' })
  open: boolean;

  @Column({ name: 'minimum_amount' })
  minimumAmount: number;

  @Column({ name: 'maximum_amount' })
  maximumAmount: number | null;

  @Column({ name: 'items', type: 'json' })
  items: string[] | null;
}
