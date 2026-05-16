import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addMoreData() {
  console.log('🌱 Adding more heritage data...\n');

  // 1. Venda Tribe Data
  const vendaClan = await prisma.clan.findFirst({ where: { name: 'Venda' } });
  if (vendaClan) {
    const vendaData = [
      { surname: 'Netshiavha', praise: 'Makhado! Thohoyandou!', origin: 'Limpopo', language: 'Tshivenda' },
      { surname: 'Ramabulana', praise: 'Dzata! Thovhele!', origin: 'Limpopo', language: 'Tshivenda' },
      { surname: 'Tshivhase', praise: 'Mphephu! Sinthumule!', origin: 'Limpopo', language: 'Tshivenda' },
      { surname: 'Mphaphuli', praise: 'Netshivhuyu!', origin: 'Limpopo', language: 'Tshivenda' },
      { surname: 'Ndou', praise: 'Masingo! Tshikalange!', origin: 'Limpopo', language: 'Tshivenda' },
    ];

    for (const item of vendaData) {
      let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
      if (!surname) {
        surname = await prisma.surname.create({
          data: { name: item.surname, origin: item.origin, language: item.language },
        });
        console.log(`✅ Created surname: ${item.surname}`);
      }
      const existing = await prisma.clanSurname.findFirst({
        where: { clanId: vendaClan.id, surnameId: surname.id },
      });
      if (!existing) {
        await prisma.clanSurname.create({
          data: { clanId: vendaClan.id, surnameId: surname.id, clan_praise: item.praise },
        });
        console.log(`   ✅ Added ${item.surname} → Venda clan`);
      }
    }
  }

  // 2. Tsonga Tribe Data
  const tsongaClan = await prisma.clan.findFirst({ where: { name: 'Tsonga' } });
  if (tsongaClan) {
    const tsongaData = [
      { surname: 'Baloyi', praise: 'Ndzuti! Hlave!', origin: 'Mpumalanga', language: 'Xitsonga' },
      { surname: 'Mabunda', praise: 'Nkuna! Hlengwe!', origin: 'Mpumalanga', language: 'Xitsonga' },
      { surname: 'Chauke', praise: 'Nkosi! Hlomula!', origin: 'Mpumalanga', language: 'Xitsonga' },
      { surname: 'Mhinga', praise: 'Nwamitwa!', origin: 'Mpumalanga', language: 'Xitsonga' },
      { surname: 'Nkuna', praise: 'Mavalanga!', origin: 'Mpumalanga', language: 'Xitsonga' },
    ];

    for (const item of tsongaData) {
      let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
      if (!surname) {
        surname = await prisma.surname.create({
          data: { name: item.surname, origin: item.origin, language: item.language },
        });
        console.log(`✅ Created surname: ${item.surname}`);
      }
      const existing = await prisma.clanSurname.findFirst({
        where: { clanId: tsongaClan.id, surnameId: surname.id },
      });
      if (!existing) {
        await prisma.clanSurname.create({
          data: { clanId: tsongaClan.id, surnameId: surname.id, clan_praise: item.praise },
        });
        console.log(`   ✅ Added ${item.surname} → Tsonga clan`);
      }
    }
  }

  // 3. Pedi Tribe Data
  const pediClan = await prisma.clan.findFirst({ where: { name: 'Pedi' } });
  if (pediClan) {
    const pediData = [
      { surname: 'Molepo', praise: 'Mokgatla! Thulare!', origin: 'Limpopo', language: 'Sepedi' },
      { surname: 'Kekana', praise: 'Mmanaledi!', origin: 'Limpopo', language: 'Sepedi' },
      { surname: 'Mathabathe', praise: 'Mokopane!', origin: 'Limpopo', language: 'Sepedi' },
      { surname: 'Mphahlele', praise: 'Mokgatla!', origin: 'Limpopo', language: 'Sepedi' },
      { surname: 'Lebelo', praise: 'Mohlaletsi!', origin: 'Limpopo', language: 'Sepedi' },
    ];

    for (const item of pediData) {
      let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
      if (!surname) {
        surname = await prisma.surname.create({
          data: { name: item.surname, origin: item.origin, language: item.language },
        });
        console.log(`✅ Created surname: ${item.surname}`);
      }
      const existing = await prisma.clanSurname.findFirst({
        where: { clanId: pediClan.id, surnameId: surname.id },
      });
      if (!existing) {
        await prisma.clanSurname.create({
          data: { clanId: pediClan.id, surnameId: surname.id, clan_praise: item.praise },
        });
        console.log(`   ✅ Added ${item.surname} → Pedi clan`);
      }
    }
  }

  // 4. More Tswana Data
  const tswanaClan = await prisma.clan.findFirst({ where: { name: 'Tswana' } });
  if (tswanaClan) {
    const tswanaData = [
      { surname: 'Mokgatle', praise: 'Moilwa! Mosweu!', origin: 'North West', language: 'Setswana' },
      { surname: 'Motsamai', praise: 'Mokgatla!', origin: 'North West', language: 'Setswana' },
      { surname: 'Seleka', praise: 'Mokibelo!', origin: 'North West', language: 'Setswana' },
    ];

    for (const item of tswanaData) {
      let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
      if (!surname) {
        surname = await prisma.surname.create({
          data: { name: item.surname, origin: item.origin, language: item.language },
        });
        console.log(`✅ Created surname: ${item.surname}`);
      }
      const existing = await prisma.clanSurname.findFirst({
        where: { clanId: tswanaClan.id, surnameId: surname.id },
      });
      if (!existing) {
        await prisma.clanSurname.create({
          data: { clanId: tswanaClan.id, surnameId: surname.id, clan_praise: item.praise },
        });
        console.log(`   ✅ Added ${item.surname} → Tswana clan`);
      }
    }
  }

  // 5. More Xhosa Data
  const xhosaClan = await prisma.clan.findFirst({ where: { name: 'Xhosa' } });
  if (xhosaClan) {
    const xhosaData = [
      { surname: 'Mbeki', praise: 'Msi! Mthwakazi!', origin: 'Eastern Cape', language: 'isiXhosa' },
      { surname: 'Biko', praise: 'Mthwakazi!', origin: 'Eastern Cape', language: 'isiXhosa' },
      { surname: 'Mandela', praise: 'Madiba! Mvezo!', origin: 'Eastern Cape', language: 'isiXhosa' },
    ];

    for (const item of xhosaData) {
      let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
      if (!surname) {
        surname = await prisma.surname.create({
          data: { name: item.surname, origin: item.origin, language: item.language },
        });
        console.log(`✅ Created surname: ${item.surname}`);
      }
      const existing = await prisma.clanSurname.findFirst({
        where: { clanId: xhosaClan.id, surnameId: surname.id },
      });
      if (!existing) {
        await prisma.clanSurname.create({
          data: { clanId: xhosaClan.id, surnameId: surname.id, clan_praise: item.praise },
        });
        console.log(`   ✅ Added ${item.surname} → Xhosa clan`);
      }
    }
  }

  // 6. More Swati Data
  const swatiClan = await prisma.clan.findFirst({ where: { name: 'Swati' } });
  if (swatiClan) {
    const swatiData = [
      { surname: 'Fakudze', praise: 'Mswati!', origin: 'Eswatini', language: 'siSwati' },
      { surname: 'Mabuza', praise: 'Mdzimba!', origin: 'Eswatini', language: 'siSwati' },
    ];

    for (const item of swatiData) {
      let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
      if (!surname) {
        surname = await prisma.surname.create({
          data: { name: item.surname, origin: item.origin, language: item.language },
        });
        console.log(`✅ Created surname: ${item.surname}`);
      }
      const existing = await prisma.clanSurname.findFirst({
        where: { clanId: swatiClan.id, surnameId: surname.id },
      });
      if (!existing) {
        await prisma.clanSurname.create({
          data: { clanId: swatiClan.id, surnameId: surname.id, clan_praise: item.praise },
        });
        console.log(`   ✅ Added ${item.surname} → Swati clan`);
      }
    }
  }

  console.log('\n🎉 Data addition complete!');
  console.log('Run `npx prisma studio` to see all your data.');
}

addMoreData()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });