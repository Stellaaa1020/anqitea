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
        tint: '#9CC26B',
        img: 'assets/img/design-biluochun.jpg', story: 'assets/img/story-biluochun.jpg'
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
        tint: '#D9B36A',
        img: 'assets/img/design-shoumei.jpg', story: 'assets/img/story-shoumei.jpg'
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
        tint: '#8A5A33',
        flavors: [
          { nameZh: '大红袍', nameEn: 'Da Hong Pao',
            originZh: '福建 · 武夷山', originEn: 'Wuyishan · Fujian',
            brewZh: '水温 95°C · 可续泡 3 次', brewEn: 'Water at 95°C · 3+ infusions' },
          { nameZh: '普洱', nameEn: "Pu'er",
            originZh: '云南', originEn: 'Yunnan',
            brewZh: '沸水冲泡 · 首泡润茶', brewEn: 'Boiling water · rinse the first infusion' }
        ],
        img: 'assets/img/design-mayu.jpg', story: 'assets/img/story-mayu.jpg'
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
        tint: '#C0492B',
        img: 'assets/img/design-dianhong.jpg', story: 'assets/img/story-dianhong.jpg'
      }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);
