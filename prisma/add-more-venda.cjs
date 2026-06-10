const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function addMoreVenda() {
  console.log('Adding more authentic Venda surnames...\n');

  const vendaClan = await prisma.clan.findFirst({ where: { name: 'Venda' } });
  if (!vendaClan) { console.log('Venda clan not found'); return; }

  const vendaSurnames = [
    { surname: 'Ndou', praise: 'Thovhele! Ndou!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Masiagwala', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Mathivha', praise: 'Thovhele! Mudau!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Musekwa', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Sinthumule', praise: 'Thovhele! Ramabulana!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Luvhengo', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Munyai', praise: 'Thovhele! Mudau!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Shavhani', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Thovhele', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Makhado', praise: 'Thovhele! Ramabulana!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Ravhura', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Netshiombo', praise: 'Thovhele! Mudau!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Ralushai', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Nemukovhani', praise: 'Thovhele! Ramabulana!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Mugivhi', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Nengovhela', praise: 'Thovhele! Mudau!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Takalani', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Mulaudzi', praise: 'Thovhele! Ramabulana!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Mukwevho', praise: 'Thovhele! Masia!', origin: 'Limpopo', language: 'Tshivenda' },
    { surname: 'Nevhulaudzi', praise: 'Thovhele! Mudau!', origin: 'Limpopo', language: 'Tshivenda' },
  ];

  let added = 0;
  for (const item of vendaSurnames) {
    let surname = await prisma.surname.findFirst({ where: { name: item.surname } });
    if (!surname) {
      surname = await prisma.surname.create({
        data: { name: item.surname, origin: item.origin, language: item.language },
      });
    }
    const existing = await prisma.clanSurname.findFirst({
      where: { clanId: vendaClan.id, surnameId: surname.id },
    });
    if (!existing) {
      await prisma.clanSurname.create({
        data: { clanId: vendaClan.id, surnameId: surname.id, clan_praise: item.praise },
      });
      added++;
    }
  }
  console.log(`\n✅ Added ${added} new Venda surnames`);
  await prisma.$disconnect();
}
addMoreVenda();
