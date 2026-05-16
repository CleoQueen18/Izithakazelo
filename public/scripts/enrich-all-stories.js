const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function enrichAllStories() {
  console.log('📚 Adding rich, legitimate content to all stories...\n');

  const stories = [
    {
      id: 1,
      title: "The Legacy of the Khumalo Clan",
      content: `<h2>The Legacy of the Khumalo Clan</h2>

<p>The Khumalo clan holds a significant place in Southern African history, with a lineage stretching back centuries. They are part of the larger Nguni group and share close cultural ties with the Zulu and Ndebele nations.</p>

<h3>Mzilikazi kaMashobana: The Founder of the Ndebele Nation</h3>
<p>One of the most famous Khumalo leaders was Mzilikazi kaMashobana (c. 1790-1868). He was originally a general under Shaka Zulu but later broke away during the Mfecane period. Mzilikazi led his people—known as the Northern Ndebele—northward across the Vaal River and eventually into what is now Zimbabwe. There he established the powerful Ndebele kingdom, with his capital at Bulawayo. Mzilikazi was known as a brilliant military strategist and diplomat who successfully defended his kingdom against both Boer and British forces.</p>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaKhumalo</strong><br>
"Mntungwa! Nyamande! Dlomo!<br>
Wena kaZwide, Ndaba!<br>
Mageba! Manzezulu!<br>
Sokwalisa! Mashobana!"</p>
</blockquote>

<h3>The Khumalo in Zulu History</h3>
<p>Within the Zulu kingdom, the Khumalo were known as one of the most powerful chieftaincies. Chief Zwide kaLanga of the Ndwandwe, a rival of Shaka, had significant interactions with the Khumalo. The relationship between the Khumalo and Zulu royal houses has been complex, involving both alliances and conflicts.</p>

<h3>Modern Khumalo Identity</h3>
<p>Today, descendants of the Khumalo clan can be found across Southern Africa, particularly in Zimbabwe, South Africa, and Eswatini. The Khumalo name remains prominent, with many holding positions of influence in government, business, and academia. The clan continues to honor its heritage through annual gatherings and the recitation of izithakazelo at important family occasions.</p>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 2,
      title: "The Kingdom of the Xhosa",
      content: `<h2>The Kingdom of the Xhosa</h2>

<p>The Xhosa people (amaXhosa) are one of the largest ethnic groups in South Africa, with a rich history spanning over a thousand years. They are part of the Nguni migration that moved down the eastern coast of Africa from the Great Lakes region, settling in the lush lands of the Eastern Cape where they established powerful chiefdoms and kingdoms.</p>

<h3>Origins and Naming</h3>
<p>According to oral tradition, the name "Xhosa" comes from a legendary leader named uXhosa. The language is famous for its three click consonants (c, q, x), which were borrowed from the Khoisan people the Nguni encountered during their migration southward.</p>

<h3>Great Leaders and Kings</h3>
<p>The Xhosa nation has been shaped by remarkable leaders:</p>
<ul>
<li><strong>King Hintsa (1789-1835)</strong> - The great Xhosa king who led his people during the Frontier Wars. He was killed by the British, and his death remains a powerful symbol of Xhosa resistance.</li>
<li><strong>Chief Maqoma (1798-1873)</strong> - A brilliant military strategist of the Rharhabe who led resistance against colonial forces.</li>
<li><strong>King Phalo</strong> - United the Xhosa nation and established the royal lineage from which the Gcaleka and Rharhabe houses descend.</li>
<li><strong>King Sandile (1820-1878)</strong> - Defended Xhosa land against colonial expansion.</li>
<li><strong>Nelson Mandela (1918-2013)</strong> - A proud Thembu/Xhosa who became South Africa's first democratic president.</li>
<li><strong>Steve Biko (1946-1977)</strong> - Anti-apartheid activist and founder of the Black Consciousness Movement.</li>
</ul>

<h3>The Cattle Killing Movement (1856-1857)</h3>
<p>A young Xhosa prophetess named Nongqawuse prophesied that if the Xhosa destroyed their crops and killed their cattle, the ancestors would rise and drive the British into the sea. Believing this prophecy, the Xhosa people sacrificed their livelihood. When the prophecy failed, widespread famine ensued, weakening Xhosa resistance and opening the door for colonial expansion. This tragic event remains a profound lesson in Xhosa history.</p>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaXhosa</strong><br>
"Tshawe! Ntu! Mrawuli!<br>
Khawuta! Gcaleka!<br>
Phalo! Rarabe!<br>
Ndlambe! Hintsa!<br>
Sandile! Jonguhlanga!"</p>
</blockquote>

<h3>Cultural Traditions</h3>
<ul>
<li><strong>Ulwaluko</strong> - The sacred initiation ceremony for young men, marking the transition to manhood. Initiates (abakwetha) undergo circumcision and seclusion while learning about Xhosa customs and responsibilities.</li>
<li><strong>Umtshato</strong> - Traditional weddings involving the lobola (bride price) ceremony, which strengthens family bonds.</li>
<li><strong>Amadlozi</strong> - Ancestral reverence through offerings and rituals, maintaining connection with those who came before.</li>
<li><strong>Izibongo</strong> - The oral tradition of praise poetry, celebrating heroes, clans, and historical events.</li>
<li><strong>Intonjane</strong> - The female initiation ceremony, preparing young women for adulthood.</li>
</ul>

<h3>The Frontier Wars (1779-1879)</h3>
<p>The Xhosa fought nine wars against British and Boer colonizers over nearly a century—the longest resistance to colonialism in Africa. These wars, known as the Xhosa Wars or Frontier Wars, demonstrated the Xhosa people's fierce determination to defend their land and autonomy.</p>

<h3>Ubuntu Philosophy</h3>
<blockquote>
<p><strong>"Umuntu ngumuntu ngabantu"</strong><br>
A person is a person through other people.</p>
</blockquote>
<p>This principle of interconnectedness and community remains central to Xhosa identity.</p>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 3,
      title: "The Swati Royal Heritage",
      content: `<h2>The Swati Royal Heritage</h2>

<p>The Swati people (Emaswati) are known for their vibrant culture and strong monarchy, with a history deeply rooted in Southern Africa. They emerged as a distinct nation under King Ngwane III in the 18th century.</p>

<h3>Royal Lineage: The House of Dlamini</h3>
<p>The Swati royal family, the House of Dlamini, has ruled for centuries. Kings are known as Ingwenyama (Lion), and queens as Indlovukazi (She-Elephant). The current king, Mswati III, has reigned since 1986. The dynasty traces its lineage back to Dlamini I, who led the people into the region, and later to King Mswati II, a 19th-century ruler from whom the nation derives its name.</p>

<h3>Cultural Ceremonies</h3>
<ul>
<li><strong>Umhlanga (Reed Dance)</strong> - An annual ceremony where thousands of young women dance and present reeds to the Queen Mother, celebrating young womanhood and unity.</li>
<li><strong>Incwala (First Fruits Ceremony)</strong> - The most sacred Swati ritual, led by the King. It is a time of national renewal, blessing the first fruits of the harvest and strengthening the monarchy.</li>
<li><strong>Sibhaca</strong> - Traditional dance and music performed at important celebrations.</li>
</ul>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaDlamini</strong><br>
"Mdlovu! Nkosi! Ngwane!<br>
Wena kaNgwane, Sobhuza!<br>
Mswati! Dlamini!<br>
Wena wakaMswati, Ndabezitha!"</p>
</blockquote>

<h3>Eswatini Today</h3>
<p>Eswatini (formerly Swaziland) is one of Africa's last absolute monarchies. The nation successfully maintained its independence during the Scramble for Africa through skilled diplomacy with both British and Boer powers. Despite modern challenges, the Swati people maintain a strong sense of cultural identity and national pride rooted in their royal heritage.</p>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 4,
      title: "The Ndebele Artistic Legacy",
      content: `<h2>The Ndebele Artistic Legacy</h2>

<p>The Ndebele people (amaNdebele) are renowned worldwide for their vibrant geometric art. Their history is tied to the broader Nguni group, with distinct Southern and Northern branches.</p>

<h3>Southern Ndebele History</h3>
<p>The Southern Ndebele remained in South Africa after Mzilikazi's break from Shaka, centered around the towns of Mokopane (formerly Potgietersrus) and KwaMhlanga in what is now Mpumalanga and Gauteng provinces. They developed a unique cultural identity, partly as a response to displacement and a desire to maintain their heritage.</p>

<h3>The Art of the Ndebele</h3>
<p>Ndebele art is characterized by:</p>
<ul>
<li><strong>Vibrant Geometric Patterns</strong> - Bold, colorful shapes including triangles, chevrons, and zigzags.</li>
<li><strong>Home Painting</strong> - Traditionally, women painted the exterior of their homes, a practice that became a form of communication and cultural expression, especially during apartheid when other forms of speech were restricted.</li>
<li><strong>Symbolic Colors</strong> - Each color holds meaning: yellow/gold for fertility, red for passion and power, blue for loyalty, and black for the connection to ancestors.</li>
<li><strong>Beadwork</strong> - Intricate beadwork patterns on aprons, shawls, and neck rings (isigolwani) convey social status and life milestones.</li>
</ul>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaNdebele</strong><br>
"Mthombeni! Mahlangu!<br>
Somcuba! Ndzundza!<br>
Manala! Kekana!<br>
Mnguni! Nyambeni!"</p>
</blockquote>

<h3>Global Recognition</h3>
<p>Ndebele art is recognized worldwide, featured in major galleries and museums including the British Museum and the Smithsonian. Artists like Esther Mahlangu have brought Ndebele designs to the global stage, painting on BMW cars and exhibiting internationally. The Ndebele language (isiNdebele) is one of South Africa's eleven official languages.</p>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 5,
      title: "The Tswana Trading Empire",
      content: `<h2>The Tswana Trading Empire</h2>

<p>The Tswana people (Batswana) emerged from various Nguni and Sotho groups who migrated to the region. They established powerful states such as the Bakwena, Bangwaketse, Barolong, and Bakgatla.</p>

<h3>Trade and Economy</h3>
<p>The Tswana were historically positioned along important trade routes across the Kalahari Desert and into the interior. They traded in:</p>
<ul>
<li><strong>Ivory</strong> - Highly valued in coastal and European markets.</li>
<li><strong>Ostrich feathers</strong> - Fashionable commodity in 19th-century Europe.</li>
<li><strong>Copper and iron</strong> - Extracted and traded for other goods.</li>
<li><strong>Cattle</strong> - The foundation of wealth and social status.</li>
</ul>

<h3>Great Leaders</h3>
<ul>
<li><strong>Sir Seretse Khama</strong> - The first president of Botswana, who led the nation to independence and transformed it into one of Africa's most stable democracies.</li>
<li><strong>Ian Khama</strong> - Son of Seretse, who also served as president of Botswana.</li>
<li><strong>Chief Bathoen I</strong> - A prominent 19th-century leader of the Bangwaketse.</li>
</ul>

<h3>The Mfecane Period</h3>
<p>The Tswana were heavily impacted by the Mfecane (Difaqane) wars but managed to maintain their independence through defensive mountain settlements and strategic alliances. Today, the Setswana language is widely spoken in both Botswana and South Africa.</p>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaTswana</strong><br>
"Mokgatla! Moilwa! Mosweu!<br>
Mokibelo! Mmamogolo!<br>
Kgetsi! Motshabi!"</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 6,
      title: "The Venda Sacred Lake",
      content: `<h2>The Venda Sacred Lake</h2>

<p>The Venda people (Vhavenda) are known for their sophisticated art, spiritual traditions, and connection to the sacred Lake Fundudzi. They trace their origins to the Great Lakes region of Central Africa, migrating south centuries ago.</p>

<h3>Lake Fundudzi: The Sacred Lake</h3>
<p>Lake Fundudzi, located in the Soutpansberg mountains of Limpopo, is South Africa's only true natural freshwater lake. It is considered the resting place of the python god Ndadzi. The lake is surrounded by legends:</p>
<ul>
<li>It is believed that no one can swim in the lake without being claimed by the ancestors.</li>
<li>The "floating" plants on the lake are said to be the hair of drowned maidens.</li>
<li>A white python, the messenger of Ndadzi, is said to appear at the lake.</li>
</ul>
<p>Only traditional healers and appointed custodians may approach the lake, and annual rituals are performed to honor the ancestors.</p>

<h3>Venda Art and Culture</h3>
<ul>
<li><strong>Woodcarving</strong> - The Venda are renowned for their detailed wooden sculptures, including drums, headrests, and ceremonial objects.</li>
<li><strong>Domba (Python Dance)</strong> - A pre-marriage dance performed by young maidens, symbolizing fertility and the serpent's movement.</li>
<li><strong>Thavhuyada (Domba School)</strong> - The final phase of female initiation, ending with the famous python dance.</li>
<li><strong>Musical Instruments</strong> - The Venda are known for the ngoma drums and the tshihwana (musical bow).</li>
</ul>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaVenda</strong><br>
"Thovhele! Masia!<br>
Ramabulana! Mudau!<br>
Mphephu! Netshiavha!<br>
Tshivhase! Ralushai!"</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 7,
      title: "The Tsonga Coastal Heritage",
      content: `<h2>The Tsonga Coastal Heritage</h2>

<p>The Tsonga people (Vatsonga) originated from Central Africa, migrating along the east coast to settle in what is now Mozambique, South Africa, and Zimbabwe. They are historically known as skilled fishermen, traders, and farmers along the coastal plains.</p>

<h3>Historical Background</h3>
<p>The Tsonga people lived in decentralized chiefdoms along the coastal plains. They were heavily impacted by the expansion of the Gaza Empire under Soshangane in the 19th century, who forced many Tsonga to flee or assimilate. Despite this, the Tsonga preserved their language and cultural identity.</p>

<h3>Music and Dance</h3>
<ul>
<li><strong>Shangaan Electro</strong> - A globally recognized music genre blending traditional Tsonga rhythms with electronic dance music, pioneered by artists like Nozinja and Sho Madjozi.</li>
<li><strong>Xibelani Dance</strong> - A traditional dance performed by women wearing colorful, ruffled skirts (xibelani), accompanied by rhythmic drumming.</li>
<li><strong>Makhwaya</strong> - Choral singing tradition influenced by Western hymns.</li>
</ul>

<h3>Spiritual Beliefs</h3>
<p>Tsonga traditional beliefs center around:</p>
<ul>
<li><strong>Swikwembu</strong> - Veneration of ancestors, who act as intermediaries between the living and the supreme being.</li>
<li><strong>Nhlamulo</strong> - The supreme being or creator.</li>
<li><strong>Tinyanga (Traditional Healers)</strong> - Diviners and herbalists who maintain spiritual and physical health.</li>
</ul>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaTsonga</strong><br>
"Hosi! Nkosi!<br>
Baloyi! Chauke!<br>
Mabunda! Maluleke!<br>
Ngobeni! Hlongwane!"</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 8,
      title: "The Pedi Mountain Kingdom",
      content: `<h2>The Pedi Mountain Kingdom</h2>

<p>The Pedi (Bapedi) people are part of the Northern Sotho group. They established a powerful mountain kingdom in the late 18th century, with the capital at the fortified mountain of Thaba Mosego.</p>

<h3>King Thulare and the Rise of the Pedi</h3>
<p>Under King Thulare (c. 1790-1824), the Pedi kingdom reached its peak. Thulare consolidated neighboring chiefdoms and controlled trade routes from the interior to the coast, dealing in ivory, skins, and grain. His reign brought prosperity and stability to the region.</p>

<h3>King Sekhukhune I: The Warrior King</h3>
<p>After Thulare's death, his son King Sekhukhune I took the throne. He fiercely resisted Boer and British colonial expansion:</p>
<ul>
<li><strong>First Sekhukhune War (1876)</strong> - Sekhukhune defeated the Boers, inflicting heavy casualties and forcing them to retreat.</li>
<li><strong>Second Sekhukhune War (1878-1879)</strong> - The British, supported by Swazi allies, eventually captured Sekhukhune in November 1879. He was imprisoned but later released.</li>
</ul>
<p>Sekhukhune's resistance inspired later generations of African resistance to colonialism.</p>

<h3>Ironworking and Economy</h3>
<p>The Pedi were renowned ironworkers, mining and smelting iron for tools, weapons, and trade. The mountain was strategically located near iron ore deposits, giving the Pedi economic and military advantage.</p>

<h3>Cultural Traditions</h3>
<ul>
<li><strong>Koma (Initiation School)</strong> - Sacred initiation for young men and women, teaching cultural values and responsibilities.</li>
<li><strong>Dikoma (Drums)</strong> - Traditional drumming ceremonies for important celebrations.</li>
</ul>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaPedi</strong><br>
"Marota! Kgaga!<br>
Sekhukhune! Thobejane!<br>
Kekana! Mphahlele!<br>
Matlala! Masemola!"</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    }
  ];

  let updated = 0;

  for (const story of stories) {
    await prisma.featuredStory.update({
      where: { id: story.id },
      data: { content: story.content }
    });
    console.log(`✅ Updated: ${story.title}`);
    updated++;
  }

  console.log(`\n🎉 Complete! Updated ${updated} stories.`);
  console.log('👉 Go to /stories to see the in-depth content!');

  await prisma.$disconnect();
}

enrichAllStories().catch(console.error);