const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addMoreTsonga() {
  console.log('Adding more Tsonga surnames...\n');

  const tsongaClan = await prisma.clan.findFirst({ where: { name: 'Tsonga' } });
  if (!tsongaClan) { console.log('Tsonga clan not found'); return; }

  const tsongaSurnames = [
    { surname: 'Sambo', praise: 'Hosi! Ndlovu!', origin: 'Limpopo', language: 'Xitsonga' },
    { surname: 'Mashele', praise: 'Hosi! Nkosi!', origin: 'Limpopo', language: 'Xitsonga' },
    { surname: 'Mthombeni', praise: 'Hosi! Ndlovu!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { surname: 'Nkuna', praise: 'Hosi! Shimange!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { surname: 'Mbhokota', praise: 'Hosi! Ndlovu!', origin: 'Limpopo', language: 'Xitsonga' },
    { surname: 'Mboweni', praise: 'Hosi! Nkosi!', origin: 'Limpopo', language: 'Xitsonga' },
    { surname: 'Rikhotso', praise: 'Hosi! Ndlovu!', origin: 'Limpopo', language: 'Xitsonga' },
    { surname: 'Mabasa', praise: 'Hosi! Nkosi!', origin: 'Limpopo', language: 'Xitsonga' },
    { surname: 'Zitha', praise: 'Hosi! Ndlovu!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { surname: 'Masingita', praise: 'Hosi! Nkosi!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { surname: 'Mahlalela', praise: 'Hosi! Ngonyama!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { surname: 'Nkambule', praise: 'Hosi! Nkosi!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { surname: 'Magagula', praise: 'Hosi! Ndlovu!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { surname: 'Mathebula', praise: 'Hosi! Nkosi!', origin: 'Limpopo', language: 'Xitsonga' },
    { surname: 'Mdluli', praise: 'Hosi! Nkosi!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { surname: 'Shongwe', praise: 'Hosi! Ndhlele!', origin: 'Mpumalanga', language: 'Xitsonga' },
    { surname: 'Mkhabela', praise: 'Hosi! Nkosi!', origin: 'Mpumalanga/Limpopo', language: 'Xitsonga' },
    { surname: 'Ntshangase', praise: 'Hosi! Ndlovu!', origin: 'Mpumalanga', language: 'Xitsonga' },
  ];

  let added = 0;
  for (const item of tsongaSurnames) {
    let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
    if (!surname) {
      surname = await prisma.surname.create({
        data: { name: item.surname, origin: item.origin, language: item.language },
      });
    }
    const existing = await prisma.clanSurname.findFirst({
      where: { clanId: tsongaClan.id, surnameId: surname.id },
    });
    if (!existing) {
      await prisma.clanSurname.create({
        data: { clanId: tsongaClan.id, surnameId: surname.id, clan_praise: item.praise },
      });
      added++;
    }
  }
  console.log(`\n✅ Added ${added} new Tsonga surnames`);
  await prisma.$disconnect();
}
addMoreTsonga();
