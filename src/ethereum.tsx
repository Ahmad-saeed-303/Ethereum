
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import USDT_ABI from './USDT_ABI'; // استيراد ABI code لعقد USDT
import './style.css';

const EthereumInfo: React.FC = () => {
  const [latestBlockNumber, setLatestBlockNumber] = useState<number | null>(null);
  const [usdtBalance, setUsdtBalance] = useState<number | null>(null);
  const [usdtAddres, setUsdtAddres] = useState<string>('');
  const [accountAddress, setAccountAddress] = useState<string>('');

  const fetchData = async () => {
    const web3 = new Web3('https://mainnet.infura.io/v3/d25d59e84db04549a37fca9757498f59');

    const usdtContract = new web3.eth.Contract(USDT_ABI as any, usdtAddres);
    const balance = await usdtContract.methods.balanceOf(accountAddress).call();
    setUsdtBalance(Number(balance));

    const blockNumber = await web3.eth.getBlockNumber();
    setLatestBlockNumber(Number(blockNumber));
  };

  const changAddres = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsdtAddres(event.target.value);
  };

  const changAddresAccount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAccountAddress(event.target.value);
  };

  const handleSubmit = () => {
    if (usdtAddres.trim() === '' || accountAddress.trim() === '') {
      alert(' Please Enter The Data  ');
      return;
    }
  
    fetchData()
      .then(() => {
        setUsdtAddres('');
        setAccountAddress('');
      })
      .catch((error) => {
        console.error(' An error occurred while fetching  data    :', error);
      });
  };
  
  return (
    <div className='eth'>
      <form className='eth-form input-group'> 
        <label>
          Enter USDT Address:
          <input type="text" value={usdtAddres} onChange={changAddres} />
        </label>
        <br />
        <label>
          Enter Account Address:
          <input type="text" value={accountAddress} onChange={changAddresAccount} className="input" />
        </label>
      </form>
      <button onClick={handleSubmit} className='button'>
      <span className="button-content">Get Data </span>
        </button>
      <h1>Latest Block Number: {latestBlockNumber}</h1>
      <h1>USDT Balance: {usdtBalance}</h1>
    </div>
  );
};

export default EthereumInfo;
