import {NextApiRequest, NextApiResponse} from 'next';
import Router from '../../middleware/models/router';
import Column from '../../middleware/models/column';

require('../../middleware/db/mongoose');

export default async (request: NextApiRequest, response: NextApiResponse) => {
    const {project} = request.body;
    try {
        const newProject = new Router({project});
        // await newProject.save();
        try {
            try {
                const backlogColumn = new Column({
                    projectId: newProject._id,
                    title: 'Backlog',
                    colorIndex: 0,
                });
                await backlogColumn.save();

                const progressColumn = new Column({
                    projectId: newProject._id,
                    title: 'In progress',
                    colorIndex: 1,
                });
                await progressColumn.save();

                const completedColumn = new Column({
                    projectId: newProject._id,
                    title: 'Completed',
                    colorIndex: 2,
                });
                await completedColumn.save();

                const archiveColumn = new Column({
                    projectId: newProject._id,
                    title: 'Archive',
                    colorIndex: 0,
                    category: 'archive',
                });
                await archiveColumn.save();

                newProject.columnOrder.push(backlogColumn);
                newProject.columnOrder.push(progressColumn);
                newProject.columnOrder.push(completedColumn);

                await newProject.save();

                return response.status(200).json({success: true, data: newProject});
            } catch (e) {
                return response.status(500).json({
                    success: false,
                    message: 'failed to create basic columns',
                });
            }
        } catch (e) {
            return response.status(500).json({
                success: false,
                message: 'failed to add router',
            });
        }
    } catch (e) {
        return response
            .status(500)
            .json({success: false, message: 'failed to add router'});
    }
};
