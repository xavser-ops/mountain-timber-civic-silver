import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { estimateCost, roomsNeeded } from "../src/lib/cost.ts";

describe("roomsNeeded", () => {
  it("packs a family of 4 into one room", () => {
    assert.equal(roomsNeeded(2, 2), 1);
  });
  it("adds a room from the 3rd child", () => {
    assert.equal(roomsNeeded(2, 3), 2);
  });
  it("gives two rooms to four adults", () => {
    assert.equal(roomsNeeded(4, 0), 2);
  });
  it("keeps a single adult in one room", () => {
    assert.equal(roomsNeeded(1, 0), 1);
  });
});

describe("estimateCost", () => {
  const base = {
    circuitId: "triangle",
    budget: "confort" as const,
    santa: false,
    season: "printemps" as const,
    duration: 7 as const,
  };

  it("does not price two children as two extra adults", () => {
    const couple = estimateCost({ ...base, adults: 2, children: 0 });
    const family = estimateCost({ ...base, adults: 2, children: 2 });
    const four = estimateCost({ ...base, adults: 4, children: 0 });
    assert.equal(family.rooms, 1);
    assert.equal(four.rooms, 2);
    assert.ok(family.mid > couple.mid);
    assert.ok(family.mid < four.mid);
  });

  it("adds a Santa line only when the slot is kept", () => {
    const on = estimateCost({
      circuitId: "laponie-express",
      budget: "confort",
      adults: 2,
      children: 1,
      santa: true,
      season: "hiver",
      duration: 7,
    });
    const off = estimateCost({
      circuitId: "laponie-express",
      budget: "confort",
      adults: 2,
      children: 1,
      santa: false,
      season: "hiver",
      duration: 7,
    });
    assert.ok(on.lines.some((l) => l.id === "santa"));
    assert.equal(
      off.lines.some((l) => l.id === "santa"),
      false,
    );
    assert.ok(on.mid > off.mid);
  });

  it("prices Lapland winter above summer for the same party", () => {
    const winter = estimateCost({
      circuitId: "mix-hel-lap",
      budget: "confort",
      adults: 2,
      children: 0,
      santa: false,
      season: "hiver",
      duration: 10,
    });
    const summer = estimateCost({
      circuitId: "mix-hel-lap",
      budget: "confort",
      adults: 2,
      children: 0,
      santa: false,
      season: "ete",
      duration: 10,
    });
    assert.ok(winter.mid > summer.mid);
  });

  it("prices a full 15 j assembly, not a 10 j core", () => {
    const c = estimateCost({
      circuitId: "triangle-laponie",
      budget: "confort",
      adults: 2,
      children: 0,
      santa: false,
      season: "automne",
      duration: 15,
    });
    assert.match(c.note, /7 j \+ 8 j/);
    assert.ok(c.lines.every((l) => l.amount > 0));
    const ten = estimateCost({
      circuitId: "mix-hel-lap",
      budget: "confort",
      adults: 2,
      children: 0,
      santa: false,
      season: "automne",
      duration: 10,
    });
    assert.ok(c.mid > ten.mid);
  });
});
