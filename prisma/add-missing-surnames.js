const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addMissingSurnames() {
  console.log('Adding missing Tsonga, Pedi, and Venda surnames...\n');

  // Get clan IDs
  const tsongaClan = await prisma.clan.findFirst({ where: { name: 'Tsonga' } });
  const pediClan = await prisma.clan.findFirst({ where: { name: 'Pedi' } });
  const vendaClan = await prisma.clan.findFirst({ where: { name: 'Venda' } });

  const data = [
    // Tsonga
    { clan: tsongaClan, surname: 'Baloyi', praise: 'Hosi! Nkosi! Ndlopfu!', origin: 'Limpopo/Mpumalanga', language: 'Xitsonga' },
    { clan: tsongaClan, surname: 'Chauke', praise: 'Hosi! Nkosi! Ndhlele!', origin: 'Limpopo', language: 'Xitsonga' },
    { clan: tsongaClan, surname: 'Mabunda', praise: 'Hosi! Ndlovu!', origin: 'Limpopo', language: 'Xitsonga' },
    { clan: tsongaClan, surname: 'Maluleke', praise: 'Hosi! Nkosi! Xivambalala!', origin: 'Limpopo', language: 'Xitsonga' },
    { clan: tsongaClan, surname: 'Ngobeni', praise: 'Hosi! Ndlovu! Mawewe!', origin: 'Limpopo', language: 'Xitsonga' },
    { clan: tsongaClan, surname: 'Nkuna', praise: 'Hosi! Shimange!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { clan: tsongaClan, surname: 'Khosa', praise: 'Hosi! Ngonyama!', origin: 'Mpumalanga', language: 'Xitsonga' },
    // Pedi
    { clan: pediClan, surname: 'Thobejane', praise: 'Marota! Kgaga!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { clan: pediClan, surname: 'Mphahlele', praise: 'Marota! Sekhukhune!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { clan: pediClan, surname: 'Kekana', praise: 'Marota! Thobejane!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { clan: pediClan, surname: 'Matlala', praise: 'Marota! Kgaga!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { clan: pediClan, surname: 'Masemola', praise: 'Marota! Thobela!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { clan: pediClan, surname: 'Sekhukhune', praise: 'Marota! Thulare!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { clan: pediClan, surname: 'Maimane', praise: 'Marota! Phatudi!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    // Venda
    { clan: vendaClan, surname: 'Mudau', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { clan: vendaClan, surname: 'Ramabulana', praise: 'Thovhele! Mudau!', origin: 'Limpopo', language: 'Tshivenda' },
    { clan: vendaClan, surname: 'Mphephu', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { clan: vendaClan, surname: 'Ndou', praise: 'Thovhele! Ndou!', origin: 'Limpopo', language: 'Tshivenda' },
    { clan: vendaClan, surname: 'Netshiavha', praise: 'Thovhele! Ramabulana!', origin: 'Limpopo', language: 'Tshivenda' },
    { clan: vendaClan, surname: 'Tshivhase', praise: 'Thovhele! Ralushai!', origin: 'Limpopo', language: 'Tshivenda' },
  ];

  for (const item of data) {
    if (!item.clan) {
      console.log(`❌ Clan not found for ${item.surname}`);
      continue;
    }

    let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
    if (!surname) {
      surname = await prisma.surname.create({
        data: { name: item.surname, origin: item.origin, language: item.language },
      });
      console.log(`✅ Created surname: ${item.surname}`);
    }

    const existing = await prisma.clanSurname.findFirst({
      where: { clanId: item.clan.id, surnameId: surname.id },
    });

    if (!existing) {
      await prisma.clanSurname.create({
        data: { clanId: item.clan.id, surnameId: surname.id, clan_praise: item.praise },
      });
      console.log(`   ✅ Added ${item.surname} → ${item.clan.name} clan`);
    }
  }

  console.log('\n🎉 Missing surnames added!');
  await prisma.$disconnect();
}

addMissingSurnames();
