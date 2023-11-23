/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import WaitListedUser from '../models/WaitListedUser';
import { isValidEmail, isValidName } from '../utils';
/**
 * @swagger
 * /waitlist:
 *   post:
 *     summary: Add a user to the waitlist
 *     description: Add a user to the waitlist. This endpoint will allow you to add a user's details to the waitlist.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Email of the user to be added to the waitlist.
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: User added to waitlist successfully.
 *       400:
 *         description: Bad request if the email is invalid or missing.
 */
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
      error: err?.errors?.[0]?.message,
    });
  }
};

export default waitList;
