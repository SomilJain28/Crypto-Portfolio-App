import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
import { Loader } from "./";
import TrendingCryptos from './TrendingCryptos';
import Watchlist from './Watchlist';  

const Input = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
);

const Welcome = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [formData, setFormData] = useState({ addressTo: '', amount: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [watchlist, setWatchlist] = useState([]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const accounts = await web3Instance.eth.getAccounts();
        setWeb3(web3Instance);
        setAccount(accounts[0]);
        alert(`Connected account: ${accounts[0]}`);
      } catch (error) {
        console.error('Error connecting MetaMask:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setWeb3(null);
    alert('Wallet disconnected');
  };

  const handleChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.value });
  };

  const handleSubmit = async () => {
    const { addressTo, amount, message } = formData;

    if (!web3 || !account) return alert('Please connect your wallet first.');
    if (!addressTo || !amount) return alert('Please fill in all fields.');

    setIsLoading(true);

    try {
      const transactionParameters = {
        to: addressTo,
        from: account,
        value: web3.utils.toHex(web3.utils.toWei(amount, 'ether')),
        data: web3.utils.toHex(message),
      };

      const txHash = await web3.eth.sendTransaction(transactionParameters);
      alert(`Transaction successful! TxHash: ${txHash.transactionHash}`);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert('Transaction failed');
    }

    setIsLoading(false);
  };

  const addToWatchlist = (crypto) => {
    setWatchlist([...watchlist, crypto]);
  };

  const removeFromWatchlist = (cryptoId) => {
    setWatchlist(watchlist.filter(crypto => crypto.id !== cryptoId));
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full justify-center items-center">
        <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
          <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
            <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
              Empower Your <br /> Transactions
            </h1>
            <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
              Explore the crypto world. Buy and sell cryptocurrencies easily.
            </p>

            <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card .white-glassmorphism">
              <div className="flex justify-between flex-col w-full h-full">
                <div className="flex justify-between items-start">
                  <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                    <SiEthereum fontSize={21} color="#fff" />
                  </div>
                  <BsInfoCircle fontSize={17} color="#fff" />
                </div>
                <div>
                  <p className="text-white font-light text-sm">
                    {account ? `Connected: ${account}` : 'Address'}
                  </p>
                  <p className="text-white font-semibold text-lg mt-1">
                    Ethereum
                  </p>
                </div>
              </div>
            </div>

            {!account ? (
              <button
                type="button"
                onClick={connectWallet}
                className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
              >
                <p className="text-white text-base font-semibold">
                  Connect Wallet
                </p>
              </button>
            ) : (
              <button
                type="button"
                onClick={disconnectWallet}
                className="flex flex-row justify-center items-center my-5 bg-red-500 p-3 rounded-full cursor-pointer hover:bg-red-700"
              >
                <p className="text-white text-base font-semibold">
                  Disconnect Wallet
                </p>
              </button>
            )}
          </div>

          <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
            <div id="top-10-cryptos" className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
              <Input placeholder="Address To" name="addressTo" type="text" handleChange={handleChange} />
              <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} />
              <Input placeholder="Enter Message" name="message" type="text" handleChange={handleChange} />

              <div className="h-[1px] w-full bg-gray-400 my-2" />

              {isLoading ? (
                <Loader />
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
                >
                  Send now
                </button>
              )}
            </div>
            <TrendingCryptos addToWatchlist={addToWatchlist} />
          </div>
        </div>
      </div>

      <div id="watchlist" className="flex w-full justify-center items-center mt-12">
        <Watchlist watchlist={watchlist} removeFromWatchlist={removeFromWatchlist} />
      </div>
    </div>
  );
};

export default Welcome;
