import { InnovationItem, ReviewItem, MatchmakingItem } from '../types';
import { api } from '../services/api';

/**
 * Unified Storage Bridge (Deprecated)
 * Direct storage access has been consolidated into the centralized `api` service (src/services/api.ts)
 * to maintain strict data consistency, automatic rating calculation, and event synchronization.
 */

export const getStoredInnovations = async (): Promise<InnovationItem[]> => {
  return api.innovations.getAll();
};

export const saveInnovations = async (items: InnovationItem[]): Promise<void> => {
  // Persistence is handled through api.innovations methods
  console.info('Using centralized api.innovations for persistence', items.length);
};

export const getStoredReviews = async (): Promise<ReviewItem[]> => {
  return api.reviews.getAll();
};

export const saveReviews = async (reviews: ReviewItem[]): Promise<void> => {
  console.info('Using centralized api.reviews for persistence', reviews.length);
};

export const getStoredMatchmaking = async (): Promise<MatchmakingItem[]> => {
  return api.matchmaking.getPartners();
};

export const saveMatchmaking = async (items: MatchmakingItem[]): Promise<void> => {
  console.info('Using centralized api.matchmaking for persistence', items.length);
};

