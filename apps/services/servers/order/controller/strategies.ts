import { Request, Response } from 'express';
import { Strategy } from '../models/Strategy';

const getAllStrategiesStartingWithLetter = async (req: Request, res: Response) => {
  try {
    const strategyStartsWith = req?.query?.startsWith;

    if (!strategyStartsWith) {
      return res.status(400).json({
        message: `Invalid Input`,
      });
    }
    const mistakes = await Strategy.findAllStrategysStartingWithLetter((strategyStartsWith as string).toLowerCase());

    return res.status(200).json(mistakes);
  } catch (err) {
    console.log(`Some Error occurred while fetching strategies list, `, err);
    return res.status(500).json({
      message: `Some Error occurred while fetching strategies list`,
    });
  }
};

export default getAllStrategiesStartingWithLetter;
