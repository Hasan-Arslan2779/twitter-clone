import React from "react";
import TweetForm from "./TweetForm";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import Post from "./Post";

const Main = () => {
  const [twets, setTweets] = useState(null);
  // * Koleksiyon referansı alma
  const tweetsCol = collection(db, "tweets");
  useEffect(() => {
    // * filtreleme ayarlarını  tanımlama
    const qeryOptions = query(tweetsCol, orderBy("createdAt", "desc"));

    // * Kolaksiyondaki değişimi izleme
    onSnapshot(qeryOptions, (snapshot) => {
      // * Tweetleri Geçici olarak tuttuğumuz dizi
      const liveTweets = [];
      // * dökkümanların verilerine erişip diziye aktarma
      snapshot.forEach((doc) => liveTweets.push({ ...doc.data(), id: doc.id }));
      setTweets(liveTweets);
    });
  }, []);

  return (
    <main className="col-span-4   md:col-span-3 border border-gray-400">
      <header
        className="font-bold p-4 border-[#f5eeee6f] border-b-2
      "
      >
        Ansayfa
      </header>
      <TweetForm />
      {/* Loading Ekranı */}
      {!twets && <p className="text-center mt-[200px]">Loading...</p>}
      {/* {/ Atılan Twitlerin Listelendiği alan /} */}
      {twets?.map((tweet, i) => (
        <Post key={i} tweet={tweet} />
      ))}
    </main>
  );
};

export default Main;
