import { randomUUID } from 'node:crypto';

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'money_giveaway' })
export class MoneyGiveawayEntity {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'platform' })
  platform: string;

  @Column({ name: 'username' })
  username: string;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'paypal_email' })
  paypalEmail: string;

  @Column({ name: 'created_on', default: () => "unixepoch('subsec') * 1000" })
  createdOn: number;

  constructor() {
    this.id = randomUUID();
  }
}
