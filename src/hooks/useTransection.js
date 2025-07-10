import {addDoc ,collection, serverTimestamp} from  'firebase/firestore'
import { db } from '../config/firebase.config'
import {useGetuserInfo } from '../../src/hooks/useGetuserInfo'
export const useTransection = () => {
    const transectionCollection = collection(db , 'Transection')
    const { userID } = useGetuserInfo();
    const addTransection = async ({description , transectionAmount , transectionType}) => {
        await addDoc(transectionCollection , {
            userID, 
            description ,
            transectionAmount ,
            transectionType ,
            createdAt : serverTimestamp()
        });

    }
    return {addTransection}
}