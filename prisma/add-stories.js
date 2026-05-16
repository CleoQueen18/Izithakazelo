import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addStories() {
  console.log(' Adding origin stories to clans...\n');

  // Update Zulu
  await prisma.clan.update({
    where: { name: "Zulu" },
    data: {
      originStory: "The Zulu clan traces its origins to the Nguni people who migrated down the east coast of Africa. According to oral tradition, the founder was a chief named Zulu kaMalandela, meaning 'Zulu, son of Malandela'. The name 'Zulu' means 'heaven' or 'sky' in isiZulu.",
      history: "Under King Shaka in the early 19th century, the Zulu transformed from a small clan into a powerful nation. Shaka revolutionized warfare with the short stabbing spear (iklwa) and the 'horns of the buffalo' formation. The Anglo-Zulu War of 1879 saw the famous Battle of Isandlwana. Today, the Zulu are the largest ethnic group in South Africa with over 11 million people."
    }
  });
  console.log(" Updated Zulu");

  // Update Xhosa
  await prisma.clan.update({
    where: { name: "Xhosa" },
    data: {
      originStory: "The Xhosa people are part of the Nguni migration from the Great Lakes region of Central Africa. Their name comes from a legendary leader named Xhosa. The language is famous for its click consonants, borrowed from the Khoisan people.",
      history: "The Xhosa nation includes clans like Gcaleka, Rharhabe, and Thembu. Key figures include King Hintsa and Chief Maqoma. The Cattle Killing movement of 1856-1857 led to widespread famine. Influential Xhosa figures include Nelson Mandela, Thabo Mbeki, and Steve Biko."
    }
  });
  console.log(" Updated Xhosa");

  // Update Swati
  await prisma.clan.update({
    where: { name: "Swati" },
    data: {
      originStory: "The Swati people emerged as a distinct nation under King Ngwane III in the 18th century. The name 'Swati' comes from King Mswati II, a 19th-century ruler who expanded the kingdom. The Swati royal family, the House of Dlamini, has ruled for centuries.",
      history: "Eswatini (formerly Swaziland) is Africa's last absolute monarchy. The nation is known for the Umhlanga (Reed Dance) and Incwala (First Fruits) ceremonies. King Mswati III has reigned since 1986, preserving traditional governance."
    }
  });
  console.log(" Updated Swati");

  // Update Ndebele
  await prisma.clan.update({
    where: { name: "Ndebele" },
    data: {
      originStory: "The Ndebele are part of the Nguni group. After breaking from Shaka, the warrior Mzilikazi led his people north to Zimbabwe. The Southern Ndebele remained in South Africa, centered around Mokopane and KwaMhlanga.",
      history: "The Ndebele are famous for their vibrant geometric art. Traditionally, women painted their homes with bright colors and bold patterns. Ndebele art is now recognized worldwide. The Ndebele language (isiNdebele) is one of South Africa's eleven official languages."
    }
  });
  console.log(" Updated Ndebele");

  // Update Sotho
  await prisma.clan.update({
    where: { name: "Sotho" },
    data: {
      originStory: "The Basotho nation was founded by King Moshoeshoe I in the early 19th century. He united scattered clans fleeing the Mfecane wars at the mountain fortress of Thaba Bosiu, which he believed grew taller at night to protect his people.",
      history: "King Moshoeshoe I was a brilliant diplomat and military strategist. He successfully defended his people against Zulu raids, British armies, and Boer settlers, even defeating the British in 1852. Today, the Kingdom of Lesotho is an independent nation completely surrounded by South Africa."
    }
  });
  console.log(" Updated Sotho");

  // Update Tswana
  await prisma.clan.update({
    where: { name: "Tswana" },
    data: {
      originStory: "The Tswana people (Batswana) emerged from various Nguni and Sotho groups who migrated to the region. They established powerful states like the Bakwena, Bangwaketse, and Barolong.",
      history: "The Tswana were heavily impacted by the Mfecane wars but managed to maintain their independence. The region is now Botswana, one of Africa's most stable democracies. Notable leader Sir Seretse Khama was the first president of Botswana, and his son Ian Khama also served as president."
    }
  });
  console.log("Updated Tswana");

  // Update Venda
  await prisma.clan.update({
    where: { name: "Venda" },
    data: {
      originStory: "The Venda people (Vhavenda) trace their origins to the Great Lakes region of Central Africa. They are known for their sophisticated art, particularly woodcarvings and drum making.",
      history: "The Venda established a kingdom centered on the sacred Lake Fundudzi, considered the resting place of the python god Ndadzi. The lake is South Africa's only true natural freshwater lake. The Venda perform the Domba (python dance) for fertility. The region is now part of Limpopo province."
    }
  });
  console.log(" Updated Venda");

  // Update Tsonga
  await prisma.clan.update({
    where: { name: "Tsonga" },
    data: {
      originStory: "The Tsonga people (Vatsonga) originated from Central Africa, migrating along the east coast to settle in what is now Mozambique, South Africa, and Zimbabwe. They are historically known as skilled fishermen, traders, and farmers.",
      history: "The Tsonga language (Xitsonga) is one of South Africa's official languages. Today, they are known for their vibrant music and dance, including the famous 'Shangaan electro' music genre. Tsonga traditional beliefs center around the veneration of ancestors (Swikwembu) and a supreme being (Nhlamulo)."
    }
  });
  console.log(" Updated Tsonga");

  // Update Pedi
  await prisma.clan.update({
    where: { name: "Pedi" },
    data: {
      originStory: "The Pedi (Bapedi) people are part of the Northern Sotho group. They established a powerful mountain kingdom under King Thulare in the late 18th century, controlling trade routes and dominating the region.",
      history: "After King Thulare, his son King Sekhukhune I fiercely resisted Boer and British colonial expansion. He defeated the Boers in the First Sekhukhune War (1876) but was eventually captured by the British in 1879. Today, the Pedi people are primarily found in Limpopo province, where they maintain their cultural traditions."
    }
  });
  console.log(" Updated Pedi");

  console.log("\n All clan stories added successfully!");
}

addStories()
  .catch(console.error)
  .finally(() => prisma.$disconnect());