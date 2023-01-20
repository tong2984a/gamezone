import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import './navbar.css';
import config from '../../config.json';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';

const tokenWatchAssetUrl = config.token.wallet_watchAsset.url;
const tokenSymbol = config.token.symbol;
const envChainName = config.deployed.envChain.name;
const envChainId = config.deployed.envChain.id;
const { nftaddress } = config.deployed;

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [info, updateInfo] = useState({ title: '', message: '' });
  const [address, setAddress] = useState('');

  useEffect(() => {
    console.log('useEffect', info);

    return function cleanup() {
      // mounted = false
      // unsub()
    };
  }, []);

  async function ethAccountsRequest() {
    if (window.ethereum) {
      const result = await Promise.all([
        window.ethereum.request({ method: 'eth_requestAccounts' }),
        window.ethereum.request({ method: 'eth_chainId' }),
      ]).catch((error) => {
        if (error.code === 4001) {
          throw new Error('Please check your wallet and try again', { message: 'Connection request has been rejected. ' });
        } else if (error.code === -32002) {
          throw new Error('Please check your wallet and try again', { message: error.message });
        } else {
          throw new Error('Please check your wallet and try again', { message: error.message });
        }
      });
      if (result) {
        const [accounts, chainId] = result;
        console.log('error1', result, envChainId);
        if (accounts.length === 0) {
          throw new Error('Please check your wallet and try again', { message: 'MetaMask is locked or the user has not connected any accounts' });
        }
        if (chainId !== envChainId) {
          throw new Error('Please check your wallet and try again', { message: `Error - Is your wallet connected to ${envChainName}?` });
        }
        setAddress(accounts[0]);
        updateInfo({ message: 'Metamask wallet adapter is connected and ready to use.' });
      }
      return result;
    }
    throw new Error('Non-Ethereum browser detected.', { message: 'You should consider installing MetaMask' });
  }

  async function handleAccountsRequest() {
    try {
      await ethAccountsRequest();
    } catch (error) {
      updateInfo({ message: error.message });
    }
  }

  async function ethRegister() {
    if (window.ethereum) {
      try {
        // wasAdded is a boolean. Like any RPC method, an error may be thrown.
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20', // Initially only supports ERC20, but eventually more!
            options: {
              address: nftaddress,
              symbol: tokenSymbol,
              decimals: 0,
              image: tokenWatchAssetUrl,
              abi: NFT.abi,
            },
          },
        });
        if (wasAdded) {
          updateInfo({ message: 'Thanks for your interest!' });
        }
      } catch (err) {
        if (err.code === 4001) {
          // EIP-1193 userRejectedRequest error
          // If this happens, the user rejected the connection request.
          updateInfo({ message: 'Please connect to MetaMask.' });
        } else {
          updateInfo({ message: err.message || err });
        }
      }
    } else {
      updateInfo({ message: 'Unable to process without a crypto wallet. Please refresh screen to try again.' });
    }
  }

  async function handleRegister() {
    try {
      await ethRegister();
      // do not rethrow because Brave wallet does not yet support wallet_requestPermissions
    } catch (error) {
      updateInfo({ message: error.message });
    }
  }

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <NavLink to="/games" className="navlink">Games</NavLink>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
        <button type="button" onClick={() => handleAccountsRequest()}>{ address ? [address.substr(0, 4), address.substr(38, 4)].join('...') : 'Connect Wallet' }</button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <NavLink to="/games" className="navlink">Games</NavLink>
            <p>&nbsp;</p>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
            <button type="button" onClick={() => handleRegister()}>Connect Wallet</button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
