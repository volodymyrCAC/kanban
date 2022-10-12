import {NextApiRequest, NextApiResponse} from 'next';
import Column from '../../middleware/models/column';
import Card from '../../middleware/models/card';

require('../../middleware/db/mongoose');

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const {columnId, cardId} = request.body;
    try {
        await Card.deleteOne({_id: cardId});

        return response
            .status(201)
            .json({success: true, message: 'successfully deleted'});
    } catch (e) {
        return response
            .status(500)
            .json({success: false, message: 'failed to delete a card'});
    }
};
