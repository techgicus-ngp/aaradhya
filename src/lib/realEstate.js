import data from '../data/Merged_Real_Estate_Maps.json';

// "Hanuman  Vatika" / "HANUMAN VATIKA" / "hanuman-vatika" all become "hanumanvatika"
const norm = (s) => String(s ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');

const titleCase = (s) =>
  s ? String(s).replace(/\b[a-z]/g, (c) => c.toUpperCase()) : null;

const mapIndex = new Map(data.maps.map((m) => [norm(m.mapName), m]));

/* Returns { map, plot } for the open map name + plot number, or {} if not found */
export function lookupPlot(mapName, plotNo) {
  const map = mapIndex.get(norm(mapName));
  if (!map) return {};
  const plot = map.plots.find((p) => String(p.plotNo) === String(plotNo));
  return {
    map: {
      name: map.mapName,
      khNo: map.khNo,
      mouza: titleCase(map.mouza), // "kharsoli pipla" becomes "Kharsoli Pipla"
    },
    plot: plot || null,
  };
}