import { Request, Response } from 'express';
import { Mistake } from '../models/Mistake';

const getAllMistakesStartingWithLetter = async (req: Request, res: Response) => {
  try {
    const mistakeTagStartingWith = req?.query?.startsWith;

    if (!mistakeTagStartingWith) {
      return res.status(400).json({
        message: `Invalid Input`,
      });
    }
    const mistakes = await Mistake.findAllMistakesStartingWithLetter((mistakeTagStartingWith as string).toLowerCase());

    return res.status(200).json(mistakes);
  } catch (err) {
    console.log(`Some Error occurred while fetching mistakes list, `, err);
    return res.status(500).json({
      message: `Some Error occurred while fetching mistakes list`,
    });
  }
};

export default getAllMistakesStartingWithLetter;
