import { Injectable } from '@angular/core';
import { db } from '../firebase/firebase.config';
import { doc, onSnapshot, updateDoc, setDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

export interface ScreenState {
  selectedScreen: 'green' | 'default' | 'red' | null;
}

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private readonly SCREEN_DOC_ID = 'widm-screen-state';

  constructor() {}

  // Luister naar real-time updates van het scherm
  getScreenState(): Observable<ScreenState> {
    return new Observable(observer => {
      const docRef = doc(db, 'screens', this.SCREEN_DOC_ID);
      
      const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          observer.next(docSnapshot.data() as ScreenState);
        } else {
          // Maak een default state als het document niet bestaat
          const defaultState: ScreenState = {
            selectedScreen: null
          };
          // Maak het document aan met default waarden
          setDoc(docRef, defaultState);
          observer.next(defaultState);
        }
      }, (error) => {
        console.error('Firebase error:', error);
        observer.error(error);
      });

      // Return cleanup function
      return () => unsubscribe();
    });
  }

  // Update het geselecteerde scherm
  async updateSelectedScreen(screen: 'green' | 'default' | 'red' | null): Promise<void> {
    try {
      const docRef = doc(db, 'screens', this.SCREEN_DOC_ID);
      await updateDoc(docRef, {
        selectedScreen: screen
      });
    } catch (error) {
      console.error('Error updating selected screen:', error);
      throw error;
    }
  }


} 