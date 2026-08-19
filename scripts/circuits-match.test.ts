import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { matchCircuits } from "../src/lib/match-circuits.ts";
import { santaDefault, seasonFromDate, slotFromTime } from "../src/lib/season.ts";
import { adaptCircuit } from "../src/lib/adapt-circuit.ts";
import { circuitById } from "../src/lib/circuits.ts";
import { placePhotos } from "../src/lib/place-photo.ts";

describe("seasonFromDate", () => {
  it("maps the four product seasons", () => {
    assert.equal(seasonFromDate("2026-12-20"), "hiver");
    assert.equal(seasonFromDate("2027-03-15"), "hiver");
    assert.equal(seasonFromDate("2027-04-02"), "printemps");
    assert.equal(seasonFromDate("2027-06-21"), "ete");
    assert.equal(seasonFromDate("2026-09-18"), "automne");
    assert.equal(seasonFromDate("2026-11-02"), "hiver");
  });
});

describe("matchCircuits", () => {
  it("keeps Helsinki as first city on 7j UNESCO & bois", () => {
    const matches = matchCircuits({
      duration: 7,
      season: "automne",
      airport: "HEL",
    });
    const bois = matches.find((m) => m.circuit.id === "unesco-bois");
    assert.ok(bois);
    assert.equal(bois.circuit.firstCity, "Helsinki");
    assert.equal(bois.circuit.days[0].night, "Helsinki");
  });

  it("maps 3j to Helsinki weekend only", () => {
    const matches = matchCircuits({
      duration: 3,
      season: "ete",
      airport: "HEL",
    });
    assert.deepEqual(
      matches.map((m) => m.circuit.id),
      ["we-helsinki"],
    );
  });

  it("maps 7j premier séjour to triangle, with bois and lapland as options", () => {
    const matches = matchCircuits({
      duration: 7,
      season: "printemps",
      airport: "HEL",
    });
    assert.equal(matches[0].circuit.id, "triangle");
    assert.equal(matches[0].role, "primary");
    assert.deepEqual(
      matches.map((m) => m.circuit.id),
      ["triangle", "unesco-bois", "laponie-express"],
    );
  });

  it("maps 10j hiver to mix, not côte", () => {
    const matches = matchCircuits({
      duration: 10,
      season: "hiver",
      airport: "HEL",
    });
    assert.equal(matches[0].circuit.id, "mix-hel-lap");
    assert.equal(
      matches.some((m) => m.circuit.id === "cote-sud"),
      false,
    );
    assert.equal(
      matches.some((m) => m.circuit.id === "laponie-express"),
      false,
    );
  });

  it("does not offer 7j Laponie express for a 15j winter trip", () => {
    const matches = matchCircuits({
      duration: 15,
      season: "hiver",
      airport: "HEL",
    });
    assert.deepEqual(
      matches.map((m) => m.circuit.id),
      ["triangle-laponie", "mix-plus"],
    );
    assert.equal(matches[0].circuit.duration, 15);
    assert.equal(matches[0].circuit.nights, 14);
    assert.equal(matches[0].circuit.days.length, 15);
    assert.equal(matches[0].circuit.days.at(-2)?.night, "Helsinki");
  });

  it("assembles autumn 15j as 7+8 or 10+5, not a 10j core", () => {
    const matches = matchCircuits({
      duration: 15,
      season: "automne",
      airport: "HEL",
    });
    assert.deepEqual(
      matches.map((m) => m.circuit.id),
      ["triangle-laponie", "cote-plus"],
    );
    assert.equal(
      matches.some((m) => m.circuit.duration === 10),
      false,
    );
  });

  it("prefers south 10+5 for summer 15j", () => {
    const [a] = matchCircuits({
      duration: 15,
      season: "ete",
      airport: "HEL",
    });
    assert.equal(a.circuit.id, "cote-plus");
    assert.equal(a.circuit.composition?.scheme, "10 j + 5 j");
  });

  it("maps 10j été to côte first", () => {
    const [a] = matchCircuits({
      duration: 10,
      season: "ete",
      airport: "HEL",
    });
    assert.equal(a.circuit.id, "cote-sud");
  });

  it("shares spring and autumn south ossature", () => {
    const spring = matchCircuits({
      duration: 7,
      season: "printemps",
      airport: "HEL",
    }).find((m) => m.circuit.id === "unesco-bois");
    const autumn = matchCircuits({
      duration: 7,
      season: "automne",
      airport: "HEL",
    }).find((m) => m.circuit.id === "unesco-bois");
    assert.equal(spring?.circuit.id, autumn?.circuit.id);
  });

  it("never proposes open-jaw: lapland ends in Helsinki", () => {
    const lap = matchCircuits({
      duration: 7,
      season: "hiver",
      airport: "HEL",
    }).find((m) => m.circuit.id === "laponie-express");
    assert.ok(lap);
    const lastNight = lap.circuit.days.at(-2)?.night;
    assert.equal(lastNight, "Helsinki");
  });

  it("RVN arrival stays in Lapland", () => {
    const [a] = matchCircuits({
      duration: 7,
      season: "hiver",
      airport: "RVN",
    });
    assert.equal(a.circuit.id, "laponie-express");
  });
});


describe("santaDefault", () => {
  it("is on for children all winter", () => {
    assert.equal(santaDefault("2027-02-10", true), true);
  });
  it("is off for adults in February", () => {
    assert.equal(santaDefault("2027-02-10", false), false);
  });
  it("is on for adults in December", () => {
    assert.equal(santaDefault("2026-12-18", false), true);
  });
  it("is off in summer", () => {
    assert.equal(santaDefault("2026-07-01", true), false);
  });
});

describe("adaptCircuit", () => {
  it("fills evening arrival with calm Helsinki, not Turku", () => {
    const circuit = circuitById("unesco-bois")!;
    const days = adaptCircuit({
      circuit,
      arrivalDate: "2026-09-14",
      season: "automne",
      arrivalSlot: "soir",
      departureSlot: "soir",
      pace: "equilibre",
      budget: "confort",
      santa: false,
    });
    assert.equal(days[0].city, "Helsinki");
    assert.match(days[0].slots[0].text, /vol|aéroport/i);
    assert.equal(days[1].city, "Helsinki");
  });

  it("swaps Santa when off", () => {
    const circuit = circuitById("laponie-express")!;
    const on = adaptCircuit({
      circuit,
      arrivalDate: "2026-12-10",
      season: "hiver",
      arrivalSlot: "apresmidi",
      departureSlot: "soir",
      pace: "equilibre",
      budget: "confort",
      santa: true,
    });
    const off = adaptCircuit({
      circuit,
      arrivalDate: "2027-02-10",
      season: "hiver",
      arrivalSlot: "apresmidi",
      departureSlot: "soir",
      pace: "equilibre",
      budget: "confort",
      santa: false,
    });
    assert.match(on[1].slots[1].text, /Père Noël/);
    assert.match(off[1].slots[1].text, /Remplaçant Santa/);
  });
});

describe("adaptCircuit pace", () => {
  const base = {
    arrivalDate: "2026-09-14",
    season: "automne" as const,
    arrivalSlot: "matin" as const,
    departureSlot: "soir" as const,
    budget: "confort" as const,
    santa: false,
  };

  it("keeps the balanced ossature unchanged", () => {
    const circuit = circuitById("unesco-bois")!;
    const days = adaptCircuit({ ...base, circuit, pace: "equilibre" });
    assert.equal(
      days.some((d) => d.slots.some((s) => s.flag === "extra" || s.flag === "skip")),
      false,
    );
  });

  it("marks skippable activities when lent, without dropping cities", () => {
    const circuit = circuitById("unesco-bois")!;
    const days = adaptCircuit({ ...base, circuit, pace: "lent" });
    assert.deepEqual(
      days.map((d) => d.city),
      adaptCircuit({ ...base, circuit, pace: "equilibre" }).map((d) => d.city),
    );
    const skips = days.flatMap((d) => d.slots.filter((s) => s.flag === "skip"));
    assert.ok(skips.length >= 4);
    assert.match(skips[0].text, /pas d’enfants|suffit|à la place/i);
  });

  it("adds a same-zone extra most days when soutenu", () => {
    const circuit = circuitById("unesco-bois")!;
    const days = adaptCircuit({ ...base, circuit, pace: "soutenu" });
    const extras = days.filter((d) => d.slots.some((s) => s.flag === "extra"));
    assert.ok(extras.length >= 5);
    const rauma = days.find((d) => d.city === "Rauma");
    assert.ok(rauma?.slots.some((s) => s.flag === "extra" && /Rauma|venelles|Otanlahti/i.test(s.text)));
    const last = days.at(-1);
    assert.equal(
      last?.slots.some((s) => s.flag === "extra"),
      false,
    );
  });
});

describe("slotFromTime", () => {
  it("splits matin / après-midi / soir", () => {
    assert.equal(slotFromTime("09:40"), "matin");
    assert.equal(slotFromTime("14:30"), "apresmidi");
    assert.equal(slotFromTime("21:05"), "soir");
  });
});

describe("placePhotos", () => {
  it("gives 2–3 distinct photos per city day", () => {
    const circuit = circuitById("triangle")!;
    const days = adaptCircuit({
      circuit,
      arrivalDate: "2026-09-09",
      season: "automne",
      arrivalSlot: "apresmidi",
      departureSlot: "soir",
      pace: "equilibre",
      budget: "confort",
      santa: false,
    });
    const j1 = placePhotos(days[0]).map((p) => p.caption);
    const j2 = placePhotos(days[1]).map((p) => p.caption);
    const j3 = placePhotos(days[2]).map((p) => p.caption);
    assert.equal(j1.length, 3);
    assert.equal(j2.length, 3);
    assert.ok(j3.length >= 2);
    assert.ok(j1.includes("Löyly") || j1.includes("Senaatintori"));
    assert.ok(j2.includes("Suomenlinna"));
    assert.ok(j2.includes("Temppeliaukio") || j2.includes("Oodi"));
    assert.notEqual(j2.join(), j3.join());
    assert.equal(placePhotos(days[days.length - 1]).length, 0);
  });
});
