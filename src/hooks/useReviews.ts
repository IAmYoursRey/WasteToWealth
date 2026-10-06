import { useState, useCallback, useEffect } from 'react';
import { ReviewItem } from '../types';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export function useReviews(onReviewAdded?: () => void) {
  const { addToast } = useToast();
  const [reviews, setReviews] = useState<ReviewItem[]>([]);

  const loadReviews = useCallback(async () => {
    try {
      const data = await api.reviews.getAll();
      setReviews(data);
    } catch {
      addToast('Gagal memuat ulasan', 'error');
    }
  }, [addToast]);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handleReviewSubmit = async (newRev: ReviewItem) => {
    try {
      const saved = await api.reviews.create(newRev);
      setReviews((prev) => [saved, ...prev]);
      addToast('Ulasan berhasil disimpan', 'success');
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (err: any) {
      addToast(err.message || 'Gagal menyimpan ulasan', 'error');
    }
  };

  const handleLikeReview = async (reviewId: string) => {
    try {
      const updated = await api.reviews.like(reviewId);
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? updated : r)));
    } catch {
      addToast('Gagal menyukai ulasan', 'error');
    }
  };

  const handleReportReview = async (reviewId: string, reason: string) => {
    try {
      const updated = await api.reviews.report(reviewId, reason);
      setReviews((prev) => prev.map((r) => (r.id === reviewId ? updated : r)));
      addToast('Ulasan telah dilaporkan.', 'info');
    } catch {
      addToast('Gagal melaporkan ulasan', 'error');
    }
  };

  const handleDeleteReportedReview = async (reviewId: string) => {
    try {
      await api.reviews.delete(reviewId);
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      addToast('Ulasan bermasalah berhasil dihapus.', 'info');
    } catch {
      addToast('Gagal menghapus ulasan', 'error');
    }
  };

  return {
    reviews,
    loadReviews,
    handleReviewSubmit,
    handleLikeReview,
    handleReportReview,
    handleDeleteReportedReview
  };
}
