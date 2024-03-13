import { render, screen} from '@testing-library/react';
import EthereumInfo from './ethereum';
import  '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
// import {toBeInTheDocument} from '@testing-library/jest-dom/matchers';



test('renders block number and USDT balance', () => {
  render(<EthereumInfo />);
  const blockNumberElement = screen.getByText(/Latest Block Number/i);
  const usdtBalanceElement = screen.getByText(/USDT Balance/i);
  expect(blockNumberElement).toBeInTheDocument();
  expect(usdtBalanceElement).toBeInTheDocument();
});
