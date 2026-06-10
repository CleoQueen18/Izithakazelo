const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addMorePedi() {
  console.log('Adding more Pedi surnames...\n');

  const pediClan = await prisma.clan.findFirst({ where: { name: 'Pedi' } });
  if (!pediClan) { console.log('Pedi clan not found'); return; }

  const pediSurnames = [
    { surname: 'Mohlala', praise: 'Marota! Kgaga!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Malatji', praise: 'Marota! Thobejane!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mothiba', praise: 'Marota! Sekhukhune!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mashiane', praise: 'Marota! Mphahlele!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Nchabeleng', praise: 'Marota! Mphahlele!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Phatudi', praise: 'Marota! Sekhukhune!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mampuru', praise: 'Marota! Thulare!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mathabathe', praise: 'Marota! Kgaga!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mothapo', praise: 'Marota! Thobejane!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Magabe', praise: 'Marota! Sekhukhune!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Makhura', praise: 'Marota! Mphahlele!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Matsepe', praise: 'Marota! Kgaga!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mphahlele', praise: 'Marota! Sekhukhune!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mokhomo', praise: 'Marota! Thobejane!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mogane', praise: 'Marota! Kgaga!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Monare', praise: 'Marota! Sekhukhune!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mothiba', praise: 'Marota! Mphahlele!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Mashabela', praise: 'Marota! Thobejane!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Makgoba', praise: 'Marota! Kgaga!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
    { surname: 'Malobola', praise: 'Marota! Sekhukhune!', origin: 'Limpopo', language: 'Sesotho sa Leboa' },
  ];

  let added = 0;
  for (const item of pediSurnames) {
    let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
    if (!surname) {
      surname = await prisma.surname.create({
        data: { name: item.surname, origin: item.origin, language: item.language },
      });
    }
    const existing = await prisma.clanSurname.findFirst({
      where: { clanId: pediClan.id, surnameId: surname.id },
    });
    if (!existing) {
      await prisma.clanSurname.create({
        data: { clanId: pediClan.id, surnameId: surname.id, clan_praise: item.praise },
      });
      added++;
    }
  }
  console.log(`\n✅ Added ${added} new Pedi surnames`);
  await prisma.$disconnect();
}
addMorePedi();
