import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { DatedEntity } from '../../common/dated-entity';
import { Giveaway } from './giveaway.entity';

@Entity({ name: 'giveaway_entries' })
export class GiveawayEntry extends DatedEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => Giveaway, (giveaway) => giveaway.id)
  @JoinColumn({ name: 'giveaway_id' })
  giveawayId: number;

  @Column({ name: 'item' })
  item: string | null;

  @Column({ name: 'amount' })
  amount: number | null;

  @Column({ name: 'description' })
  description: string | null;

  @Column({ name: 'platform' })
  platform: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'email' })
  email: string;
}
