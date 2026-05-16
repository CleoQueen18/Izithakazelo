import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addMissingSurnames() {
  console.log('Adding missing surnames to Zulu clan...\n');
  
  // Find the Zulu clan
  const zuluClan = await prisma.clan.findFirst({
    where: { name: 'Zulu' },
  });
  
  if (!zuluClan) {
    console.error('Zulu clan not found!');
    return;
  }
  
  console.log(`Found Zulu clan (ID: ${zuluClan.id})`);
  
  // Define the surnames to add
  const surnamesToAdd = [
    { name: 'Zulu', origin: 'KwaZulu-Natal', language: 'isiZulu', praise: 'Wena owaphuma emhlathini, Ndabezitha! Magingxana kaPhunga noMageba!' },
    { name: 'Buthelezi', origin: 'KwaZulu-Natal', language: 'isiZulu', praise: 'Shenge! Mnyamana! Ndlamandla!' },
    { name: 'Mkhize', origin: 'KwaZulu-Natal', language: 'isiZulu', praise: 'Nyanda! Khangelamankengane!' },
    { name: 'Ndwandwe', origin: 'KwaZulu-Natal', language: 'isiZulu', praise: 'Matiwane! Nxaba!' },
  ];
  
  for (const item of surnamesToAdd) {
    // Find or create the surname
    let surname = await prisma.surname.findFirst({
      where: { name: item.name },
    });
    
    if (!surname) {
      surname = await prisma.surname.create({
        data: {
          name: item.name,
          origin: item.origin,
          language: item.language,
        },
      });
      console.log(`✅ Created surname: ${item.name}`);
    } else {
      console.log(`📍 Surname already exists: ${item.name}`);
    }
    
    // Check if relationship already exists
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
      console.log(`   ✅ Added ${item.name} → Zulu clan with praise`);
    } else {
      console.log(`   ⏩ ${item.name} already linked to Zulu clan`);
    }
  }
  
  console.log('\n✅ Done! Check Prisma Studio to see the results.');
}

addMissingSurnames()
  .catch(console.error)
  .finally(() => prisma.$disconnect());