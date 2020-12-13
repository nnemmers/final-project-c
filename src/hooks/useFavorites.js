import { useEffect, useState } from "react";
import db from "../data/firebase";

function useFavorites(user) {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("firstName");
  useEffect(() => {
    // Grab the list of favorites from our browser storage to display
    setLoading(true);
    const getFavorites = async () => {
      try {
        const snapshot = await db
          .doc(`users/${user.uid}`)
          .collection("favorites")
          .get();
        console.log(snapshot.docs);
        let temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          const person = snapshot.docs[i].data();
          temp.push(person);
        }
        console.log("any people in this arr", temp);
        if (temp.length > 0) {
          setFavorites(temp);
        }
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.log(err);
      }
    };

    getFavorites();
  }, [user.uid]);

  let sortedFavorites = favorites;
  if (sort) {
    sortedFavorites = sortedFavorites.sort((a, b) => {
      return a[sort].toLowerCase() > b[sort].toLowerCase() ? 1 : -1;
    });
  }

  return [sortedFavorites, error, loading, setSort];
}

export default useFavorites;
