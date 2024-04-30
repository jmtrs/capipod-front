import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PodcastDetailsPage from '../pages/PodcastDetailsPage';
import EpisodeDetailsPage from '../pages/EpisodeDetailsPage';
import NotFoundPage from '../pages/NotFoundPage.jsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/podcast/:podcastId" element={<PodcastDetailsPage />} />
      <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetailsPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;