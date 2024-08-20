import React from 'react';

const Watchlist = ({ watchlist, removeFromWatchlist }) => (
  <div className="w-full p-5">
    <h2 className="text-2xl text-white mb-4">Your Watchlist</h2>
    <ul className="list-none">
      {watchlist.length === 0 ? (
        <li className="text-white">No items in your watchlist.</li>
      ) : (
        watchlist.map((crypto) => (
          <li key={crypto.id} className="flex justify-between mb-2">
            <div className="text-white">{crypto.name} ({crypto.symbol.toUpperCase()})</div>
            <button
              onClick={() => removeFromWatchlist(crypto.id)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
            >
              Remove
            </button>
          </li>
        ))
      )}
    </ul>
  </div>
);

export default Watchlist;
