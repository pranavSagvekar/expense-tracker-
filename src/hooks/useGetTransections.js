import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { db } from "../config/firebase.config";
import { useGetuserInfo } from "./useGetuserInfo";

export const useGetTransection = () => {
  const [transections, setTransections] = useState([]);
  const [transectionTotal, setTransectionTotal] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });

  const transectionCollectionRef = collection(db, "Transection");
  const { userID } = useGetuserInfo();

  const getTransection = async () => {
    let unsubscribe;
    try {
      const queryTransections = query(
        transectionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransections, (snapshot) => {
        let docs = [];
        let totalIncome = 0;
        let totalExpense = 0;

        snapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;

          docs.push({ ...data, id });

          if (data.transectionType === "expense") {
            totalExpense += Number(data.transectionAmount);
          } else {
            totalIncome += Number(data.transectionAmount);
          }
        });

        const balance = totalIncome - totalExpense;

        setTransections(docs);
        setTransectionTotal({
          balance,
          income: totalIncome,
          expense: totalExpense,
        });
      });
    } catch (err) {
      console.error("Error: ", err);
    }

    return () => unsubscribe && unsubscribe();
  };

  useEffect(() => {
    getTransection();
  }, []);

  return { transections, transectionTotal };
};
