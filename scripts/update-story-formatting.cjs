const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateStoryFormatting() {
  console.log('Updating all stories with improved formatting...\n');

  const stories = [
    {
      id: 1,
      title: "The Legacy of the Khumalo Clan",
      content: `<div class="story-content">

<h1>The Legacy of the Khumalo Clan</h1>

<p class="lead">The Khumalo clan holds a significant place in Southern African history, with a lineage stretching back centuries. They are part of the larger Nguni group and share close cultural ties with the Zulu and Ndebele nations.</p>

<div class="divider"></div>

<div class="section">
  <h2>Mzilikazi kaMashobana: The Founder of the Ndebele Nation</h2>
  <p>One of the most famous Khumalo leaders was Mzilikazi kaMashobana (c. 1790-1868). He was originally a general under Shaka Zulu but later broke away during the Mfecane period. Mzilikazi led his people—known as the Northern Ndebele—northward across the Vaal River and eventually into what is now Zimbabwe. There he established the powerful Ndebele kingdom, with his capital at Bulawayo. Mzilikazi was known as a brilliant military strategist and diplomat who successfully defended his kingdom against both Boer and British forces.</p>
</div>

<div class="section">
  <h2>Izithakazelo (Clan Praises)</h2>
  <div class="praise-box">
    <p><strong>Izithakazelo zakwaKhumalo</strong></p>
    <p class="praise-text">"Mntungwa! Nyamande! Dlomo!<br>
    Wena kaZwide, Ndaba!<br>
    Mageba! Manzezulu!<br>
    Sokwalisa! Mashobana!"</p>
  </div>
</div>

<div class="section">
  <h2>The Khumalo in Zulu History</h2>
  <p>Within the Zulu kingdom, the Khumalo were known as one of the most powerful chieftaincies. Chief Zwide kaLanga of the Ndwandwe, a rival of Shaka, had significant interactions with the Khumalo. The relationship between the Khumalo and Zulu royal houses has been complex, involving both alliances and conflicts.</p>
</div>

<div class="section">
  <h2>Modern Khumalo Identity</h2>
  <p>Today, descendants of the Khumalo clan can be found across Southern Africa, particularly in Zimbabwe, South Africa, and Eswatini. The Khumalo name remains prominent, with many holding positions of influence in government, business, and academia. The clan continues to honor its heritage through annual gatherings and the recitation of izithakazelo at important family occasions.</p>
</div>

<hr>

<p class="story-footer"><em>This story is part of the Izithakazelo heritage collection.</em></p>
</div>`
    },
    {
      id: 2,
      title: "The Kingdom of the Xhosa",
      content: `<div class="story-content">

<h1>The Kingdom of the Xhosa</h1>

<p class="lead">The Xhosa people (amaXhosa) are one of the largest ethnic groups in South Africa, with a rich history spanning over a thousand years. They are part of the Nguni migration that moved down the eastern coast of Africa from the Great Lakes region, settling in the lush lands of the Eastern Cape where they established powerful chiefdoms and kingdoms.</p>

<div class="divider"></div>

<div class="section">
  <h2>Origins and Naming</h2>
  <p>According to oral tradition, the name "Xhosa" comes from a legendary leader named uXhosa. The language is famous for its three click consonants (c, q, x), which were borrowed from the Khoisan people the Nguni encountered during their migration southward.</p>
</div>

<div class="section">
  <h2>Great Leaders and Kings</h2>
  <p>The Xhosa nation has been shaped by remarkable leaders:</p>
  <ul class="leaders-list">
    <li><strong>King Hintsa (1789-1835)</strong> - The great Xhosa king who led his people during the Frontier Wars. He was killed by the British, and his death remains a powerful symbol of Xhosa resistance.</li>
    <li><strong>Chief Maqoma (1798-1873)</strong> - A brilliant military strategist of the Rharhabe who led resistance against colonial forces.</li>
    <li><strong>King Phalo</strong> - United the Xhosa nation and established the royal lineage from which the Gcaleka and Rharhabe houses descend.</li>
    <li><strong>King Sandile (1820-1878)</strong> - Defended Xhosa land against colonial expansion.</li>
    <li><strong>Nelson Mandela (1918-2013)</strong> - A proud Thembu/Xhosa who became South Africa's first democratic president.</li>
    <li><strong>Steve Biko (1946-1977)</strong> - Anti-apartheid activist and founder of the Black Consciousness Movement.</li>
  </ul>
</div>

<div class="section">
  <h2>Izithakazelo (Clan Praises)</h2>
  <div class="praise-box">
    <p><strong>Izithakazelo zakwaXhosa</strong></p>
    <p class="praise-text">"Tshawe! Ntu! Mrawuli!<br>
    Khawuta! Gcaleka!<br>
    Phalo! Rarabe!<br>
    Ndlambe! Hintsa!<br>
    Sandile! Jonguhlanga!"</p>
  </div>
</div>

<div class="section">
  <h2>The Cattle Killing Movement (1856-1857)</h2>
  <p>A young Xhosa prophetess named Nongqawuse prophesied that if the Xhosa destroyed their crops and killed their cattle, the ancestors would rise and drive the British into the sea. Believing this prophecy, the Xhosa people sacrificed their livelihood. When the prophecy failed, widespread famine ensued, weakening Xhosa resistance and opening the door for colonial expansion. This tragic event remains a profound lesson in Xhosa history.</p>
</div>

<div class="section">
  <h2>Ubuntu Philosophy</h2>
  <div class="quote-box">
    <p>"Umuntu ngumuntu ngabantu"</p>
    <p class="quote-source">A person is a person through other people</p>
  </div>
</div>

<hr>

<p class="story-footer"><em>This story is part of the Izithakazelo heritage collection.</em></p>
</div>`
    },
    {
      id: 3,
      title: "The Swati Royal Heritage",
      content: `<div class="story-content">

<h1>The Swati Royal Heritage</h1>

<p class="lead">The Swati people (Emaswati) are known for their vibrant culture and strong monarchy, with a history deeply rooted in Southern Africa. They emerged as a distinct nation under King Ngwane III in the 18th century.</p>

<div class="divider"></div>

<div class="section">
  <h2>Royal Lineage: The House of Dlamini</h2>
  <p>The Swati royal family, the House of Dlamini, has ruled for centuries. Kings are known as Ingwenyama (Lion), and queens as Indlovukazi (She-Elephant). The current king, Mswati III, has reigned since 1986.</p>
</div>

<div class="section">
  <h2>Cultural Ceremonies</h2>
  <ul class="leaders-list">
    <li><strong>Umhlanga (Reed Dance)</strong> - Annual ceremony where thousands of young women dance and present reeds to the Queen Mother, celebrating young womanhood and unity.</li>
    <li><strong>Incwala (First Fruits Ceremony)</strong> - The most sacred Swati ritual, led by the King. It is a time of national renewal, blessing the first fruits of the harvest and strengthening the monarchy.</li>
  </ul>
</div>

<div class="section">
  <h2>Izithakazelo (Clan Praises)</h2>
  <div class="praise-box">
    <p><strong>Izithakazelo zakwaDlamini</strong></p>
    <p class="praise-text">"Mdlovu! Nkosi! Ngwane!<br>
    Wena kaNgwane, Sobhuza!<br>
    Mswati! Dlamini!"</p>
  </div>
</div>

<div class="section">
  <h2>Eswatini Today</h2>
  <p>Eswatini (formerly Swaziland) is one of Africa's last absolute monarchies. The nation successfully maintained its independence during the Scramble for Africa through skilled diplomacy with both British and Boer powers. Despite modern challenges, the Swati people maintain a strong sense of cultural identity and national pride rooted in their royal heritage.</p>
</div>

<hr>

<p class="story-footer"><em>This story is part of the Izithakazelo heritage collection.</em></p>
</div>`
    },
    {
      id: 4,
      title: "The Ndebele Artistic Legacy",
      content: `<div class="story-content">

<h1>The Ndebele Artistic Legacy</h1>

<p class="lead">The Ndebele people (amaNdebele) are renowned worldwide for their vibrant geometric art. Their history is tied to the broader Nguni group, with distinct Southern and Northern branches.</p>

<div class="divider"></div>

<div class="section">
  <h2>The Art of the Ndebele</h2>
  <ul class="leaders-list">
    <li><strong>Vibrant Geometric Patterns</strong> - Bold, colorful shapes including triangles, chevrons, and zigzags that carry deep cultural meaning.</li>
    <li><strong>Home Painting</strong> - Traditionally, women painted the exterior of their homes as a form of communication and cultural expression, especially during apartheid when other forms of speech were restricted.</li>
    <li><strong>Beadwork</strong> - Intricate patterns on aprons, shawls, and neck rings (isigolwani) that convey social status and life milestones.</li>
  </ul>
</div>

<div class="section">
  <h2>Southern Ndebele History</h2>
  <p>The Southern Ndebele developed a unique cultural identity, centered around Mokopane and KwaMhlanga in Mpumalanga and Gauteng. They maintained their traditions despite displacement and cultural pressure during colonial and apartheid eras.</p>
</div>

<div class="section">
  <h2>Izithakazelo (Clan Praises)</h2>
  <div class="praise-box">
    <p><strong>Izithakazelo zakwaNdebele</strong></p>
    <p class="praise-text">"Mthombeni! Mahlangu!<br>
    Somcuba! Ndzundza!<br>
    Manala! Kekana!"</p>
  </div>
</div>

<div class="section">
  <h2>Global Recognition</h2>
  <p>Ndebele art is recognized worldwide, featured in major galleries including the British Museum and the Smithsonian. Artists like Esther Mahlangu have brought Ndebele designs to the global stage, painting on BMW cars and exhibiting internationally.</p>
</div>

<hr>

<p class="story-footer"><em>This story is part of the Izithakazelo heritage collection.</em></p>
</div>`
    },
    {
      id: 5,
      title: "The Tswana Trading Empire",
      content: `<div class="story-content">

<h1>The Tswana Trading Empire</h1>

<p class="lead">The Tswana people (Batswana) established powerful states such as the Bakwena, Bangwaketse, Barolong, and Bakgatla, positioned along important trade routes across the Kalahari Desert.</p>

<div class="divider"></div>

<div class="section">
  <h2>Trade and Economy</h2>
  <p>The Tswana were strategically located along trade routes connecting the interior to the coast. They traded in:</p>
  <ul class="leaders-list">
    <li><strong>Ivory</strong> - Highly valued in coastal and European markets</li>
    <li><strong>Ostrich feathers</strong> - A fashionable commodity in 19th-century Europe</li>
    <li><strong>Copper and iron</strong> - Extracted and traded for other goods</li>
    <li><strong>Cattle</strong> - The foundation of wealth and social status</li>
  </ul>
</div>

<div class="section">
  <h2>Great Leaders</h2>
  <ul class="leaders-list">
    <li><strong>Sir Seretse Khama</strong> - The first president of Botswana, who led the nation to independence and transformed it into one of Africa's most stable democracies.</li>
    <li><strong>Ian Khama</strong> - Son of Seretse, who also served as president of Botswana.</li>
    <li><strong>Chief Bathoen I</strong> - A prominent 19th-century leader of the Bangwaketse.</li>
  </ul>
</div>

<div class="section">
  <h2>Izithakazelo (Clan Praises)</h2>
  <div class="praise-box">
    <p><strong>Izithakazelo zakwaTswana</strong></p>
    <p class="praise-text">"Mokgatla! Moilwa! Mosweu!<br>
    Mokibelo! Mmamogolo!<br>
    Kgetsi! Motshabi!"</p>
  </div>
</div>

<hr>

<p class="story-footer"><em>This story is part of the Izithakazelo heritage collection.</em></p>
</div>`
    },
    {
      id: 6,
      title: "The Venda Sacred Lake",
      content: `<div class="story-content">

<h1>The Venda Sacred Lake</h1>

<p class="lead">The Venda people (Vhavenda) are known for their sophisticated art, spiritual traditions, and connection to the sacred Lake Fundudzi, South Africa's only true natural freshwater lake.</p>

<div class="divider"></div>

<div class="section">
  <h2>Lake Fundudzi Legends</h2>
  <p>The lake, located in the Soutpansberg mountains, is considered the resting place of the python god Ndadzi. Sacred beliefs surrounding the lake include:</p>
  <ul class="leaders-list">
    <li>It is believed that no one can swim in the lake without being claimed by the ancestors</li>
    <li>The "floating" plants on the lake are said to be the hair of drowned maidens</li>
    <li>A white python, the messenger of Ndadzi, is said to appear at the lake</li>
    <li>Only traditional healers and appointed custodians may approach the lake</li>
  </ul>
</div>

<div class="section">
  <h2>Venda Art and Culture</h2>
  <ul class="leaders-list">
    <li><strong>Woodcarving</strong> - Renowned for detailed wooden sculptures, drums, headrests, and ceremonial objects</li>
    <li><strong>Domba (Python Dance)</strong> - A pre-marriage dance performed by young maidens, symbolizing fertility and the serpent's movement</li>
    <li><strong>Thavhuyada (Domba School)</strong> - The final phase of female initiation, ending with the famous python dance</li>
  </ul>
</div>

<div class="section">
  <h2>Izithakazelo (Clan Praises)</h2>
  <div class="praise-box">
    <p><strong>Izithakazelo zakwaVenda</strong></p>
    <p class="praise-text">"Thovhele! Masia!<br>
    Ramabulana! Mudau!<br>
    Mphephu! Netshiavha!<br>
    Tshivhase! Ralushai!"</p>
  </div>
</div>

<hr>

<p class="story-footer"><em>This story is part of the Izithakazelo heritage collection.</em></p>
</div>`
    },
    {
      id: 7,
      title: "The Tsonga Coastal Heritage",
      content: `<div class="story-content">

<h1>The Tsonga Coastal Heritage</h1>

<p class="lead">The Tsonga people (Vatsonga) settled along the coastal plains of Mozambique, South Africa, and Zimbabwe, known as skilled fishermen, traders, and farmers.</p>

<div class="divider"></div>

<div class="section">
  <h2>Music and Dance</h2>
  <ul class="leaders-list">
    <li><strong>Shangaan Electro</strong> - A globally recognized music genre blending traditional Tsonga rhythms with electronic dance music, pioneered by artists like Nozinja and Sho Madjozi</li>
    <li><strong>Xibelani Dance</strong> - A traditional dance performed by women wearing colorful, ruffled skirts (xibelani), accompanied by rhythmic drumming</li>
    <li><strong>Makhwaya</strong> - Choral singing tradition influenced by Western hymns</li>
  </ul>
</div>

<div class="section">
  <h2>Spiritual Beliefs</h2>
  <p>Tsonga traditional beliefs center around:</p>
  <ul class="leaders-list">
    <li><strong>Swikwembu</strong> - Veneration of ancestors, who act as intermediaries between the living and the supreme being</li>
    <li><strong>Nhlamulo</strong> - The supreme being or creator</li>
    <li><strong>Tinyanga (Traditional Healers)</strong> - Diviners and herbalists who maintain spiritual and physical health</li>
  </ul>
</div>

<div class="section">
  <h2>Izithakazelo (Clan Praises)</h2>
  <div class="praise-box">
    <p><strong>Izithakazelo zakwaTsonga</strong></p>
    <p class="praise-text">"Hosi! Nkosi!<br>
    Baloyi! Chauke!<br>
    Mabunda! Maluleke!<br>
    Ngobeni! Hlongwane!"</p>
  </div>
</div>

<hr>

<p class="story-footer"><em>This story is part of the Izithakazelo heritage collection.</em></p>
</div>`
    },
    {
      id: 8,
      title: "The Pedi Mountain Kingdom",
      content: `<div class="story-content">

<h1>The Pedi Mountain Kingdom</h1>

<p class="lead">The Pedi (Bapedi) people established a powerful mountain kingdom with the capital at the fortified mountain of Thaba Mosego, strategically located near iron ore deposits.</p>

<div class="divider"></div>

<div class="section">
  <h2>King Thulare and the Rise of the Pedi</h2>
  <p>Under King Thulare (c. 1790-1824), the Pedi kingdom reached its peak. Thulare consolidated neighboring chiefdoms and controlled trade routes from the interior to the coast, dealing in ivory, skins, and grain. His reign brought prosperity and stability to the region.</p>
</div>

<div class="section">
  <h2>King Sekhukhune I: The Warrior King</h2>
  <p>Sekhukhune I fiercely resisted Boer and British colonial expansion:</p>
  <ul class="leaders-list">
    <li><strong>First Sekhukhune War (1876)</strong> - Sekhukhune defeated the Boers, inflicting heavy casualties and forcing them to retreat</li>
    <li><strong>Second Sekhukhune War (1878-1879)</strong> - The British, supported by Swazi allies, eventually captured Sekhukhune in November 1879. He was imprisoned but later released</li>
  </ul>
  <p>Sekhukhune's resistance inspired later generations of African resistance to colonialism.</p>
</div>

<div class="section">
  <h2>Ironworking and Economy</h2>
  <p>The Pedi were renowned ironworkers, mining and smelting iron for tools, weapons, and trade. The mountain was strategically located near iron ore deposits, giving the Pedi economic and military advantage.</p>
</div>

<div class="section">
  <h2>Izithakazelo (Clan Praises)</h2>
  <div class="praise-box">
    <p><strong>Izithakazelo zakwaPedi</strong></p>
    <p class="praise-text">"Marota! Kgaga!<br>
    Sekhukhune! Thobejane!<br>
    Kekana! Mphahlele!<br>
    Matlala! Masemola!"</p>
  </div>
</div>

<hr>

<p class="story-footer"><em>This story is part of the Izithakazelo heritage collection.</em></p>
</div>`
    }
  ];

  let updated = 0;

  for (const story of stories) {
    await prisma.featuredStory.update({
      where: { id: story.id },
      data: { content: story.content }
    });
    console.log(`Updated: ${story.title}`);
    updated++;
  }

  console.log(`\nComplete! Updated ${updated} stories with improved formatting.`);
  console.log('Refresh your story pages to see the changes!');

  await prisma.$disconnect();
}

updateStoryFormatting().catch(console.error);