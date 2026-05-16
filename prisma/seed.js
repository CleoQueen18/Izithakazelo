import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning existing data...');
  await prisma.clanSurname.deleteMany({});
  await prisma.surname.deleteMany({});
  await prisma.clan.deleteMany({});
  console.log('Cleaned.\n');

  // 1. Create Clans
  const clans = {
    zulu: await prisma.clan.create({
      data: { name: 'Zulu', tribe: 'Zulu', description: 'The Zulu people are the largest ethnic group in South Africa.' }
    }),
    xhosa: await prisma.clan.create({
      data: { name: 'Xhosa', tribe: 'Xhosa', description: 'The Xhosa people are known for their distinctive click language.' }
    }),
    swati: await prisma.clan.create({
      data: { name: 'Swati', tribe: 'Swati', description: 'The Swati people are known for their vibrant culture.' }
    }),
    ndebele: await prisma.clan.create({
      data: { name: 'Ndebele', tribe: 'Ndebele', description: 'The Ndebele people are famous for their geometric art.' }
    }),
    sotho: await prisma.clan.create({
      data: { name: 'Sotho', tribe: 'Sotho', description: 'The Basotho people have a rich history.' }
    }),
  };

  console.log('✅ Clans created:');
  Object.values(clans).forEach(c => console.log(`   - ${c.name}`));
  console.log('');

  // 2. Create Surnames
  const surnames = {
    zulu: await prisma.surname.create({ data: { name: 'Zulu', origin: 'KwaZulu-Natal', language: 'isiZulu' } }),
    buthelezi: await prisma.surname.create({ data: { name: 'Buthelezi', origin: 'KwaZulu-Natal', language: 'isiZulu' } }),
    mkhize: await prisma.surname.create({ data: { name: 'Mkhize', origin: 'KwaZulu-Natal', language: 'isiZulu' } }),
    ndwandwe: await prisma.surname.create({ data: { name: 'Ndwandwe', origin: 'KwaZulu-Natal', language: 'isiZulu' } }),
    xhosa: await prisma.surname.create({ data: { name: 'Xhosa', origin: 'Eastern Cape', language: 'isiXhosa' } }),
    madiba: await prisma.surname.create({ data: { name: 'Madiba', origin: 'Eastern Cape', language: 'isiXhosa' } }),
    dlamini: await prisma.surname.create({ data: { name: 'Dlamini', origin: 'Eswatini', language: 'siSwati' } }),
    nkosi: await prisma.surname.create({ data: { name: 'Nkosi', origin: 'Eswatini', language: 'siSwati' } }),
    mamba: await prisma.surname.create({ data: { name: 'Mamba', origin: 'Eswatini', language: 'siSwati' } }),
    ndebele: await prisma.surname.create({ data: { name: 'Ndebele', origin: 'Mpumalanga', language: 'isiNdebele' } }),
    mahlangu: await prisma.surname.create({ data: { name: 'Mahlangu', origin: 'Mpumalanga', language: 'isiNdebele' } }),
    moshoeshoe: await prisma.surname.create({ data: { name: 'Moshoeshoe', origin: 'Lesotho', language: 'Sesotho' } }),
    mokhele: await prisma.surname.create({ data: { name: 'Mokhele', origin: 'Lesotho', language: 'Sesotho' } }),
  };

  console.log('✅ Surnames created:');
  Object.values(surnames).forEach(s => console.log(`   - ${s.name}`));
  console.log('');

  // 3. Create relationships (many-to-many with praises)
  const relationships = [
    { clan: clans.zulu, surname: surnames.zulu, praise: 'Wena owaphuma emhlathini, Ndabezitha! Magingxana kaPhunga noMageba!' },
    { clan: clans.zulu, surname: surnames.buthelezi, praise: 'Shenge! Mnyamana! Ndlamandla!' },
    { clan: clans.zulu, surname: surnames.mkhize, praise: 'Nyanda! Khangelamankengane!' },
    { clan: clans.zulu, surname: surnames.ndwandwe, praise: 'Matiwane! Nxaba!' },
    { clan: clans.xhosa, surname: surnames.xhosa, praise: 'Tshawe! Ntu! Mrawuli!' },
    { clan: clans.xhosa, surname: surnames.madiba, praise: 'Radebe! Mvelase!' },
    { clan: clans.swati, surname: surnames.dlamini, praise: 'Mdlovu! Nkosi! Ngwane!' },
    { clan: clans.swati, surname: surnames.nkosi, praise: 'Mahlobo! Shongwe!' },
    { clan: clans.swati, surname: surnames.mamba, praise: 'Ndlovu! Gwebu!' },
    { clan: clans.ndebele, surname: surnames.ndebele, praise: 'Mthombeni! Mahlangu!' },
    { clan: clans.ndebele, surname: surnames.mahlangu, praise: 'Mthombeni! Somcuba!' },
    { clan: clans.sotho, surname: surnames.moshoeshoe, praise: 'Morena! Mokhachane!' },
    { clan: clans.sotho, surname: surnames.mokhele, praise: 'Mokoteli! Lepoqo!' },
  ];

  for (const rel of relationships) {
    await prisma.clanSurname.create({
      data: {
        clanId: rel.clan.id,
        surnameId: rel.surname.id,
        clan_praise: rel.praise,
      },
    });
  }

  console.log('✅ Clan-Surname relationships created');
  console.log('\n🎉 Database seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });