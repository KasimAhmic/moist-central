async function test(giveawayId: number, iterations: number) {
  const responseTimes: bigint[] = [];

  for (let i = 0; i < iterations; i++) {
    const startTime = process.hrtime.bigint();

    await fetch(`http://localhost:8080/api/giveaway/${giveawayId}/entry`);

    const endTime = process.hrtime.bigint();

    responseTimes.push(endTime - startTime);
  }

  const averageResponseTime = responseTimes.map(Number).reduce((a, b) => a + b) / responseTimes.length;

  console.log(`Average response time: ${averageResponseTime / 1e6}ms`);
}

async function run() {
  await test(19, 100);
  await test(19, 100);
  await test(19, 100);
  await test(19, 100);
  await test(19, 100);
}

run();
