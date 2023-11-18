import { Request, Response } from 'express';
import WaitListedUser from '../models/WaitListedUser';
import { isValidEmail, isValidName } from '../../../utils';

const waitList = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        message: 'Invalid Input',
        error: 'Name or Email is missing',
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        message: 'Invalid Input',
        error: 'Invalid Email',
      });
    }

    if (!isValidName(name)) {
      return res.status(400).json({
        message: 'Invalid Input',
        error: 'Invalid Name',
      });
    }

    // Inserting into Postgres
    await WaitListedUser.create({
      name,
      email,
    });

    return res.status(201).json({
      message: 'Successfully created a new waitlisted user',
    });
  } catch (err: any) {
    return res.status(500).json({
      message: 'Failed to create a new waitlisted user',
      error: err.errors[0].message,
    });
  }
};

export default waitList;
