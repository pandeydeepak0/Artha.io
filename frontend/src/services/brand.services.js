import { db } from "../firebase-config";

import {
   collection, 
   getDoc,
   getDocs,
   addDoc,
   doc,
} from "firebase/firestore";

const brandCollectionRef = collection(db, "ArthaBrand");
class BrandDataService {

   addBrand = (newBrand) => {
      return addDoc(brandCollectionRef, newBrand);
   };

   getAllBrands = () => {
      return getDocs(brandCollectionRef);
   };

   getBrand = (id) => {
      const brandDoc = doc(db, "ArthaBrand", id);
      return getDoc(brandDoc);
   };
}

export default new BrandDataService();