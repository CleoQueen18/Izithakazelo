import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addClanStories() {
  console.log('📜 Adding origin stories and history to clans...\n');

  const clanData = [
    {
      name: "Zulu",
      originStory: "The Zulu clan traces its origins to the Nguni people who migrated down the east coast of Africa. According to oral tradition, the founder of the Zulu royal line was a chief named Zulu kaMalandela, meaning 'Zulu, son of Malandela'. The name 'Zulu' means 'heaven' or 'sky' in isiZulu, symbolizing the clan's connection to the spiritual realm. Under the leadership of King Shaka in the early 19th century, the Zulu transformed from a small clan into a powerful nation that dominated southeastern Africa.",
      history: "The Zulu Kingdom, also known as the Zulu Empire, was the most powerful and influential kingdom in 19th-century Southern Africa. King Shaka revolutionized warfare by introducing the short stabbing spear (iklwa) and the 'horns of the buffalo' formation. After Shaka's assassination in 1828, his successors Dingane, Mpande, and Cetshwayo continued to rule. The Anglo-Zulu War of 1879 saw the famous Battle of Isandlwana where the Zulu defeated British forces, though the kingdom eventually fell. Today, the Zulu are the largest ethnic group in South Africa, with over 11 million people, and their culture and traditions remain vibrant, including the annual Reed Dance and the recognition of the Zulu king (currently Goodwill Zwelithini's successor)."
    },
    {
      name: "Xhosa",
      originStory: "The Xhosa people are part of the Nguni migration from the Great Lakes region of Central Africa. Oral traditions trace their ancestry to a legendary leader named Xhosa, from whom they derive their name. The Xhosa nation is comprised of several clans, including the Gcaleka, Rharhabe, and Thembu. The language is famous for its click consonants, borrowed from the Khoisan people they encountered. The great house of the Thembu clan produced one of the world's most famous leaders, Nelson Mandela.",
      history: "The Xhosa nation was formed through the unification of various Nguni clans. Key historical figures include King Hintsa, who was killed by the British in 1834, and Chief Maqoma, a powerful leader of the Rharhabe who fought in the Frontier Wars. The Cattle Killing movement of 1856-1857, led by prophecies from Nongqawuse, led to widespread famine and weakened Xhosa resistance to colonial rule. Despite this, the Xhosa language and culture have remained strong, producing influential figures like Nelson Mandela, Thabo Mbeki, Steve Biko, and Archbishop Desmond Tutu."
    },
    {
      name: "Swati",
      originStory: "The Swati people (Emaswati) emerged as a distinct nation under King Ngwane III in the 18th century, who established the first settlements in what is now Eswatini. The name 'Swati' is derived from Mswati II, a 19th-century king who expanded the kingdom's territory. The Swati royal family, the House of Dlamini, has ruled for centuries, tracing their lineage back to Dlamini I, who led them into the region.",
      history: "Eswatini, formerly known as Swaziland, is Africa's last absolute monarchy. The nation successfully maintained its independence during the Scramble for Africa through skilled diplomacy with both British and Boer powers. The country is rich in cultural traditions, most notably the Umhlanga (Reed Dance) and the Incwala (First Fruits) ceremony. King Mswati III has reigned since 1986, preserving traditional governance while the country has evolved. Despite challenges, the Swati people's strong sense of cultural identity and national pride continues to define their heritage."
    },
    {
      name: "Ndebele",
      originStory: "The Ndebele (amaNdebele) are part of the Nguni group. Their history is closely tied to the Zulu kingdom. After breaking from Shaka, the warrior Mzilikazi led his people (known as the Northern Ndebele) north to Zimbabwe. The Southern Ndebele remained in South Africa, centered around the towns of Mokopane and KwaMhlanga.",
      history: "The Ndebele are world-renowned for their vibrant geometric art. Traditionally, women painted the exterior of their homes with bright colors and bold patterns, which served as a form of communication and cultural expression. The Ndebele people have maintained their unique identity despite the challenges of apartheid. Today, the Ndebele art style is recognized globally, featured in galleries and museums. The Ndebele language (isiNdebele) is one of South Africa's eleven official languages."
    },
    {
      name: "Sotho",
      originStory: "The Basotho nation was founded by King Moshoeshoe I in the early 19th century. Moshoeshoe gathered scattered clans fleeing the Mfecane wars and united them at the mountain fortress of Thaba Bosiu, which he believed grew taller at night to protect his people. The name 'Sotho' refers to the people, language, and culture of Lesotho and surrounding areas.",
      history: "King Moshoeshoe I was a brilliant diplomat and military strategist. He successfully defended his people against Zulu raids, British armies, and Boer settlers. He even defeated the British in 1852, earning their respect. Today, the Kingdom of Lesotho is an independent nation completely surrounded by South Africa. The Sotho people are known for their vibrant blankets, conical hats, and the oral tradition of praise poetry (lithoko)."
    },
    {
      name: "Tswana",
      originStory: "The Tswana people (Batswana) emerged from various Nguni and Sotho groups who migrated to the region. They established powerful states such as the Bakwena, Bangwaketse, and Barolong. Their history is intertwined with trade routes across the Kalahari Desert, dealing in ivory, feathers, and copper.",
      history: "The Tswana were heavily impacted by the Mfecane wars but managed to maintain their independence. The region is now the country of Botswana, which has become one of Africa's most stable democracies. Notable Tswana leaders include Sir Seretse Khama, the first president of Botswana, and his son Ian Khama. The Tswana Tswana (Setswana) language is widely spoken in both Botswana and South Africa."
    },
    {
      name: "Venda",
      originStory: "The Venda people (Vhavenda) trace their origins to the Great Lakes region of Central Africa. They are known for their sophisticated art, particularly their woodcarvings and drum making. The Venda language is unique, incorporating clicks and containing secrets spoken only within the community.",
      history: "The Venda people established a kingdom centered on the sacred Lake Fundudzi, considered the resting place of the python god Ndadzi. The lake, located in the Soutpansberg mountains, is South Africa's only true natural freshwater lake and is surrounded by legends. The Venda are known for their Domba (python dance), performed by young maidens to ensure fertility. The region is now part of Limpopo province, and Venda culture and traditions remain an integral part of South African heritage."
    },
    {
      name: "Tsonga",
      originStory: "The Tsonga people (Vatsonga) are believed to have originated from Central Africa, migrating along the east coast to settle in what is now Mozambique, South Africa, and Zimbabwe. They are historically known as skilled fisherman, traders, and farmers along the coastal plains.",
      history: "The Tsonga language (Xitsonga) belongs to the Bantu language family. The people were heavily influenced by the Nguni expansion. Today, they are known for their vibrant music and dance, including the famous 'Shangaan electro' music genre. Tsonga traditional beliefs center around the veneration of ancestors (Swikwembu) and a supreme being (Nhlamulo)."
    },
    {
      name: "Pedi",
      originStory: "The Pedi (Bapedi) people are part of the Northern Sotho group. Their origins can be traced back to the Bakgatla, who migrated from other regions. They established a powerful mountain kingdom under the leadership of King Thulare in the late 18th century.",
      history: "The Pedi Kingdom was a formidable force, controlling trade routes and successfully defending against rivals. After the death of Thulare, his son, King Sekhukhune I, took the throne. He fiercely resisted Boer and British colonial expansion, defeating the Boers in the First Sekhukhune War (1876). He was eventually captured by the British in 1879. Today, the Pedi people are primarily found in the Limpopo province and are recognized for their cultural traditions and history of resistance."
    },
  ];

  for (const data of clanData) {
    const clan = await prisma.clan.findFirst({
      where: { name: data.name },
    });
    
    if (clan) {
      await prisma.clan.update({
        where: { id: clan.id },
        data: {
          originStory: data.originStory,
          history: data.history,
        },
      });
      console.log(` Updated: ${data.name} Clan`);
    } else {
      console.log(` Clan not found: ${data.name}`);
    }
  }

  console.log('\n All clan stories added successfully!');
}

addClanStories()
  .catch(console.error)
  .finally(() => prisma.$disconnect());