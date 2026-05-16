import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addData() {
  console.log('🌱 Adding more data to Izithakazelo...\n');

  // 1. Add more tribes (if not exists)
  const tribes = [
    { name: 'Tswana', description: 'The Batswana people are native to Southern Africa, primarily Botswana and South Africa.' },
    { name: 'Venda', description: 'The Venda people are known for their rich artistic traditions and the sacred Lake Fundudzi.' },
    { name: 'Tsonga', description: 'The Tsonga people are known for their vibrant music and dance traditions.' },
    { name: 'Pedi', description: 'The Pedi (Bapedi) people have a rich history in the Limpopo province.' },
  ];

  for (const tribe of tribes) {
    const existing = await prisma.clan.findFirst({
      where: { name: tribe.name }
    });
    
    if (!existing) {
      await prisma.clan.create({
        data: {
          name: tribe.name,
          tribe: tribe.name,
          description: tribe.description,
        },
      });
      console.log(`✅ Added clan: ${tribe.name}`);
    } else {
      console.log(`⏩ Clan already exists: ${tribe.name}`);
    }
  }

  // 2. Add surnames and praises for Tswana
  const tswanaData = [
    { surname: 'Molefe', praise: 'Mokgatla! Moilwa! Mosweu!', origin: 'North West', language: 'Setswana' },
    { surname: 'Modise', praise: 'Mokgatla! Mokibelo!', origin: 'North West', language: 'Setswana' },
    { surname: 'Selebi', praise: 'Modimo! Motshabi!', origin: 'North West', language: 'Setswana' },
  ];

  const tswanaClan = await prisma.clan.findFirst({ where: { name: 'Tswana' } });
  
  if (tswanaClan) {
    for (const item of tswanaData) {
      // Find or create surname
      let surname = await prisma.surname.findFirst({
        where: { name: item.surname },
      });
      
      if (!surname) {
        surname = await prisma.surname.create({
          data: {
            name: item.surname,
            origin: item.origin,
            language: item.language,
          },
        });
        console.log(`✅ Created surname: ${item.surname}`);
      }
      
      // Check if relationship exists
      const existing = await prisma.clanSurname.findFirst({
        where: {
          clanId: tswanaClan.id,
          surnameId: surname.id,
        },
      });
      
      if (!existing) {
        await prisma.clanSurname.create({
          data: {
            clanId: tswanaClan.id,
            surnameId: surname.id,
            clan_praise: item.praise,
          },
        });
        console.log(`   ✅ Added ${item.surname} → Tswana clan`);
      } else {
        console.log(`   ⏩ ${item.surname} already linked to Tswana`);
      }
    }
  }

  // 3. Add more surnames to Zulu
  const zuluClan = await prisma.clan.findFirst({ where: { name: 'Zulu' } });
  const zuluData = [
    { surname: 'Mchunu', praise: 'Mthiya! Nkomo!', origin: 'KwaZulu-Natal', language: 'isiZulu' },
    { surname: 'Khumalo', praise: 'Mntungwa! Nyanda! Dlomo!', origin: 'KwaZulu-Natal', language: 'isiZulu' },
    { surname: 'Ngcobo', praise: 'Mpiti! Mdladla!', origin: 'KwaZulu-Natal', language: 'isiZulu' },
    { surname: 'Cele', praise: 'Mkhathini! Mzilikazi!', origin: 'KwaZulu-Natal', language: 'isiZulu' },
  ];

  if (zuluClan) {
    for (const item of zuluData) {
      let surname = await prisma.surname.findFirst({
        where: { name: item.surname },
      });
      
      if (!surname) {
        surname = await prisma.surname.create({
          data: {
            name: item.surname,
            origin: item.origin,
            language: item.language,
          },
        });
        console.log(`✅ Created surname: ${item.surname}`);
      }
      
      const existing = await prisma.clanSurname.findFirst({
        where: {
          clanId: zuluClan.id,
          surnameId: surname.id,
        },
      });
      
      if (!existing) {
        await prisma.clanSurname.create({
          data: {
            clanId: zuluClan.id,
            surnameId: surname.id,
            clan_praise: item.praise,
          },
        });
        console.log(`   ✅ Added ${item.surname} → Zulu clan`);
      } else {
        console.log(`   ⏩ ${item.surname} already linked to Zulu`);
      }
    }
  }

  // 4. Add more surnames to Xhosa
  const xhosaClan = await prisma.clan.findFirst({ where: { name: 'Xhosa' } });
  const xhosaData = [
    { surname: 'Ndlovu', praise: 'Gatsheni! Nkomo!', origin: 'Eastern Cape', language: 'isiXhosa' },
    { surname: 'Sithole', praise: 'Mthombeni! Shange!', origin: 'Eastern Cape', language: 'isiXhosa' },
    { surname: 'Nkosi', praise: 'Mahlobo! Mthethwa!', origin: 'Eastern Cape', language: 'isiXhosa' },
  ];

  if (xhosaClan) {
    for (const item of xhosaData) {
      let surname = await prisma.surname.findFirst({
        where: { name: item.surname },
      });
      
      if (!surname) {
        surname = await prisma.surname.create({
          data: {
            name: item.surname,
            origin: item.origin,
            language: item.language,
          },
        });
        console.log(`✅ Created surname: ${item.surname}`);
      }
      
      const existing = await prisma.clanSurname.findFirst({
        where: {
          clanId: xhosaClan.id,
          surnameId: surname.id,
        },
      });
      
      if (!existing) {
        await prisma.clanSurname.create({
          data: {
            clanId: xhosaClan.id,
            surnameId: surname.id,
            clan_praise: item.praise,
          },
        });
        console.log(`   ✅ Added ${item.surname} → Xhosa clan`);
      } else {
        console.log(`   ⏩ ${item.surname} already linked to Xhosa`);
      }
    }
  }

  console.log('\n🎉 Data addition complete!');
  console.log('Run `npx prisma studio` to see all your data.');
}

addData()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });