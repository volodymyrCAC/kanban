import mongoose, {Schema, Document} from 'mongoose';

export interface IColumn extends Document {
    projectId: mongoose.Schema.Types.ObjectId;
    title: string;
    colorIndex: Number;
}

const columnSchema: Schema = new mongoose.Schema(
    {
        projectId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Router',
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        colorIndex: {
            type: Number,
            required: true,
        },
        category: {
            type: String,
            required: true,
            default: 'normal',
        },
    },
    {
        timestamps: true,
    }
);
const Column =
    mongoose.models.Column || mongoose.model<IColumn>('Column', columnSchema);
export default Column;
