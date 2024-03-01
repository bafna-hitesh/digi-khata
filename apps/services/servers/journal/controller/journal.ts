import { Request, Response } from 'express';
import { sanitize } from 'isomorphic-dompurify';
import Journal from '../models/Journal';
import { decodeJWT, isJwtExpired } from '../../user/utils/authUtils';
import encryptData from '../utils/encrypt';
import decryptData from '../utils/decrypt';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

const createOrUpdateJournal = async (req: Request, res: Response) => {
  try {
    const tradeId = req?.params?.tradeId;
    const brokerName = req?.body?.broker;
    const tradeJournal = req?.body?.journal;
    const journalImages = req?.body?.images;

    if (!tradeId || !brokerName || !tradeJournal || !journalImages) {
      return res.status(400).json({
        message: 'Invalid Input',
      });
    }

    let accessToken = req?.cookies?.accessToken;

    if (isJwtExpired(accessToken)) {
      accessToken = req?.cookies?.refreshToken;
    }

    const decodedJwt = (await decodeJWT(accessToken)) as JwtPayload;
    const userId = decodedJwt?.userId;

    if (!userId) {
      return res.status(403).json({
        message: 'Invalid Access or Refresh Token',
      });
    }

    // Sanitize Input for XSS and HTML
    // Disabling any HTML, SVG or MathML
    const sanitizedJournal = sanitize(tradeJournal, { USE_PROFILES: { html: false, svg: false, mathMl: false } });

    const journalDetails = await Journal.findOrCreateJournal(tradeId, brokerName, userId);

    // Encrypt Journal
    const encryptedJournal = encryptData(sanitizedJournal);

    // Update Journal and Images
    await journalDetails.update({ journal: encryptedJournal, images: journalImages });

    return res.status(200).json({
      message: `Successfully updated the journal`,
    });
  } catch (err) {
    console.log(`Some Error Occurred while creating or updating the journal, `, err);
    return res.status(500).json({
      message: `Some Error Occurred while creating or updating the journal`,
    });
  }
};

const getJournal = async (req: Request, res: Response) => {
  try {
    const tradeId = req?.params?.tradeId;
    const brokerName = req?.query?.broker;

    if (!tradeId || !brokerName) {
      return res.status(400).json({
        message: 'Invalid Input',
      });
    }

    let accessToken = req?.cookies?.accessToken;

    if (isJwtExpired(accessToken)) {
      accessToken = req?.cookies?.refreshToken;
    }

    const decodedJwt = (await decodeJWT(accessToken)) as JwtPayload;
    const userId = decodedJwt?.userId;

    if (!userId) {
      return res.status(403).json({
        message: 'Invalid Access or Refresh Token',
      });
    }

    const journalDetails = (await Journal.getJournal(tradeId, brokerName as string, userId))?.toJSON();

    if (journalDetails) {
      // Decrypt Journal only if there is some journal
      const decryptedJournal = decryptData(journalDetails?.journal);
      journalDetails.journal = decryptedJournal;
    }

    return res.status(200).json(journalDetails);
  } catch (err) {
    console.log(`Some Error Occurred while getting the journal, `, err);
    return res.status(500).json({
      message: `Some Error Occurred while getting the journal`,
    });
  }
};

export { createOrUpdateJournal, getJournal };
