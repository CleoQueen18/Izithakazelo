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
<li><strong>Ulwaluko</strong> - The sacred initiation ceremony for young men, marking the transition to manhood.</li>
<li><strong>Umtshato</strong> - Traditional weddings involving the lobola (bride price) ceremony.</li>
<li><strong>Amadlozi</strong> - Ancestral reverence through offerings and rituals.</li>
<li><strong>Izibongo</strong> - The oral tradition of praise poetry.</li>
</ul>

<h3>The Frontier Wars (1779-1879)</h3>
<p>The Xhosa fought nine wars against British and Boer colonizers over nearly a century—the longest resistance to colonialism in Africa.</p>

<h3>Ubuntu Philosophy</h3>
<blockquote>
<p><strong>"Umuntu ngumuntu ngabantu"</strong><br>
A person is a person through other people.</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 3,
      title: "The Swati Royal Heritage",
      content: `<h2>The Swati Royal Heritage</h2>

<p>The Swati people (Emaswati) are known for their vibrant culture and strong monarchy, with a history deeply rooted in Southern Africa. They emerged as a distinct nation under King Ngwane III in the 18th century.</p>

<h3>Royal Lineage: The House of Dlamini</h3>
<p>The Swati royal family, the House of Dlamini, has ruled for centuries. Kings are known as Ingwenyama (Lion), and queens as Indlovukazi (She-Elephant). The current king, Mswati III, has reigned since 1986.</p>

<h3>Cultural Ceremonies</h3>
<ul>
<li><strong>Umhlanga (Reed Dance)</strong> - Annual ceremony celebrating young womanhood.</li>
<li><strong>Incwala (First Fruits Ceremony)</strong> - The most sacred Swati ritual, led by the King.</li>
</ul>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaDlamini</strong><br>
"Mdlovu! Nkosi! Ngwane!<br>
Wena kaNgwane, Sobhuza!<br>
Mswati! Dlamini!"</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 4,
      title: "The Ndebele Artistic Legacy",
      content: `<h2>The Ndebele Artistic Legacy</h2>

<p>The Ndebele people (amaNdebele) are renowned worldwide for their vibrant geometric art. Their history is tied to the broader Nguni group, with distinct Southern and Northern branches.</p>

<h3>Southern Ndebele History</h3>
<p>The Southern Ndebele developed a unique cultural identity, centered around Mokopane and KwaMhlanga in Mpumalanga and Gauteng.</p>

<h3>The Art of the Ndebele</h3>
<ul>
<li><strong>Vibrant Geometric Patterns</strong> - Bold, colorful shapes including triangles, chevrons, and zigzags.</li>
<li><strong>Home Painting</strong> - Women painting home exteriors as cultural expression.</li>
<li><strong>Beadwork</strong> - Intricate patterns conveying social status.</li>
</ul>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaNdebele</strong><br>
"Mthombeni! Mahlangu!<br>
Somcuba! Ndzundza!<br>
Manala! Kekana!"</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 5,
      title: "The Tswana Trading Empire",
      content: `<h2>The Tswana Trading Empire</h2>

<p>The Tswana people (Batswana) established powerful states such as the Bakwena, Bangwaketse, Barolong, and Bakgatla, positioned along important trade routes across the Kalahari Desert.</p>

<h3>Trade and Economy</h3>
<p>The Tswana traded in ivory, ostrich feathers, copper, iron, and cattle, connecting interior resources to coastal markets.</p>

<h3>Great Leaders</h3>
<ul>
<li><strong>Sir Seretse Khama</strong> - First president of Botswana.</li>
<li><strong>Ian Khama</strong> - Former president of Botswana.</li>
</ul>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaTswana</strong><br>
"Mokgatla! Moilwa! Mosweu!<br>
Mokibelo! Mmamogolo!"</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 6,
      title: "The Venda Sacred Lake",
      content: `<h2>The Venda Sacred Lake</h2>

<p>The Venda people (Vhavenda) are known for their sophisticated art, spiritual traditions, and connection to the sacred Lake Fundudzi, South Africa's only true natural freshwater lake.</p>

<h3>Lake Fundudzi Legends</h3>
<p>The lake is considered the resting place of the python god Ndadzi. It is believed that no one can swim in the lake without being claimed by the ancestors. Only traditional healers and appointed custodians may approach the lake.</p>

<h3>Venda Art and Culture</h3>
<ul>
<li><strong>Woodcarving</strong> - Renowned wooden sculptures and drums.</li>
<li><strong>Domba (Python Dance)</strong> - Pre-marriage fertility dance.</li>
</ul>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaVenda</strong><br>
"Thovhele! Masia!<br>
Ramabulana! Mudau!<br>
Mphephu! Netshiavha!"</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 7,
      title: "The Tsonga Coastal Heritage",
      content: `<h2>The Tsonga Coastal Heritage</h2>

<p>The Tsonga people (Vatsonga) settled along the coastal plains of Mozambique, South Africa, and Zimbabwe, known as skilled fishermen, traders, and farmers.</p>

<h3>Music and Dance</h3>
<ul>
<li><strong>Shangaan Electro</strong> - Globally recognized music genre.</li>
<li><strong>Xibelani Dance</strong> - Traditional dance with colorful ruffled skirts.</li>
</ul>

<h3>Spiritual Beliefs</h3>
<p>Tsonga traditions center around veneration of ancestors (Swikwembu) and the supreme being (Nhlamulo).</p>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaTsonga</strong><br>
"Hosi! Nkosi!<br>
Baloyi! Chauke!<br>
Mabunda! Maluleke!"</p>
</blockquote>

<hr>
<p><em>This story is part of the Izithakazelo heritage collection.</em></p>`
    },
    {
      id: 8,
      title: "The Pedi Mountain Kingdom",
      content: `<h2>The Pedi Mountain Kingdom</h2>

<p>The Pedi (Bapedi) people established a powerful mountain kingdom with the capital at the fortified mountain of Thaba Mosego.</p>

<h3>King Thulare and the Rise of the Pedi</h3>
<p>Under King Thulare (c. 1790-1824), the Pedi kingdom reached its peak, controlling trade routes from the interior to the coast.</p>

<h3>King Sekhukhune I: The Warrior King</h3>
<p>Sekhukhune I fiercely resisted Boer and British colonial expansion, defeating the Boers in the First Sekhukhune War (1876).</p>

<h3>Izithakazelo (Clan Praises)</h3>
<blockquote>
<p><strong>Izithakazelo zakwaPedi</strong><br>
"Marota! Kgaga!<br>
Sekhukhune! Thobejane!<br>
Kekana! Mphahlele!"</p>
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