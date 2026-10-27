import { doc, setDoc, getDocs, collection, query, orderBy, limit } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';

export interface PriceAlertRecord {
  id: string;
  email: string;
  targetPrice: number;
  currentPrice: number;
  productId: string;
  productTitle: string;
  asin: string;
  currency: string;
  status: 'active' | 'triggered' | 'cancelled';
  createdAt: string;
}

export async function createPriceAlert(params: {
  email: string;
  targetPrice: number;
  currentPrice: number;
  productId: string;
  productTitle: string;
  asin: string;
  currency?: string;
}): Promise<{ success: boolean; id?: string; error?: string }> {
  const alertId = `alert_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
  const path = `price_alerts/${alertId}`;

  const alertData: PriceAlertRecord = {
    id: alertId,
    email: params.email.trim().toLowerCase(),
    targetPrice: Number(params.targetPrice),
    currentPrice: Number(params.currentPrice),
    productId: params.productId,
    productTitle: params.productTitle.substring(0, 400),
    asin: params.asin.toUpperCase().trim(),
    currency: params.currency || 'USD',
    status: 'active',
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'price_alerts', alertId), alertData);
    return { success: true, id: alertId };
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to save alert' };
  }
}

export async function fetchPriceAlerts(): Promise<PriceAlertRecord[]> {
  const path = 'price_alerts';
  try {
    const q = query(collection(db, path), orderBy('createdAt', 'desc'), limit(50));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as PriceAlertRecord);
  } catch (error) {
    // If permission or offline, log safely
    console.warn('Could not list price alerts from client directly:', error);
    return [];
  }
}
