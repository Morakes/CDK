import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 创建游戏数据
  const games = await Promise.all([
    prisma.game.create({
      data: {
        name: '绝区零',
        cover:
          'https://img.3dmgame.com/uploads/images/news/20230724/1690162030_948713.jpg',
      },
    }),
    prisma.game.create({
      data: {
        name: '鸣潮',
        cover:
          'https://img.3dmgame.com/uploads/images/news/20230724/1690162030_948713.jpg',
      },
    }),
    prisma.game.create({
      data: {
        name: '原神',
        cover:
          'https://img.3dmgame.com/uploads/images/news/20230724/1690162030_948713.jpg',
      },
    }),
    prisma.game.create({
      data: {
        name: '星穹铁道',
        cover:
          'https://img.3dmgame.com/uploads/images/news/20230724/1690162030_948713.jpg',
      },
    }),
  ]);

  // 创建轮播图数据
  await prisma.banner.createMany({
    data: [
      {
        imageUrl:
          'https://haowallpaper.com/link/common/file/getCroppingImg/15188352915705152',
        order: 0,
        isActive: true,
      },
      {
        imageUrl:
          'https://haowallpaper.com/link/common/file/getCroppingImg/15274494849158464',
        order: 1,
        isActive: true,
      },
      {
        imageUrl:
          'https://haowallpaper.com/link/common/file/getCroppingImg/a9045286aa9b50dcc09302eff83b328a',
        order: 2,
        isActive: true,
      },
      {
        imageUrl:
          'https://haowallpaper.com/link/common/file/getCroppingImg/15465600005345600',
        order: 3,
        isActive: true,
      },
    ],
  });

  // 为每个游戏创建兑换码
  for (const game of games) {
    await prisma.cDK.createMany({
      data: [
        {
          title: `${game.name}测试兑换码1`,
          code: `TEST-${game.name}-001`,
          reward: '测试奖励1',
          isValid: true,
          endTime: new Date('2025-12-31'),
          gameId: game.id,
        },
        {
          title: `${game.name}测试兑换码2`,
          code: `TEST-${game.name}-002`,
          reward: '测试奖励2',
          isValid: true,
          endTime: new Date('2025-12-31'),
          gameId: game.id,
        },
      ],
    });
  }

  console.log('数据填充完成');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
