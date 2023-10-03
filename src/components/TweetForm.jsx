import { auth, db, storage } from "../firebase/config";
import userPhoto from "../assets/user.png";
import { BsCardImage } from "react-icons/bs";
import { serverTimestamp, addDoc, collection } from "firebase/firestore";
import photo from "../assets/user.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "react-toastify";
const TweetForm = () => {
  // * kolleksiyonun referansını alma
  const teewtsCol = collection(db, "tweets");
  // * Resmi yükler ve url'ini döndürür
  const uploadİmage = async (image) => {
    if (!image) return null;
    //* Stroga'de dosya yer ayarlama
    const strogaRef = ref(storage, `${new Date().getTime()}${image.name}`);

    //* Dosyayı Yükleme
    const url = await uploadBytes(strogaRef, image)
      // * Yükleme Bittiği Anda Resmin Url ne Erişme
      .then((response) => getDownloadURL(response.ref));
    // * Fonksiyonun çağrıldığı yere url gönderme

    return url;
  };

  const handleSumbit = async (e) => {
    e.preventDefault();
    const textContent = e.target[0].value;
    const imageContent = e.target[1].files[0];

    if (!textContent && !imageContent) {
      toast.info("Tweet Boş Olamaz!!");
      return;
    }
    // * Resmi stoage'ekleyip url'ne erişir
    const url = await uploadİmage(imageContent);
    // * Koleksiyona Dökuman Ekler
    addDoc(teewtsCol, {
      textContent,
      imageContent: url,
      createdAt: serverTimestamp(),
      user: {
        id: auth?.currentUser?.uid,
        name: auth?.currentUser?.displayName,
        picture: auth?.currentUser?.photoURL
          ? auth.currentUser.photoURL
          : photo,
      },
      likes: [],
    });
    // * İnputları Temizleme
    e.target[0].value = "";
    // * Resim Temizleme
    e.taget[1].value = null;
  };
  return (
    <form
      onSubmit={handleSumbit}
      className="flex gap-3  border-b-2 border-gray-400 p-4"
    >
      <img
        className="rounded-full h-[50px]"
        src={
          auth?.currentUser?.photoURL ? auth.currentUser.photoURL : userPhoto
        }
        alt=""
      />
      <div className="w-full  ">
        <input
          className="w-full text-gray-400 outline-none my- bg-white"
          type="text"
          placeholder="Neler Oluyor...."
        />
        <div className="flex justify-between">
          <div className="hover:bg-gray-200 transition cursor-pointer  rounded-full p-3">
            <label htmlFor="file-img">
              <BsCardImage className="text-blue-500" />
            </label>
            <input className="hidden" type="file" id="file-img" />
          </div>
          <button className="bg-blue-300 text-white hover:bg-blue-500 transition font-medium rounded-full px-4 ">
            Tweetle
          </button>
        </div>
      </div>
    </form>
  );
};

export default TweetForm;
