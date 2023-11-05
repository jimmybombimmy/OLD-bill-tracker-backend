import {usersData, paymentTypesData, transactionsData} from '../../data/test-data/index.js';
import {seed} from './seed.js';
import { db } from '../connection.js';

const devData = {usersData, paymentTypesData, transactionsData}

const runSeed = () => {
  return seed(devData).then(() => db.end());
}
  
runSeed();  