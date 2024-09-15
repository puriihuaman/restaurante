import type { EnvironmentProviders, importProvidersFrom } from "@angular/core";
import {
	initializeApp,
	provideFirebaseApp,
	type FirebaseApp,
} from "@angular/fire/app";
import {
	getFirestore,
	provideFirestore,
	type Firestore,
} from "@angular/fire/firestore";
import { environment } from "@environment/environment.development";

const firebaseProviders = [
	provideFirebaseApp((): FirebaseApp => initializeApp(environment.FIREBASE)),
	provideFirestore((): Firestore => getFirestore()),
];

// importProvidersFrom()

export { firebaseProviders };
