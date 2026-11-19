// Automatische Prüfung der Stammbaum-App (nur mit ERFUNDENER Familie Weber).
// Start im Projektordner:   node test/pruefung.js
// Optional mit Vorschaubild: node test/pruefung.js --bild   (speichert test/vorschau.png – nicht hochladen nötig)
// Braucht Playwright + Chromium (in der Claude-Cloud vorinstalliert).
const { chromium } = require('playwright');
const path = require('path');

let fehler = 0;
function ok(bed, text) { console.log((bed ? '  ✓ ' : '  ✗ ') + text); if (!bed) fehler++; }

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 412, height: 860 } });
  page.on('pageerror', e => { console.log('  ✗ Fehler in der Seite: ' + e.message); fehler++; });
  page.on('dialog', d => d.accept());   // confirm()/alert() automatisch bestätigen
  await page.goto('file://' + path.resolve(__dirname, '..', 'index.html'));

  // ---------- Erfundene Familie: Tim + Lena sind Partner, Lena aber versehentlich auch Kind von Tims Eltern ----------
  await page.evaluate(() => {
    const d = emptyData(); const add = o => { const p = newPerson(o); d.persons[p.id] = p; return p.id; };
    const ka = add({ firstName: 'Karl', lastName: 'Weber', gender: 'm', birthDate: '1950' });
    const ma = add({ firstName: 'Maria', lastName: 'Weber', gender: 'w', birthDate: '1952' });
    const ti = add({ firstName: 'Tim', lastName: 'Weber', gender: 'm', birthDate: '1977', father: ka, mother: ma });
    const le = add({ firstName: 'Lena', lastName: 'Weber', gender: 'w', birthDate: '1980', father: ka, mother: ma });
    const an = add({ firstName: 'Anna', lastName: 'Weber', gender: 'w', birthDate: '2010', father: ti, mother: le });
    d.persons[ka].spouses = [ma]; d.persons[ma].spouses = [ka];
    d.persons[ti].spouses = [le]; d.persons[le].spouses = [ti];
    d.rootId = ka; d.focusId = ka; data = d; save();
    window.__ids = { ka, ma, ti, le, an };
  });

  console.log('Widersprüchliche Verbindungen:');
  const doppeltImBaum = async focus => page.evaluate(f => {
    data.focusId = __ids[f]; renderTree(true);
    const ids = [...document.querySelectorAll('#viewport g.card')].map(g => g.dataset.id);
    return ids.length - new Set(ids).size;
  }, focus);
  ok(await page.evaluate(() => findConflicts().length) === 1, 'Partner + Geschwister wird als Widerspruch erkannt');
  ok(await page.evaluate(() => findDuplicates().length) === 0, 'wird NICHT fälschlich als doppelt gespeichert gemeldet');
  for (const f of ['ka', 'ti', 'le', 'an']) ok(await doppeltImBaum(f) === 0, `Baum mit ${f} in der Mitte: niemand doppelt gezeichnet`);

  // Detailansicht zeigt Warnung + Knöpfe
  await page.evaluate(() => openDetail(__ids.le));
  ok(await page.locator('#sheet .conflict').count() === 1, 'Detailansicht zeigt den Widerspruch');
  const knopf = page.locator('#sheet button[data-fix^="nosib:"]').last();   // „Lena ist kein Geschwister“
  ok((await knopf.textContent()).includes('Lena'), 'Knopf zum Lösen nennt die richtige Person');
  await knopf.click();
  const nach = await page.evaluate(() => ({ c: findConflicts().length, le: data.persons[__ids.le], ti: data.persons[__ids.ti] }));
  ok(nach.c === 0, 'nach dem Lösen kein Widerspruch mehr');
  ok(!nach.le.father && !nach.le.mother, 'Lena hängt nicht mehr an Tims Eltern');
  ok(nach.le.spouses.includes(nach.ti.id), 'Partner-Verbindung bleibt erhalten');

  // Eltern-Partner-Widerspruch
  const par = await page.evaluate(() => { const a = data.persons[__ids.an]; a.spouses = [__ids.ti]; data.persons[__ids.ti].spouses.push(a.id); return findConflicts().map(c => c.kind); });
  ok(par.includes('par'), 'Partner + Elternteil wird erkannt');
  await page.evaluate(() => { const c = findConflicts().find(x => x.kind === 'par'); fixConflict(c, 'nospouse'); });
  ok(await page.evaluate(() => findConflicts().length) === 0, 'Partner-Verbindung lösen behebt ihn');

  console.log('Echte Doppelte:');
  const dup = await page.evaluate(() => {
    const p = newPerson({ firstName: 'Tim', lastName: 'Weber', gender: 'm', birthDate: '1977' }); data.persons[p.id] = p;
    const g = findDuplicates(); if (g.length !== 1) return { n: g.length };
    mergeInto(g[0][0].id, g[0][1].id); return { n: 1, after: findDuplicates().length, keepHasParents: !!data.persons[__ids.ti].father };
  });
  ok(dup.n === 1, 'gleicher Name + Geburtsjahr wird als doppelt erkannt');
  ok(dup.after === 0 && dup.keepHasParents, 'Zusammenführen behält den Eintrag mit Verbindungen');

  console.log('Farben:');
  const farbe = await page.evaluate(() => getComputedStyle(document.querySelector('header')).backgroundColor);
  ok(farbe === 'rgb(0, 45, 114)', 'Kopfzeile in Mets-Blau (' + farbe + ')');

  console.log('Update der App:');
  const upd = await page.evaluate(async () => {
    const echt = window.fetch, r = {};
    window.fetch = async () => new Response("const APP_VERSION = '2099-01-01 Nr. 999';");
    await checkUpdate(false); r.neu = !!document.getElementById('updBar');
    document.getElementById('updBar').remove();
    window.fetch = async () => new Response("const APP_VERSION = '" + APP_VERSION + "';");
    await checkUpdate(false); r.gleich = !document.getElementById('updBar');
    window.fetch = async () => { throw new Error('offline'); };
    await checkUpdate(false); r.offline = !document.getElementById('updBar');
    window.fetch = echt; return r;
  });
  ok(upd.neu, 'neuere Version → Hinweis „Jetzt aktualisieren“ erscheint');
  ok(upd.gleich, 'gleiche Version → kein Hinweis');
  ok(upd.offline, 'ohne Internet → kein Absturz, kein Hinweis');
  ok(await page.evaluate(() => versionNo('2026-11-19 Nr. 33') === 33 && versionNo('x') === 0), 'Versionsnummer wird richtig gelesen');

  if (process.argv.includes('--bild')) {
    await page.evaluate(() => { closeSheet(); loadDemo(); });
    await page.screenshot({ path: path.resolve(__dirname, 'vorschau.png') });
    console.log('Vorschaubild: test/vorschau.png');
  }
  await browser.close();
  console.log(fehler ? `\n✗ ${fehler} Prüfung(en) fehlgeschlagen` : '\n✓ Alle Prüfungen bestanden');
  process.exit(fehler ? 1 : 0);
})();
