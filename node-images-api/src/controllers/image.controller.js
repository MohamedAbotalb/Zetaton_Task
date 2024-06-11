import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import {
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from "firebase/firestore";
import { db, storage } from "../config/firebase.js";
import { shortenURL } from "../utils/shorten-url.util.js";

const imagesCollection = collection(db, "Images");

// Create a function to upload the image to firebase storage and save its url in the firebase firestore
export const addImage = async (req, res, next) => {
  if (!req.file)
    return res
      .status(400)
      .json({ success: false, message: "Please add an image to upload" });

  try {
    const dateTime = new Date().getTime();
    const imageName = `${dateTime}_${req.file.originalname}`;
    const storageRef = ref(storage, `images/${imageName}`);

    const metaData = {
      contentType: req.file.mimetype,
    };

    const snapShot = await uploadBytes(storageRef, req.file.buffer, metaData);
    const originalURL = await getDownloadURL(snapShot.ref);
    const docRef = await addDoc(imagesCollection, { originalURL });

    return res.status(201).json({
      success: true,
      message: "Image uploaded successfully",
      data: { id: docRef.id, originalURL },
    });
  } catch (error) {
    next(error);
  }
};

// Create a function to get all images docs from firebase firestore and retrieve each image's url
export const getAllImages = async (req, res, next) => {
  try {
    const querySnapshot = await getDocs(imagesCollection);
    const images = [];
    querySnapshot.forEach((doc) => {
      images.push({ id: doc.id, ...doc.data() });
    });
    return res.status(200).json({ success: true, data: images });
  } catch (error) {
    next(error);
  }
};

// Create a function to retrieve the image data by its doc id
export const getImageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const imageDoc = doc(imagesCollection, id);
    const docSnapshot = await getDoc(imageDoc);
    if (!docSnapshot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }
    const imageData = { id: docSnapshot.id, ...docSnapshot.data() };
    return res.status(200).json({ success: true, data: imageData });
  } catch (error) {
    next(error);
  }
};

// Create a function to get the image data by its doc id and delete the doc and the image from storage
export const deleteImageById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const imageDocRef = doc(imagesCollection, id);
    const imageDoc = await getDoc(imageDocRef);

    if (!imageDoc.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    }
    const { originalURL } = imageDoc.data();

    const imageRef = ref(storage, originalURL);
    await deleteDoc(imageDocRef);
    await deleteObject(imageRef);

    return res.status(200).json({
      success: true,
      message: "Image and document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// Create a function to get the image id and create a short url from its original url and save it in the image doc on firestore
export const shortenImageURL = async (req, res, next) => {
  try {
    const { id } = req.params;
    const docRef = doc(imagesCollection, id);
    const docSnapshot = await getDoc(docRef);

    if (!docSnapshot.exists()) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found" });
    } else {
      const { originalURL } = docSnapshot.data();
      const shortURL = await shortenURL(originalURL);
      await updateDoc(docRef, { shortURL });
      return res.status(200).json({
        success: true,
        data: { id: docSnapshot.id, ...docSnapshot.data(), shortURL },
      });
    }
  } catch (error) {
    next(error);
  }
};
