import { faker } from '@faker-js/faker';

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function createGiveaway() {
  const type = Math.random() > 0.5 ? 'item' : 'money';
  const min = type === 'money' ? faker.number.int({ min: 0, max: 500 }) : null;
  const max = type === 'money' ? faker.number.int({ min: min, max: 1000 }) : null;

  const response = await fetch('http://localhost:8080/api/giveaway', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: `${faker.word.verb()} ${faker.word.preposition()} ${faker.word.noun()}`,
      open: true,
      type: type,
      items:
        type === 'item'
          ? new Array(faker.number.int({ min: 1, max: 5 })).fill(0).map(() => faker.commerce.productName())
          : null,
      minimumAmount: min,
      maximumAmount: max,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create giveaway');
  }

  const giveaway = await response.json();

  console.log(`Created giveaway ${giveaway.id} with ${giveaway.type} type`);

  if (giveaway.type === 'item') {
    console.log(`Items: ${giveaway.items.join(', ')}`);
  }

  if (giveaway.type === 'money') {
    console.log(`Amount: ${giveaway.minimumAmount} - ${giveaway.maximumAmount}`);
  }

  return giveaway;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function enterGiveaway(giveaway: Record<string, any>, entryCount: number) {
  for (let i = 0; i < entryCount; i++) {
    const response = await fetch(`http://localhost:3000/api/giveaway/${giveaway.id}/entry`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: faker.internet.userName(),
        email: faker.internet.email(),
        platform: Math.random() > 0.5 ? 'twitch' : 'youtube',
        item: giveaway.type === 'item' ? giveaway.items[randomInt(0, giveaway.items.length - 1)] : null,
        amount: giveaway.type === 'money' ? randomInt(giveaway.minimumAmount, giveaway.maximumAmount) : null,
        description: faker.lorem.paragraph(),
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error(err);

      throw new Error('Failed to enter giveaway');
    }
  }
}

async function run() {
  for (let i = 0; i < 100; i++) {
    const giveaway = await createGiveaway();

    const startTime = process.hrtime.bigint();
    await enterGiveaway(giveaway, 1000);
    const endTime = process.hrtime.bigint();

    const responseTime = Number(endTime - startTime) / 1e9;

    console.log(`Entered giveaway in ${responseTime}s`);
  }
}

run();
