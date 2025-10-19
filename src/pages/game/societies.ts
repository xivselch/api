import type { APIRoute } from 'astro';

/**
 * GET /game/societies
 * @summary Get beast tribe societies data
 * @description Returns information about beast tribe societies and their reputation systems
 * @tag Game Data
 * @response 200 - A JSON array of society entries
 * @responseContent {SocietyEntry[]} 200.application/json
 */

const ranks = [
  { name: 'None', repRequired: null },
  { name: 'Neutral', repRequired: 150 },
  { name: 'Recognized', repRequired: 360 },
  { name: 'Friendly', repRequired: 510 },
  { name: 'Trusted', repRequired: 720 },
  { name: 'Respected', repRequired: 990 },
  { name: 'Honored', repRequired: 1320 },
  { name: 'Sworn', repRequired: 1730 },
  { name: 'Bloodsworn', repRequired: 0 },
  { name: 'Allied', repRequired: 0 },
];

function getIcon(path: string) {
  return `https://v2.xivapi.com/api/asset?path=${path}&format=png`;
}

export const GET: APIRoute = () => {
  return Response.json([
    {
      name: "Amalj'aa",
      href: "https://ffxiv.consolegameswiki.com/wiki/Amalj'aa_Daily_Quests",
      patch: { name: 'A Realm Reborn', version: '2.1' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065016_hr1.tex'),
      ranks: [0, 1, 2, 3, 4, 9].map(i => ranks[i]),
      repPerQuest: [10, 14, 20],
    },
    {
      name: 'Sylphs',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Sylph_Daily_Quests',
      patch: { name: 'A Realm Reborn', version: '2.1' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065017_hr1.tex'),
      ranks: [0, 1, 2, 3, 4, 9].map(i => ranks[i]),
      repPerQuest: [10, 14, 20],
    },
    {
      name: 'Kobolds',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Kobold_Daily_Quests',
      patch: { name: 'A Realm Reborn', version: '2.2' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065019_hr1.tex'),
      ranks: [0, 1, 2, 3, 4, 9].map(i => ranks[i]),
      repPerQuest: [10, 14, 20],
    },
    {
      name: 'Sahagin',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Sahagin_Daily_Quests',
      patch: { name: 'A Realm Reborn', version: '2.2' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065020_hr1.tex'),
      ranks: [0, 1, 2, 3, 4, 9].map(i => ranks[i]),
      repPerQuest: [10, 14, 20],
    },
    {
      name: 'Ixali',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Ixali_Daily_Quests',
      patch: { name: 'A Realm Reborn', version: '2.35' },
      type: ['Crafting', 'Gathering', 'Battle'],
      icon: getIcon('ui/icon/065000/065018_hr1.tex'),
      ranks: [0, 1, 2, 3, 4, 5, 6, 7, 9].map(i => ranks[i]),
      repPerQuest: [20, 24, 29, 35, 42, 50],
    },
    {
      name: 'Vanu Vanu',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Vanu_Vanu_Daily_Quests',
      patch: { name: 'Heavensward', version: '3.1' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065036_hr1.tex'),
      ranks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ranks[i]),
      repPerQuest: [50],
    },
    {
      name: 'Vath',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Vath_Daily_Quests',
      patch: { name: 'Heavensward', version: '3.2' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065037_hr1.tex'),
      ranks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ranks[i]),
      repPerQuest: [70],
    },
    {
      name: 'Moogle',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Moogle_Daily_Quests',
      patch: { name: 'Heavensward', version: '3.3' },
      type: 'Crafting',
      icon: getIcon('ui/icon/065000/065039_hr1.tex'),
      ranks: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => ranks[i]),
      repPerQuest: [50],
    },
    {
      name: 'Kojin',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Kojin_Daily_Quests',
      patch: { name: 'Stormblood', version: '4.1' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065048_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8, 9].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Ananta',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Ananta_Daily_Quests',
      patch: { name: 'Stormblood', version: '4.2' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065047_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8, 9].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Namazu',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Namazu_Daily_Quests',
      patch: { name: 'Stormblood', version: '4.3' },
      type: 'Crafting / Gathering',
      icon: getIcon('ui/icon/065000/065049_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8, 9].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Pixies',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Pixie_Daily_Quests',
      patch: { name: 'Shadowbringers', version: '5.1' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065072_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Qitari',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Qitari_Daily_Quests',
      patch: { name: 'Shadowbringers', version: '5.2' },
      type: 'Gathering',
      icon: getIcon('ui/icon/065000/065076_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Dwarves',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Dwarf_Daily_Quests',
      patch: { name: 'Shadowbringers', version: '5.3' },
      type: 'Crafting',
      icon: getIcon('ui/icon/065000/065079_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Arkasodara',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Arkasodara_Daily_Quests',
      patch: { name: 'Endwalker', version: '6.1' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065092_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8, 9].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Omicrons',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Omicron_Daily_Quests',
      patch: { name: 'Endwalker', version: '6.2' },
      type: 'Gathering',
      icon: getIcon('ui/icon/065000/065093_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8, 9].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Loporrits',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Loporrit_Daily_Quests',
      patch: { name: 'Endwalker', version: '6.3' },
      type: 'Crafting',
      icon: getIcon('ui/icon/065000/065101_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8, 9].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Pelupelu',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Pelupelu_Daily_Quests',
      patch: { name: 'Dawntrail', version: '7.1' },
      type: 'Battle',
      icon: getIcon('ui/icon/065000/065113_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Mamool Ja',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Mamool_Ja_Daily_Quests',
      patch: { name: 'Dawntrail', version: '7.2' },
      type: 'Gathering',
      icon: getIcon('ui/icon/065000/065115_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8].map(i => ranks[i]),
      repPerQuest: [60],
    },
    {
      name: 'Yok Huy',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Yok_Huy_Daily_Quests',
      patch: { name: 'Dawntrail', version: '7.3' },
      type: 'Crafting',
      icon: getIcon('ui/icon/065000/065131_hr1.tex'),
      ranks: [2, 3, 4, 5, 6, 7, 8].map(i => ranks[i]),
      repPerQuest: [60],
    },
  ]);
};
