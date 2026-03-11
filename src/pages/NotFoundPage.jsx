import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => (
  <main className="min-h-screen flex items-center justify-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <h1 className="font-display text-9xl font-bold gradient-text">404</h1>
      <p className="text-gray-400 text-xl mt-4 mb-8">Page not found</p>
      <div className="flex gap-4 justify-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold"
        >
          <Home className="w-5 h-5" />
          Go Home
        </Link>
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 font-semibold"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>
      </div>
    </motion.div>
  </main>
);

export default NotFoundPage;
