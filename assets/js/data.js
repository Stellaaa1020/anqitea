/* ============================================================
   安祺与茶 · 唯一事实来源（普通 script，file:// 可用）
   页面引入顺序：data.js → i18n.js → main.js
   ============================================================ */
(function (g) {
  g.ANQI = {

    brand: {
      nameZh: '安祺与茶', nameEn: 'Anqi Tea',
      est: 2025,
      seriesZh: '雲鹊晓杯茶', seriesEn: 'Yunque Xiao Cup Tea',
      priceZh: '¥48–58 / 桶 · 每桶 10 杯', priceEn: '¥48–58 per tube · 10 cups',
      douyin: {
        authorZh: '@云鹊晓AQ',
        videos: [
          { vid: '7634383299120704362', url: 'https://v.douyin.com/eplkJ8SkjXE/',
            tZh: '年轻人也爱喝茶', tEn: 'Young people love tea too' },
          { vid: '7607684718892747627', url: 'https://v.douyin.com/gcPsNH-De0o/',
            tZh: '马年吉祥 · 各地习俗', tEn: 'Year of the Horse customs' }
        ]
      }
    },

    /* 按茶汤由浅到深排列（开发记录决策 8） */
    products: [
      {
        slug: 'biluochun', page: 'biluochun.html',
        nameZh: '碧蕴藏灵', nameEn: 'Jade Spirit',
        teaZh: '碧螺春 · 绿茶', teaEn: 'Biluochun · Green Tea',
        descZh: '嫩芽卷曲如螺，一口清鲜——杯底藏着的春天。',
        descEn: 'Tender buds curled like snails; one clean, fresh sip — spring hidden at the bottom of the cup.',
        originZh: '云南 · 大叶种鲜叶', originEn: 'Yunnan · Large-leaf varietal',
        liquorZh: '嫩绿明亮', liquorEn: 'Bright jade green',
        brewZh: '水温 80°C · 静置 2–3 分钟', brewEn: 'Water at 80°C · steep 2–3 min',
        storyZh: '「碧蕴藏灵」——碧色之中，藏着山灵。云南大叶种鲜叶，条索卷曲如螺、白毫隐翠；热水落下，嫩绿在杯底舒展，一口是清鲜的春天气。',
        storyEn: '"Jade Spirit" — the mountain\'s spirit hidden in green. Yunnan large-leaf buds curled like snails; hot water wakes the jade leaves at the cup\'s bottom. One sip: fresh spring air.',
        aromaZh: '嫩栗香与豆香，清扬干净', aromaEn: 'Fresh chestnut and bean aroma, clean and bright',
        tasteZh: '入口清鲜，回甘快而持久', tasteEn: 'Fresh on the palate, quick and lingering sweetness',
        tint: '#9CC26B',
        img: 'resources/products/biluochun/design.jpg', story: 'resources/products/biluochun/story.jpg'
      },
      {
        slug: 'shoumei', page: 'shoumei.html',
        nameZh: '百福白茶', nameEn: 'Hundred Blessings',
        teaZh: '寿眉 · 白茶', teaEn: 'Shou Mei · White Tea',
        descZh: '自然萎凋的寿眉，枣香蜜韵，百福入盏。',
        descEn: 'Naturally withered Shou Mei — jujube and honey notes, a hundred blessings in one cup.',
        originZh: '福建 · 福鼎', originEn: 'Fuding · Fujian',
        liquorZh: '杏黄清透', liquorEn: 'Clear apricot gold',
        brewZh: '水温 85–90°C · 静置 3 分钟', brewEn: 'Water at 85–90°C · steep 3 min',
        storyZh: '「百福」谐音「白福」。福鼎寿眉不炒不揉、自然萎凋，晒足阳光的叶片看似粗犷，出汤却意外温柔——枣香甜润，像把一百个祝福装进一只杯。',
        storyEn: '"Hundred Blessings" puns on white tea\'s fu. Fuding Shou Mei is neither pan-fired nor rolled — sun-withered leaves that brew gentle: jujube sweetness, a hundred blessings in one cup.',
        aromaZh: '枣香清甜，带日光气', aromaEn: 'Sun-sweet jujube aroma',
        tasteZh: '甜润顺滑，越泡越柔', tasteEn: 'Smooth and sweet, softer with each steep',
        tint: '#D9B36A',
        img: 'resources/products/shoumei/design.jpg', story: 'resources/products/shoumei/story.jpg'
      },
      {
        slug: 'mayu', page: 'mayu.html',
        nameZh: '马跃新程', nameEn: 'Leaping Steed',
        teaZh: '大红袍 & 普洱 · 乌龙 / 黑茶', teaEn: "Da Hong Pao & Pu'er · Oolong / Dark Tea",
        descZh: '岩骨花香与陈醇回甘，一桶双味，跃向新程。',
        descEn: "Da Hong Pao's mineral florals meet Pu'er's mellow depth — two journeys in one tube.",
        originZh: '武夷山 & 云南', originEn: 'Wuyishan & Yunnan',
        liquorZh: '橙红透亮', liquorEn: 'Bright amber red',
        brewZh: '见双口味冲泡建议', brewEn: 'See brewing notes per flavor',
        storyZh: '马年推出的双味桶：一杯武夷山大红袍，一杯云南普洱——岩骨花香在前，陈醇温润在后。马跃新程，愿新的一年每一程都有好茶。',
        storyEn: "A Horse-Year double: Wuyishan Da Hong Pao and Yunnan Pu'er in one tube — mineral florals first, mellow age behind. Leaping into the new year, good tea on every road.",
        aromaZh: '大红袍岩骨花香 · 普洱陈香沉稳', aromaEn: "Da Hong Pao\'s rock florals · Pu\'er\'s settled age",
        tasteZh: '岩韵回甘 · 醇厚温润', tasteEn: 'Lingering rock rhyme · mellow and warm',
        tint: '#8A5A33',
        flavors: [
          { nameZh: '大红袍', nameEn: 'Da Hong Pao',
            originZh: '福建 · 武夷山', originEn: 'Wuyishan · Fujian',
            brewZh: '水温 95°C · 可续泡 3 次', brewEn: 'Water at 95°C · 3+ infusions' },
          { nameZh: '普洱', nameEn: "Pu'er",
            originZh: '云南', originEn: 'Yunnan',
            brewZh: '沸水冲泡 · 首泡润茶', brewEn: 'Boiling water · rinse the first infusion' }
        ],
        img: 'resources/products/mayu/design.jpg', story: 'resources/products/mayu/story.jpg'
      },
      {
        slug: 'dianhong', page: 'dianhong.html',
        nameZh: '金鹊祥雲', nameEn: 'Magpie of Auspicious Clouds',
        teaZh: '滇红 · 红茶', teaEn: 'Dian Hong · Black Tea',
        descZh: '凤庆滇红，金毫显露，蜜香似祥云漫盏。',
        descEn: 'Fengqing Dian Hong with golden tips — honey sweetness like clouds drifting across the cup.',
        originZh: '云南 · 凤庆', originEn: 'Fengqing · Yunnan',
        liquorZh: '红艳带金圈', liquorEn: 'Vivid red with a golden ring',
        brewZh: '水温 90°C · 静置 3 分钟', brewEn: 'Water at 90°C · steep 3 min',
        storyZh: '「金鹊祥雲」——金鹊踏着祥云来。凤庆滇红金毫满披，红艳的茶汤外圈泛着金边；蜜香入口，喜气也跟着入了盏。',
        storyEn: '"The Magpie of Auspicious Clouds" — a golden magpie rides in. Fengqing Dian Hong tipped in gold brews a vivid red ringed with light; honey sweetness, and good fortune, in the cup.',
        aromaZh: '蜜香馥郁，带薯甜', aromaEn: 'Rich honey with sweet-potato notes',
        tasteZh: '甜醇饱满，收口干净', tasteEn: 'Full and sweet, clean finish',
        tint: '#C0492B',
        img: 'resources/products/dianhong/design.jpg', story: 'resources/products/dianhong/story.jpg'
      }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);
