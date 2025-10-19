import type { APIRoute } from 'astro';

function getIcon(path: string) {
  return `https://v2.xivapi.com/api/asset?path=${path}&format=png`;
}

/**
 * GET /game/deliveries
 * @summary Get delivery satisfaction NPCs
 * @description Get all delivery satisfaction NPCs and their requirements.
 * @tag Game Data
 * @response 200 - A JSON array of delivery entries
 * @responseContent {DeliveryEntry[]} 200.application/json
 */
export const GET: APIRoute = () => {
  return Response.json([
    {
      name: 'Zhloe Aliapoh',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Zhloe_Aliapoh',
      icon: getIcon('ui/icon/061000/061661_hr1.tex'),
      icon_alt: null,
      level: 55,
      patch: { name: 'Heavensward', version: '3.55a' },
    },
    {
      name: "M'naago",
      href: "https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/M'naago",
      icon: getIcon('ui/icon/061000/061662_hr1.tex'),
      icon_alt: null,
      level: 60,
      patch: { name: 'Stormblood', version: '4.1' },
    },
    {
      name: 'Kurenai',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Kurenai',
      icon: getIcon('ui/icon/061000/061663_hr1.tex'),
      icon_alt: null,
      level: 62,
      patch: { name: 'Stormblood', version: '4.3' },
    },
    {
      name: 'Adkiragh',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Adkiragh',
      icon: getIcon('ui/icon/061000/061664_hr1.tex'),
      icon_alt: null,
      level: 66,
      patch: { name: 'Stormblood', version: '4.5' },
    },
    {
      name: 'Kai-Shirr',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Kai-Shirr',
      icon: getIcon('ui/icon/061000/061665_hr1.tex'),
      icon_alt: null,
      level: 70,
      patch: { name: 'Shadowbringers', version: '5.1' },
    },
    {
      name: 'Ehll Tou',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Ehll_Tou',
      icon: getIcon('ui/icon/061000/061668_hr1.tex'),
      icon_alt: [
        getIcon('ui/icon/061000/061666_hr1.tex'),
        getIcon('ui/icon/061000/061667_hr1.tex'),
      ],
      level: 70,
      patch: { name: 'Shadowbringers', version: '5.3' },
    },
    {
      name: 'Charlemend',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Charlemend',
      icon: getIcon('ui/icon/061000/061669_hr1.tex'),
      icon_alt: null,
      level: 70,
      patch: { name: 'Shadowbringers', version: '5.5' },
    },
    {
      name: 'Ameliance',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Ameliance',
      icon: getIcon('ui/icon/061000/061670_hr1.tex'),
      icon_alt: null,
      level: 80,
      patch: { name: 'Endwalker', version: '6.15' },
    },
    {
      name: 'Anden',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Anden',
      icon: getIcon('ui/icon/061000/061672_hr1.tex'),
      icon_alt: [getIcon('ui/icon/061000/061671_hr1.tex')],
      level: 80,
      patch: { name: 'Endwalker', version: '6.3' },
    },
    {
      name: 'Margrat',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Margrat',
      icon: getIcon('ui/icon/061000/061673_hr1.tex'),
      icon_alt: null,
      level: 80,
      patch: { name: 'Endwalker', version: '6.5' },
    },
    {
      name: 'Nitowikwe',
      href: 'https://ffxiv.consolegameswiki.com/wiki/Custom_Deliveries/Nitowikwe',
      icon: getIcon('ui/icon/061000/061674_hr1.tex'),
      icon_alt: null,
      level: 90,
      patch: { name: 'Dawntrail', version: '7.15' },
    },
  ]);
};
