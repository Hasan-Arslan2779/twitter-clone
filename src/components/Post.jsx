import { AiOutlineHeart } from "react-icons/ai";
import { BiMessageRounded } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { FaRetweet } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";
import { FcLike } from "react-icons/fc";
import moment from "moment/moment";
import "moment/locale/tr";
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { useEffect, useState } from "react";
const Post = ({ tweet }) => {
  const [isLiked, setIsLiked] = useState(false);

  // * Tarih Bilgisine Erişme
  const date = tweet?.createdAt?.toDate();

  // Kullanıcının  Tweeti Beğenip beğenmediğini kontrol etme
  useEffect(() => {
    const found = tweet.likes.find((userId) => userId === auth.currentUser.uid);
    setIsLiked(found);
  }, [tweet]);
  // kullanıcı like
  const toggleLike = () => {
    // Güncellenecek Tweetin referansını alma
    const tweetRef = doc(db, "tweets", tweet.id);
    // Aktif kullanıcıyı tweetin likes dizisine ekleme
    updateDoc(tweetRef, {
      likes: isLiked
        ? arrayRemove(auth.currentUser.uid)
        : arrayUnion(auth.currentUser.uid),
    });
  };
  // Tweeti Kaldırır
  const handleDelete = () => {
    //  Tweetin Referansını Alır
    const tweetRef = doc(db, "tweets", tweet.id);
    // Doc kaldırma
    deleteDoc(tweetRef);
  };
  return (
    <div className="flex gap-3 p-3 bg-white border-b-[0.5px] border-gray-400 ">
      <img
        className="rounded-full h-14 w-14 gap-4"
        src={tweet?.user?.picture}
        alt=""
      />
      <div className="w-full">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <p className="font-bold">{tweet?.user?.name}</p>
            <p className="text-gray-400">@{tweet.user.name.toLowerCase()}</p>
            <p className="text-gray-400">{moment(date).fromNow()}</p>
          </div>

          {tweet.user.id === auth.currentUser.uid && (
            <button
              onClick={handleDelete}
              class="block text-dark hover:bg-blue-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  dark:focus:ring-blue-800"
              type="button"
            >
              <BsThreeDots />
            </button>
          )}
        </div>
        <div className="my-3 ">
          <p>{tweet.textContent}</p>
          {/* Eğerki resim varsa onu ekrana bas */}
          {tweet.imageContent && (
            <img className="rounded-xl p-2 " src={tweet.imageContent} />
          )}
        </div>
        <div className="flex justify-between ">
          {/* İkonlar */}
          <div className="p-2 flex items-center gap-2 hover:bg-blue-300 rounded-full transition cursor-pointers ">
            <BiMessageRounded />
            <span className="text-[10px]"> 17</span>
          </div>
          <div
            onClick={toggleLike}
            className="p-1 flex items-center gap-2 hover:bg-blue-300 rounded-full transition cursor-pointers"
          >
            {isLiked ? <FcLike /> : <AiOutlineHeart />}
            <span className="text-[10px]">{tweet.likes.length}</span>
          </div>
          <div className="p-2 flex items-center gap-2 hover:bg-blue-300 rounded-full transition cursor-pointers">
            <FaRetweet />
            <span className="text-[10px]">8</span>
          </div>
          <div className="p-2  flex items-center gap-2 hover:bg-blue-300 rounded-full transition cursor-pointers">
            <FiShare2 />
            <span className="text-[10px]">18</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
