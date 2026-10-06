import React, { useState, useEffect } from 'react';
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ErrorBoundary } from './components/common/ErrorBoundary';
import { Navbar } from './components/common/Navbar';
import { HomeView } from './components/home/HomeView';
import { Footer } from './components/common/Footer';
import { WasteDictionaryView } from './components/dictionary/WasteDictionaryView';
import { ExploreFacilitiesView } from './components/explore/ExploreFacilitiesView';
import { InnovationCatalogView } from './components/innovations/InnovationCatalogView';
import { MatchmakingMapView } from './components/matchmaking/MatchmakingMapView';
import { EvaluationReviewView } from './components/evaluation/EvaluationReviewView';
import { SubmitInnovationModal } from './components/innovations/SubmitInnovationModal';
import { AdminVerificationModal } from './components/innovations/AdminVerificationModal';
import { AddReviewModal } from './components/evaluation/AddReviewModal';
import { AuthModal } from './components/common/AuthModal';
import { InnovationItem } from './types';
import { useInnovations } from './hooks/useInnovations';
import { useReviews } from './hooks/useReviews';

import { api } from './services/api';

const WasteToWealthMain: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();

  const getInitialTab = () => {
    const hash = window.location.hash.replace('#', '').trim();
    const validTabs = ['home', 'dictionary', 'explore', 'innovations', 'matchmaking', 'evaluation'];
    return validTabs.includes(hash) ? hash : 'home';
  };

  const [activeTab, setActiveTabState] = useState<string>(getInitialTab);
  const setActiveTab = (tab: string) => {
    setActiveTabState(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const validTabs = ['home', 'dictionary', 'explore', 'innovations', 'matchmaking', 'evaluation'];
      if (validTabs.includes(hash)) {
        setActiveTabState(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Deep linked waste filter (from Kamus -> Marketplace)
  const [activeWasteFilter, setActiveWasteFilter] = useState<{ id: string, name: string } | undefined>(undefined);
  const [highlightInnovationId, setHighlightInnovationId] = useState<string | undefined>(undefined);

  // Modals
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [editingInnovation, setEditingInnovation] = useState<InnovationItem | null>(null);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [preSelectedReviewInnovation, setPreSelectedReviewInnovation] = useState<InnovationItem | null>(null);

  // Pending supply requests count for 4M Matchmaking navbar badge (Point 2, 4)
  const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

  const loadPendingSupplyRequests = async () => {
    try {
      const count = await api.matchmaking.getPendingCountForUser(user.id, user.role, user.organization);
      setPendingRequestsCount(count);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPendingSupplyRequests();
    const handleSupplyUpdate = () => {
      loadPendingSupplyRequests();
    };
    window.addEventListener('w2w:supply_request_updated', handleSupplyUpdate);
    const interval = setInterval(loadPendingSupplyRequests, 4000);
    return () => {
      window.removeEventListener('w2w:supply_request_updated', handleSupplyUpdate);
      clearInterval(interval);
    };
  }, [user.id, user.role, user.organization]);

  const {
    innovations,
    isLoadingInnovations,
    loadInnovations,
    handleInnovationSubmit,
    handleInnovationUpdate,
    handleAdminApprove,
    handleAdminReject,
    handleSeedMockPending
  } = useInnovations();

  const {
    reviews,
    handleReviewSubmit,
    handleLikeReview,
    handleReportReview,
    handleDeleteReportedReview
  } = useReviews(loadInnovations);

  // Pending innovations count for admin badge
  const pendingInnovations = innovations.filter((i) => i.status === 'pending');
  const reportedReviews = reviews.filter((r) => r.isReported);

  // Handle deep link from Kamus (1M) -> Marketplace (3M)
  const handleSelectWasteForInnovation = (wasteId: string, wasteName: string) => {
    setHighlightInnovationId(undefined);
    setActiveWasteFilter({ id: wasteId, name: wasteName });
    setActiveTab('innovations');
    addToast(`Menampilkan tutorial inovasi berbahan: ${wasteName}`, 'info');
  };

  const handleSelectSpecificInnovation = (innovationId: string, innovationTitle: string) => {
    setActiveWasteFilter(undefined);
    setHighlightInnovationId(innovationId);
    setActiveTab('innovations');
    addToast(`Menampilkan panduan: ${innovationTitle}`, 'info');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        pendingCount={pendingInnovations.length}
        pendingRequestsCount={pendingRequestsCount}
        onOpenSubmitModal={() => {
          setEditingInnovation(null);
          setIsSubmitModalOpen(true);
        }}
        onOpenAdminModal={() => setIsAdminModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main 5M Views */}
      <main style={{ flex: 1 }}>
        {activeTab === 'home' && (
          <HomeView 
            onSelect5M={(tab) => {
              setActiveWasteFilter(undefined);
              setHighlightInnovationId(undefined);
              setActiveTab(tab);
            }} 
          />
        )}

        {activeTab === 'dictionary' && (
          <WasteDictionaryView 
            onSelectWasteForInnovation={handleSelectWasteForInnovation}
            onSelectSpecificInnovation={handleSelectSpecificInnovation}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreFacilitiesView />
        )}

        {activeTab === 'innovations' && (
          <InnovationCatalogView
            innovations={innovations}
            isLoading={isLoadingInnovations}
            activeWasteFilter={activeWasteFilter}
            onClearWasteFilter={() => setActiveWasteFilter(undefined)}
            highlightInnovationId={highlightInnovationId}
            onClearHighlightInnovation={() => setHighlightInnovationId(undefined)}
            onOpenSubmitModal={() => {
              setEditingInnovation(null);
              setIsSubmitModalOpen(true);
            }}
            onEditRejectedInnovation={(inv) => {
              setEditingInnovation(inv);
              setIsSubmitModalOpen(true);
            }}
            onOpenReviewModal={(inv) => {
              setPreSelectedReviewInnovation(inv);
              setIsReviewModalOpen(true);
            }}
          />
        )}

        {activeTab === 'matchmaking' && (
          <MatchmakingMapView />
        )}

        {activeTab === 'evaluation' && (
          <EvaluationReviewView
            reviews={reviews}
            innovations={innovations.filter((i) => i.status === 'verified')}
            onOpenAddReviewModal={(inv) => {
              setPreSelectedReviewInnovation(inv || null);
              setIsReviewModalOpen(true);
            }}
            onLikeReview={handleLikeReview}
            onReportReview={handleReportReview}
          />
        )}
      </main>

      {/* Footer */}
      <Footer onSelectTab={setActiveTab} />

      {/* Modals */}
      <SubmitInnovationModal
        isOpen={isSubmitModalOpen}
        onClose={() => {
          setIsSubmitModalOpen(false);
          setEditingInnovation(null);
        }}
        initialData={editingInnovation}
        onSubmitSuccess={handleInnovationSubmit}
        onUpdateSuccess={handleInnovationUpdate}
      />

      <AdminVerificationModal
        isOpen={isAdminModalOpen}
        onClose={() => setIsAdminModalOpen(false)}
        pendingInnovations={pendingInnovations}
        reportedReviews={reportedReviews}
        onApprove={handleAdminApprove}
        onReject={handleAdminReject}
        onDeleteReportedReview={handleDeleteReportedReview}
        onSeedMockPending={handleSeedMockPending}
      />

      <AddReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setPreSelectedReviewInnovation(null);
        }}
        innovations={innovations.filter((i) => i.status === 'verified')}
        preSelectedInnovation={preSelectedReviewInnovation}
        onSubmitSuccess={handleReviewSubmit}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AuthProvider>
          <WasteToWealthMain />
        </AuthProvider>
      </ToastProvider>
    </ErrorBoundary>
  );
};

export default App;
