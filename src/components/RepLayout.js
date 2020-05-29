import React, { useState, useEffect, useContext } from "react";
import Expac from "./Expac";
import UserContext from "../context/UserContext";

const alli = [47, 54, 69, 72, 930, 1134];
const noAlli = [
  510,
  947,
  1052,
  1067,
  1172,
  1375,
  1388,
  1445,
  1681,
  1708,
  1848,
  2103,
  2156,
  2157,
];
const hordeIDs = [68, 76, 81, 530, 911, 1133];
const noHorde = [
  509,
  946,
  1126,
  1376,
  1387,
  1682,
  1710,
  1731,
  1847,
  2159,
  2160,
  2161,
  2162,
];
const nobody = [
  67,
  469,
  1273,
  1275,
  1276,
  1277,
  1278,
  1279,
  1280,
  1281,
  1282,
  1283,
  1374,
  1419,
  1690,
  1691,
  1733,
  1736,
  1737,
  1738,
  1739,
  1740,
  1741,
  2010,
  2011,
  2111,
];

function RepLayout() {
  let user = useContext(UserContext);
  const [vanilla, setVanilla] = useState([]);
  const [bc, setBC] = useState([]);
  const [wrath, setWrath] = useState([]);
  const [cata, setCata] = useState([]);
  const [mop, setMop] = useState([]);
  const [wod, setWod] = useState([]);
  const [legion, setLegion] = useState([]);
  const [bfa, setBFA] = useState([]);
  const [alliance, setAlli] = useState([]);
  const [horde, setHorde] = useState([]);
  // eslint-disable-next-line
  const [guild, setGuild] = useState([]);
  let reps = user.reps;

  useEffect(() => {
    /*  Vanilla: 21-910
            BC: 930-1038 except 1037
            Wrath: 1050-1126
            Cata: 1134-1204 except 1168 (guild)
            Mop: 1269-1435
            Wod: 1445-1731 except 1691 (Brawlers Guild Season 2)
            Legion: 1828-2045,2165,2170 except 2011 (Brawlers Guild)
            Bfa: 2103-2159 except 2135
        */
    for (let rep of reps) {
      // var tempRep;
      if (nobody.includes(rep.faction.id)) {
        //This filters out faction "containers" like Alliance and Horde which
        // seem to only serve the purpose of holding the other factions
        // Also a follower, and the Brawlers Guild
      } else if (
        (user.faction && noAlli.includes(rep.faction.id)) ||
        (!user.faction && noHorde.includes(rep.faction.id))
      ) {
        //This filters out reputations only available to the other faction
      } else if (alli.includes(rep.faction.id)) {
        // Alliance reps
        setAlli((others) => [...others, rep]);
      } else if (hordeIDs.includes(rep.faction.id)) {
        //   // Horde Reps
        setHorde((others) => [...others, rep]);
      } else if (rep.faction.id === 1168) {
        // Guild Rep
        setGuild((others) => [...others, rep]);
      } else if (rep.faction.id < 929) {
        // Vanilla Reps

        setVanilla((others) => [...others, rep]);
      } else if (
        rep.faction.id < 1036 ||
        rep.faction.id === 1038 ||
        rep.faction.id === 1077
      ) {
        // BC Reps
        setBC((others) => [...others, rep]);
      } else if (rep.faction.id <= 1126) {
        // Wrath Reps
        setWrath((others) => [...others, rep]);
      } else if (rep.faction.id <= 1204) {
        // Cata Reps
        setCata((others) => [...others, rep]);
      } else if (rep.faction.id <= 1492 && rep.faction.id !== 1358) {
        // Mop Reps
        setMop((others) => [...others, rep]);
      } else if (
        (rep.faction.id <= 1850 &&
          rep.faction.id !== 1691 &&
          rep.faction.id !== 1828) ||
        rep.faction.id === 1848 ||
        rep.faction.id === 1847
      ) {
        // Wod Reps
        setWod((others) => [...others, rep]);
      } else if (
        rep.faction.id < 2045 ||
        rep.faction.id === 2165 ||
        rep.faction.id === 2170
      ) {
        // Legion Reps
        setLegion((others) => [...others, rep]);
      } else if (rep.faction.id >= 2103 && rep.faction.id !== 2135) {
        // Bfa Reps
        setBFA((others) => [...others, rep]);
      }
    }
  }, [reps, user.faction]);

  return (
    <div>
      {bfa.length > 0 && (
        <Expac name="Battle for Azeroth" cName="bfa" reps={bfa} key={"bfa"} />
      )}
      {legion.length > 0 && (
        <Expac name="Legion" cName="legion" reps={legion} key={"legion"} />
      )}

      {wod.length > 0 && (
        <Expac name="Warlords of Draenor" cName="wod" reps={wod} key={"wod"} />
      )}
      {mop.length > 0 && (
        <Expac name="Mists of Pandaria" cName="mop" reps={mop} key={"mop"} />
      )}
      {cata.length > 0 && (
        <Expac name="Cataclysm" cName="cata" reps={cata} key={"cata"} />
      )}

      {wrath.length > 0 && (
        <Expac
          name="Wrath of the Lich King"
          cName="wrath"
          reps={wrath}
          key={"wrath"}
        />
      )}
      {bc.length > 0 && (
        <Expac name="Burning Crusade" cName="bc" reps={bc} key={"bc"} />
      )}
      {vanilla.length > 0 && (
        <Expac name="Vanilla" cName="vanilla" reps={vanilla} key={"vanilla"} />
      )}
      {user.faction && alliance.length > 0 && (
        <Expac name="Alliance" cName="alliance" reps={alliance} />
      )}
      {!user.faction && horde.length > 0 && (
        <Expac name="Horde" cName="horde" reps={horde} key="horde" />
      )}
    </div>
  );
}

export default RepLayout;
